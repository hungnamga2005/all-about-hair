import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useInView,
  useMotionTemplate,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import ProductShowcase from "../components/ProductShowcase.jsx";
import VoucherDraw from "../components/VoucherDraw.jsx";
import ClickSparkEffect from "../components/ClickSparkEffect.jsx";
import ReactBitsTextLoop from "../components/ReactBitsTextLoop.jsx";
import SpecterOrb from "../components/SpecterOrb.jsx";
import DepthCarousel from "../components/DepthCarousel.jsx";
import CircularGallery from "../components/CircularGallery.jsx";
import AccordionGallery from "../components/AccordionGallery.jsx";
import CustomerFeedback from "../components/CustomerFeedback.jsx";
import khaumuichiImg from "../../ken/khaumuichi.jpg";
import m1Img from "../../ken/m1.jpg";
import m2Img from "../../ken/m2.jpg";
import m3Img from "../../ken/m3.jpg";
import m4Img from "../../ken/m4.jpg";
import "./LandingPage.css";

// st1–st9 only (the [1-9] class skips st10); Vite returns them sorted by path.
const dreamGallery = Object.values(import.meta.glob("../../ken/st[1-9].jpg", { eager: true, import: "default" })).map(
  (image, i) => ({ image, alt: `Khoảnh khắc cộng đồng AAH ${i + 1}` }),
);

// ScentLabo chapter: mood notes (scent*) and product shots (p-scent*), sorted by file name.
const imagesFrom = (mods) => Object.keys(mods).sort().map((k) => mods[k]);
const scentNotes = imagesFrom(import.meta.glob("../../ken/scent*.jpg", { eager: true, import: "default" }));
const scentProducts = imagesFrom(import.meta.glob("../../ken/p-scent*.jpg", { eager: true, import: "default" }));
// Alternate product shot / scent note so the ring mixes both.
const scentGallery = scentProducts
  .flatMap((p, i) => [{ image: p, alt: `ScentLabo — sản phẩm ${i + 1}` }, scentNotes[i] && { image: scentNotes[i], alt: `ScentLabo — nốt hương ${i + 1}` }])
  .filter(Boolean);

// Product library for Kén step 3: every image in /list, alt text from the file name.
const productGallery = Object.entries(
  import.meta.glob("../../list/*.{jpg,jpeg,png,webp}", { eager: true, import: "default" })
).map(([path, image]) => ({ image, alt: path.split("/").pop().replace(/\.\w+$/, "") }));

const ease = [0.22, 1, 0.36, 1];

/* Content fades in travelling upwards. */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.35 },
  transition: { duration: 0.85, delay, ease },
});

/* Content fades in travelling from right to left. */
const fadeLeft = (delay = 0) => ({
  initial: { opacity: 0, x: 80 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, amount: 0.35 },
  transition: { duration: 0.85, delay, ease },
});

/* Same right→left fade, driven by a flag instead of scrolling into view. */
const revealOn = (on, delay = 0) => ({
  initial: { opacity: 0, x: 60 },
  animate: on ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 },
  transition: { duration: 0.8, delay, ease },
});

const drawn = { strokeDashoffset: 0, fillOpacity: 1 };

/* Handwriting: each letter's outline is "drawn" with stroke-dashoffset, then filled. */
/* play: when given, animation waits for it instead of scrolling into view. */
function Handwriting({ text, viewBox, fontSize, className = "", delay = 0, play }) {
  const reduce = useReducedMotion();
  return (
    <svg className={`lp4-hand ${className}`} viewBox={viewBox} role="img" aria-label={text}>
      <text x="50%" y="72%" textAnchor="middle" fontSize={fontSize}>
        {Array.from(text).map((ch, i) => (
          <motion.tspan
            key={i}
            initial={reduce ? false : { strokeDashoffset: 1800, fillOpacity: 0 }}
            {...(play === undefined
              ? { whileInView: drawn, viewport: { once: true, amount: 0.5 } }
              : { animate: play ? drawn : { strokeDashoffset: 1800, fillOpacity: 0 } })}
            transition={{
              strokeDashoffset: { duration: 1.6, delay: delay + i * 0.12, ease: "easeInOut" },
              fillOpacity: { duration: 0.8, delay: delay + i * 0.12 + 1.1 },
            }}
          >
            {ch}
          </motion.tspan>
        ))}
      </text>
    </svg>
  );
}

/* Typing: reveals characters once in view; hidden remainder keeps layout from jumping. */
function TypingText({ text, as: Tag = "p", className = "", speed = 16, delay = 0, play = true }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const chars = Array.from(text);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!play) {
      setCount(0);
      return undefined;
    }
    if (!inView || reduce) return undefined;
    let id;
    const timeoutId = setTimeout(() => {
      id = setInterval(() => {
        setCount((c) => {
          if (c >= chars.length) {
            clearInterval(id);
            return c;
          }
          return c + 1;
        });
      }, speed);
    }, delay * 1000);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(id);
    };
  }, [inView, play, reduce, chars.length, speed, delay]);

  const shown = reduce ? chars.length : count;
  return (
    <Tag ref={ref} className={`lp4-typing ${className}`}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {chars.slice(0, shown).join("")}
        {shown < chars.length && <span className="lp4-caret" />}
        <span className="lp4-typing-rest">{chars.slice(shown).join("")}</span>
      </span>
    </Tag>
  );
}

function useSectionProgress() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return [ref, scrollYProgress];
}

function SiteHeader({ dark }) {
  return (
    <header className={`lp4-header${dark ? " is-dark" : ""}`}>
      <Link className="lp4-header-link" to="/home">
        HOME
      </Link>
      <a className="lp4-header-brand" href="#lp4-entry">ALL ABOUT HAIR</a>
      <a className="lp4-header-link lp4-header-contact" href="#lp4-contact">
        CONTACT
      </a>
    </header>
  );
}

/* Animated headline: letter-by-letter kinetic blur-up reveal in 1 single uniform color, no SVGs */
function AnimatedHeadline({ title, align = "center", className = "" }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });

  if (reduce) {
    return (
      <h2 className={`lp4-headline ${align === "left" ? "is-left" : ""} ${className}`}>
        {title}
      </h2>
    );
  }

  const words = title.split(" ");
  let globalCharIdx = 0;

  return (
    <h2
      ref={ref}
      className={`lp4-headline ${align === "left" ? "is-left" : ""} ${className}`}
      aria-label={title}
    >
      <span className="sr-only">{title}</span>
      <span aria-hidden="true" className="lp4-headline-track">
        {words.map((word, wIdx) => {
          const chars = Array.from(word);

          return (
            <span key={wIdx} className="lp4-headline-word">
              {chars.map((ch, cIdx) => {
                const delay = 0.1 + globalCharIdx++ * 0.032;

                return (
                  <motion.span
                    key={cIdx}
                    className="lp4-headline-char"
                    initial={{
                      opacity: 0,
                      y: 36,
                      filter: "blur(14px)",
                      rotateX: 25,
                    }}
                    animate={
                      inView
                        ? {
                            opacity: 1,
                            y: 0,
                            filter: "blur(0px)",
                            rotateX: 0,
                          }
                        : {
                            opacity: 0,
                            y: 36,
                            filter: "blur(14px)",
                            rotateX: 25,
                          }
                    }
                    transition={{
                      duration: 0.7,
                      delay,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {ch}
                  </motion.span>
                );
              })}
              {wIdx < words.length - 1 && <span className="lp4-headline-space">&nbsp;</span>}
            </span>
          );
        })}
      </span>
    </h2>
  );
}

function ChapterHead({
  num,
  kicker,
  title,
  lead,
  fullScreen = false,
  align = "center",
}) {
  return (
    <div className={`lp4-chapter${fullScreen ? " is-fullscreen" : ""}`}>
      <motion.div className="lp4-chapter-meta" {...fadeUp()}>
        <span className="lp4-kicker">{kicker}</span>
        {num && <span className="lp4-chapter-num">{num}</span>}
      </motion.div>
      <AnimatedHeadline title={title} align={align} />
      {lead && <TypingText className="lp4-chapter-lead" text={lead} />}
    </div>
  );
}

/* Entry: brand name on brand fill; a white circle opens from behind it as you scroll. */
function Entry() {
  const [ref, p] = useSectionProgress();
  const reduce = useReducedMotion();
  const radius = useTransform(p, [0.05, 0.88], [0, 150]);
  const clipPath = useMotionTemplate`circle(${radius}% at 50% 50%)`;
  const brandScale = useTransform(p, [0, 0.88], [1, 0.84]);

  return (
    <section ref={ref} id="lp4-entry" className="lp4-entry">
      <div className="lp4-sticky">
        <motion.div
          className="lp4-entry-circle"
          style={{ clipPath: reduce ? "circle(150% at 50% 50%)" : clipPath }}
        />
        <motion.div className="lp4-entry-brand" style={{ scale: brandScale }}>
          <span className="lp4-kicker">Trichology · Vegan Haircare</span>
          <Handwriting text="All About Hair" viewBox="0 0 1200 260" fontSize="170" delay={0.2} />
          <TypingText
            className="lp4-entry-lead"
            text="Khởi nguồn mái tóc khỏe đẹp bền vững từ một da đầu khỏe mạnh. Trải nghiệm giải pháp thuần chay từ thiên nhiên."
          />
        </motion.div>
        <div className="lp4-entry-loop">
          <ReactBitsTextLoop
            text="Mỹ phẩm 100% thuần chay theo nền tảng trichology"
            ribbonColor="#7B2CBF"
            color="#ffffff"
            shape="wave"
            curviness={24}
            speed={75}
            fontSize={26}
            fontWeight={700}
            letterSpacing={2}
            ribbonWidth={50}
            viewHeight={130}
            draggable={true}
            pauseOnHover={true}
            edgeFade={0.2}
          />
        </div>
      </div>
    </section>
  );
}

const scentLoop = {
  text: "ScentLabo",
  ribbonColor: "#7B2CBF",
  color: "#ffffff",
  shape: "wave",
  curviness: 24,
  speed: 75,
  fontSize: 21,
  fontWeight: 700,
  letterSpacing: 2,
  ribbonWidth: 40,
  viewHeight: 130,
  draggable: true,
  pauseOnHover: true,
  edgeFade: 0.2,
};

/* Forward wipes move right → left; the reverse wipe moves bottom → top. */
/* overlap: pulled up over the previous section's last screen so the sweep starts as soon as it ends. */
/* Reverse wipe: bottom → top transition, tuned to 125vh (25vh active scroll) reducing dark & light phases by half while preserving the smooth gradient. */
/* children: scroll with the section's dark background, under the layer (covered as the gradient rises).
   revealed: inside the gradient layer, so it rides along with the light background. */
function Wipe({ reverse = false, overlap = false, revealed, children }) {
  const [ref, p] = useSectionProgress();
  const position = useTransform(
    p,
    overlap ? [0, 0.98] : reverse ? [0, 1] : [0.05, 0.95],
    reverse ? ["100%", "0%"] : ["66.67%", "-33.34%"],
  );
  return (
    <section
      ref={ref}
      className={`lp4-wipe${reverse ? " is-reverse" : ""}${overlap ? " is-overlap" : ""}`}
      aria-hidden="true"
    >
      {children /* before the sticky so the rising gradient covers it */}
      <div className="lp4-sticky">
        <motion.div className="lp4-wipe-layer" style={reverse ? { y: position } : { x: position }}>
          {revealed}
        </motion.div>
      </div>
    </section>
  );
}

const kenNotes = [
  {
    title: "Nhìn gần thêm",
    accent: "một chút",
    text: "Đẳng cấp nằm ở khoảng cách gần. KÉN chọn cách chinh phục bạn từ những đường kim mũi chỉ tỉ mỉ nhất, nhãn mác tinh tế, đến bề mặt lụa bóng mượt không gây ma sát.",
    image: khaumuichiImg,
    caption: "FIG. 01 — SILK, WITH CARE",
  },
  {
    title: "Chất liệu",
    accent: "xúc cảm",
    text: "Chất liệu định hình cảm xúc. Sự mượt mà của lụa và satin không chỉ chạm vào mái tóc mà còn chạm đến sự thư thái trong tâm hồn người phụ nữ hiện đại.",
    accordionGallery: [
      { image: m1Img, label: "Starry Night", alt: "Kén — Starry Night" },
      { image: m2Img, label: "NACRE", alt: "Kén — NACRE" },
      { image: m3Img, label: "LAGON", alt: "Kén — LAGON" },
      { image: m4Img, label: "CIEL", alt: "Kén — CIEL" },
    ],
    caption: "FIG. 02 — A GENTLE TOUCH",
  },
  {
    title: "Chỉ một phút",
    accent: "cho mái tóc",
    text: "Cùng một bộ trang phục, cùng một kiểu tóc, nhưng thần thái thay đổi hoàn toàn chỉ với một điểm nhấn từ KÉN. Nhanh gọn, thanh lịch và luôn sẵn sàng.",
    image: "./assets/compare.jpg",
    caption: "FIG. 03 — BEFORE / AFTER",
  },
  {
    title: "Với bộ sưu tập",
    accent: "Scrunchies của Kén",
    text: "Mỗi gam màu là một tâm trạng — từ ngà ngọc dịu dàng đến đen tuyền huyền bí. Hãy chọn chiếc scrunchie kể câu chuyện của riêng bạn.",
    gallery: productGallery,
    caption: "FIG. 04 — THƯ VIỆN SẢN PHẨM",
  },
];

const orbLook = {
  colors: ["#FFF3F5", "#FF3158", "#6B1D2F"],
  backgroundColor: "#111013",
  size: 1.35,
  glow: 3,
  bleed: 1.8,
  highlight: 4,
  speed: 0.7,
  opacity: 1,
  followCursor: false,
  rotateOnHover: false,
  clickPulse: false,
  intro: false,
  dpr: 1,
};

// Each orb is its own WebGL context, so keep the count modest (browsers cap live contexts ~16).
const ORB_COUNT = 6;
const rand = (min, max) => min + Math.random() * (max - min);
const makeOrbs = () =>
  Array.from({ length: ORB_COUNT }, () => ({
    left: rand(-5, 85),
    top: rand(5, 75),
    size: rand(16, 30),
    dx: rand(-8, 8),
    dy: rand(-10, 10),
    duration: rand(9, 17),
    delay: rand(0, 3),
  }));

/* Kén: vertical scroll pins, the track scrolls horizontally through the panels. */
function Ken({ sectionRef }) {
  const panels = 1 + kenNotes.length;
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  // Spring smooths coarse mouse-wheel steps; the 0–0.12 hold lets the pin/reveal settle before sideways motion.
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.35 });
  const x = useTransform(smooth, [0.12, 0.95], ["0%", `-${((panels - 1) / panels) * 100}%`]);

  // Section overlaps the wipe; it shows (and its headline starts) once pinned, i.e. when the dark fill is complete.
  const [shown, setShown] = useState(false);
  const inView = useInView(sectionRef, { amount: 0.1 });
  const isTriggered = shown || inView;
  const [headlinePlay, setHeadlinePlay] = useState(false);
  const [orbs] = useState(makeOrbs); // random once per visit, stable across re-renders
  useMotionValueEvent(scrollYProgress, "change", (v) => setShown(v > 0));

  useEffect(() => {
    if (isTriggered) {
      // Đợi màn trượt / transition hoàn tất (1.2s) rồi mới bắt đầu chạy hiệu ứng headline
      const timer = setTimeout(() => {
        setHeadlinePlay(true);
      }, 1200);
      return () => clearTimeout(timer);
    } else {
      setHeadlinePlay(false);
    }
  }, [isTriggered]);

  return (
    <section
      ref={sectionRef}
      className={`lp4-ken${isTriggered ? " is-shown" : ""}`}
      style={{ height: `${panels * 100}vh` }}
      aria-label="Chương 02: Kén"
    >
      <div className="lp4-sticky">
        <div className="lp4-ken-orbs" aria-hidden="true">
          {orbs.map((o, i) => (
            <motion.div
              key={i}
              className="lp4-ken-orb"
              style={{ left: `${o.left}%`, top: `${o.top}%`, width: `${o.size}vmin`, height: `${o.size}vmin` }}
              animate={isTriggered ? { x: ["0vw", `${o.dx}vw`, "0vw"], y: ["0vh", `${o.dy}vh`, "0vh"] } : undefined}
              transition={{ duration: o.duration, delay: o.delay, repeat: Infinity, ease: "easeInOut" }}
            >
              <SpecterOrb {...orbLook} paused={!isTriggered} /* don't render WebGL while hidden behind the wipe */ />
            </motion.div>
          ))}
        </div>
        <motion.div className="lp4-ken-track" style={{ x, width: `${panels * 100}vw` }}>
          <div className="lp4-ken-panel lp4-ken-intro">
            <motion.span className="lp4-kicker" {...revealOn(headlinePlay, 0.1)}>
              Chapter 02 — Silk Care
            </motion.span>
            <Handwriting text="Kén" viewBox="0 0 700 320" fontSize="300" className="lp4-ken-word" play={headlinePlay} delay={0.2} />
            <div className="lp4-ken-lead">
              <motion.h2 {...revealOn(headlinePlay, 0.5)}>
                Lời hứa từ <em>sự nâng niu</em>
              </motion.h2>
              <TypingText
                play={headlinePlay}
                delay={0.8}
                text="Mỗi chiếc Scrunchies của KÉN ra đời không chỉ để buộc tóc, mà như một hiện vật trưng bày của sự nâng niu — ôm lấy mái tóc bạn bằng sự mềm mại tuyệt đối của lụa thượng hạng."
              />
            </div>
          </div>

          {kenNotes.map((note, i) => (
            <div
              className={`lp4-ken-panel${note.image || note.gallery || note.accordionGallery ? "" : " is-text-only"}`}
              key={note.title + (note.accent || "")}
            >
              {note.accordionGallery && (
                <motion.figure className="lp4-ken-figure lp4-ken-accordion-wrap" {...fadeLeft()}>
                  <AccordionGallery
                    items={note.accordionGallery}
                    defaultIndex={0}
                    accentColor="#c7a773"
                    overlayColor="#111013"
                    textColor="#f3eee6"
                    height="min(62vh, 620px)"
                    gap={8}
                    radius={12}
                    expandRatio={0.52}
                    grayscale={false}
                    className="lp4-ken-accordion"
                  />
                  <figcaption>{note.caption}</figcaption>
                </motion.figure>
              )}
              {note.gallery && (
                <motion.figure className="lp4-ken-figure lp4-ken-gallery" {...fadeLeft()}>
                  <DepthCarousel items={note.gallery} cardWidth={280} cardHeight={360} tint="#111013" />
                  <figcaption>{note.caption}</figcaption>
                </motion.figure>
              )}
              {note.image && (
                <motion.figure className="lp4-ken-figure" {...fadeLeft()}>
                  <img src={note.image} alt={note.title + (note.accent ? " " + note.accent : "")} decoding="async" />
                  <figcaption>{note.caption}</figcaption>
                </motion.figure>
              )}
              <motion.div className="lp4-ken-note" {...fadeLeft(0.1)}>
                <h3 className="lp4-ken-title">
                  <span className="lp4-ken-title-main">{note.title}</span>
                  {note.accent && (
                    <>
                      <br className="lp4-ken-title-break" />
                      <span className="lp4-ken-title-accent">{note.accent}</span>
                    </>
                  )}
                </h3>
                <TypingText text={note.text} />
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ScentLabo() {
  return (
    <section className="lp4-form-section lp4-scent" aria-label="Chương 03: ScentLabo">
      <ChapterHead
        kicker="Chapter 03 — ScentLabo"
        title="Mùi hương là nghi thức nhỏ yêu chiều bản thân."
        lead="Một làn hương dịu nhẹ trên tóc và da — khoảnh khắc nhỏ mỗi ngày để bạn dừng lại, hít thở và nâng niu chính mình."
        align="center"
      />
      <motion.div className="lp4-scent-gallery" {...fadeUp(0.1)}>
        <CircularGallery
          items={scentGallery}
          showTitles={false}
          font="bold 30px Playfair Display" /* not the default, so no runtime Google Fonts fetch */
          textColor="#2b2340"
          itemAspect={0.9}
          bend={2}
          borderRadius={0.04}
        />
      </motion.div>
    </section>
  );
}

function BookingForm() {
  function handleSubmit(event) {
    event.preventDefault();
    window.alert("Demo: Đã nhận lịch hẹn! Ở giai đoạn sau chúng ta sẽ gắn tính năng thật vào đây.");
    event.currentTarget.reset();
  }

  return (
    <section id="lp4-contact" className="lp4-form-section" aria-label="Chương 04: AAH Scalp Center">
      <ChapterHead
        kicker="Chapter 04 — AAH Scalp Center"
        title="Đặt lịch hẹn."
        lead="Trung tâm phục hồi và chăm sóc chuyên sâu. Hãy để chuyên gia của chúng tôi lắng nghe và chăm sóc da đầu bạn bằng các liệu pháp thiên nhiên kết hợp công nghệ hiện đại."
        align="center"
      />
      <div className="lp4-grid">
        {/* Wrapper carries the shadow: the stamp mask on the form would clip its own shadow */}
        <motion.div className="lp4-stamp" {...fadeLeft(0.1)}>
        <form className="lp4-form" onSubmit={handleSubmit}>
          <label>
            <span>Họ và tên *</span>
            <input type="text" name="name" autoComplete="name" required />
          </label>
          <label>
            <span>Số điện thoại *</span>
            <input type="tel" name="phone" autoComplete="tel" pattern="[0-9+ ]{9,15}" required />
          </label>
          <label>
            <span>Dịch vụ *</span>
            <select name="service" defaultValue="" required>
              <option value="" disabled>Chọn dịch vụ</option>
              <option value="soida">Soi da đầu &amp; Tư vấn</option>
              <option value="detox">Detox Da Đầu Chuyên Sâu</option>
              <option value="phuchoi">Phục hồi liên kết tóc</option>
            </select>
          </label>
          <label>
            <span>Ngày hẹn *</span>
            <input type="date" name="date" required />
          </label>
          <button type="submit">
            Xác nhận đặt lịch <ArrowRight size={16} aria-hidden="true" />
          </button>
        </form>
        </motion.div>
      </div>
    </section>
  );
}

/* AAH wave ribbon over the same curved carousel ScentLabo uses. */
function Dreams() {
  return (
    <section className="lp4-form-section lp4-dreams" aria-label="Chương 05: Cùng AAH lan tỏa cộng đồng">
      <ChapterHead kicker="Chapter 05 — AAH Community" title="Cùng AAH lan tỏa cộng đồng." align="center" />
      <div className="lp4-dreams-line">
        <ReactBitsTextLoop {...scentLoop} text="AAH team" />
      </div>
      <motion.div className="lp4-scent-gallery" {...fadeUp(0.1)}>
        <CircularGallery
          items={dreamGallery}
          showTitles={false}
          font="bold 30px Playfair Display" /* not the default, so no runtime Google Fonts fetch */
          textColor="#2b2340"
          itemAspect={1}
          bend={2}
          borderRadius={0.04}
        />
      </motion.div>
    </section>
  );
}

export default function LandingPage4() {
  const kenRef = useRef(null);
  const inKen = useInView(kenRef, { margin: "0px 0px -95% 0px" });
  const { scrollYProgress } = useScroll();
  const routineRef = useRef(null);

  // Pin the routine at its last screen (end of step 5) while the wipe plays:
  // sticky with top = viewport height − section height holds it once its bottom hits the viewport bottom.
  useEffect(() => {
    const el = routineRef.current;
    if (!el) return undefined;
    const update = () => {
      el.style.top = `${window.innerHeight - el.offsetHeight}px`;
    };
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    update();
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="lp4">
      <SiteHeader dark={inKen} />
      <motion.div className="lp4-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />
      <Entry />
      <div className="lp4-pin">
        <section ref={routineRef} className="lp4-routine" aria-label="Chương 01: Routine chăm sóc tóc">
          <ChapterHead
            kicker="Chapter 01 — Haircare Routine"
            title="Khoa học Trichology."
            lead="Mỗi bước trong routine đều bắt đầu từ da đầu. Cuộn xuống để khám phá từng bước chăm sóc cùng All About Hair."
            fullScreen={true}
          />
          <ProductShowcase Description={TypingText} ctaTo="#lp4-contact" ctaLabel="Đặt lịch tư vấn" />
        </section>
        <Wipe overlap />
      </div>
      <Ken sectionRef={kenRef} />
      <Wipe
        reverse
        revealed={
          /* 2: horizontal, fixed to the light background (ends mid-screen when the wipe completes) */
          <div className="lp4-wipe-loop is-flat">
            <ReactBitsTextLoop {...scentLoop} direction="reverse" />
          </div>
        }
      >
        {/* 1: diagonal on the dark background, from the left edge under Fig. 04 down-right */}
        <div className="lp4-wipe-loop is-diagonal">
          <ReactBitsTextLoop {...scentLoop} />
        </div>
      </Wipe>
      <ScentLabo />
      <BookingForm />
      <Dreams />
      <CustomerFeedback />
      <VoucherDraw />
      <ClickSparkEffect />
    </div>
  );
}
