import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowDown, ArrowRight, Check } from "lucide-react";
import ProductShowcase from "../components/ProductShowcase.jsx";
import "./LandingPage2.css";

const ease = [0.22, 1, 0.36, 1];

function TypingText({ text, className = "", speed = 16 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const reduceMotion = useReducedMotion();
  const characters = Array.from(text);
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (!inView || reduceMotion) return undefined;

    const timer = window.setInterval(() => {
      setVisibleCount((count) => {
        if (count >= characters.length) {
          window.clearInterval(timer);
          return count;
        }
        return count + 1;
      });
    }, speed);

    return () => window.clearInterval(timer);
  }, [inView, reduceMotion, characters.length, speed]);

  const count = reduceMotion ? characters.length : visibleCount;
  const complete = count >= characters.length;

  return (
    <p ref={ref} className={`lp2-typing ${className}`}>
      <span className="lp2-sr-only">{text}</span>
      <span aria-hidden="true">
        {characters.slice(0, count).join("")}
        {!complete && <span className="lp2-caret" />}
        <span className="lp2-typing-rest">{characters.slice(count).join("")}</span>
      </span>
    </p>
  );
}

function Handwriting({ text, viewBox, className = "", delay = 0 }) {
  const reduceMotion = useReducedMotion();

  return (
    <svg
      className={`lp2-handwriting ${className}`}
      viewBox={viewBox}
      role="img"
      aria-label={text}
    >
      <text x="50%" y="72%" textAnchor="middle">
        {Array.from(text).map((character, index) => (
          <motion.tspan
            key={`${character}-${index}`}
            initial={
              reduceMotion ? false : { strokeDashoffset: 1200, fillOpacity: 0 }
            }
            whileInView={{ strokeDashoffset: 0, fillOpacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              strokeDashoffset: {
                duration: 1.65,
                delay: delay + index * 0.09,
                ease: "easeInOut",
              },
              fillOpacity: {
                duration: 0.7,
                delay: delay + index * 0.09 + 1.05,
                ease: "easeOut",
              },
            }}
          >
            {character}
          </motion.tspan>
        ))}
      </text>
    </svg>
  );
}

function PageHeader({ dark }) {
  return (
    <header className={`lp2-header${dark ? " lp2-header-dark" : ""}`}>
      <a className="lp2-header-link lp2-header-home" href="/" aria-label="Về trang chủ">
        <span>HOME</span>
        <ArrowRight size={14} aria-hidden="true" />
      </a>
      <a className="lp2-header-brand" href="#lp2-entry" aria-label="All About Hair">
        ALL ABOUT HAIR
      </a>
      <a className="lp2-header-link lp2-header-contact" href="#lp2-form">
        CONTACT
        <ArrowRight size={14} aria-hidden="true" />
      </a>
    </header>
  );
}

function EntrySection() {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const reveal = useTransform(scrollYProgress, [0, 0.62], [0, 155]);
  const clipPath = useMotionTemplate`circle(${reveal}% at 50% 50%)`;

  return (
    <section
      ref={sectionRef}
      className="lp2-entry-track"
      id="lp2-entry"
      aria-label="All About Hair"
    >
      <div className="lp2-entry-sticky">
        <motion.div
          className="lp2-entry-white"
          style={{ clipPath: reduceMotion ? "circle(155% at 50% 50%)" : clipPath }}
          aria-hidden="true"
        />
        <div className="lp2-entry-content">
          <span className="lp2-kicker">TRICHOLOGY · VEGAN HAIRCARE</span>
          <Handwriting
            className="lp2-brand-title"
            text="All About Hair"
            viewBox="0 0 1400 240"
            delay={0.2}
          />
          <TypingText
            className="lp2-entry-copy"
            speed={18}
            text="Một khởi đầu dịu dàng cho mái tóc khỏe đẹp — từ sự thấu hiểu da đầu, chăm sóc có cơ sở khoa học và những thói quen phù hợp với bạn."
          />
          <span className="lp2-scroll-note">
            SCROLL TO EXPLORE <ArrowDown size={15} aria-hidden="true" />
          </span>
        </div>
        <span className="lp2-entry-index" aria-hidden="true">
          01 — 03
        </span>
      </div>
    </section>
  );
}

function Transition({ reverse = false }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(
    scrollYProgress,
    [0.05, 0.95],
    reverse ? ["-58%", "35%"] : ["58%", "-35%"],
  );

  return (
    <section
      ref={ref}
      className={`lp2-transition${reverse ? " lp2-transition-reverse" : ""}`}
      aria-hidden="true"
    >
      <div className="lp2-transition-sticky">
        <motion.div className="lp2-transition-gradient" style={{ x }} />
      </div>
    </section>
  );
}

const kenNotes = [
  {
    number: "01",
    title: "Lụa nâng niu mái tóc",
    text: "KÉN chọn lụa tơ tằm mềm mại để hạn chế ma sát, nâng niu mái tóc trong những khoảnh khắc thường ngày.",
  },
  {
    number: "02",
    title: "Tinh tế trong từng chi tiết",
    text: "Từ chất liệu đến đường may, mỗi chi tiết đều hướng đến cảm giác nhẹ nhàng, chỉn chu và bền đẹp.",
  },
  {
    number: "03",
    title: "Một điểm chạm dịu dàng",
    text: "Một món phụ kiện nhỏ, đủ để hoàn thiện diện mạo và nhắc bạn dành thêm sự chăm sóc cho bản thân.",
  },
];

function KenSection({ sectionRef }) {
  return (
    <section ref={sectionRef} className="lp2-ken" aria-label="Chương 2: Kén">
      <div className="lp2-ken-inner">
        <div className="lp2-ken-heading">
          <div className="lp2-ken-title-wrap">
            <span className="lp2-kicker lp2-kicker-light">CHAPTER 02 — SILK CARE</span>
            <Handwriting
              className="lp2-ken-title"
              text="Kén"
              viewBox="0 0 700 280"
              delay={0.2}
            />
          </div>
          <div className="lp2-ken-intro">
            <span className="lp2-chapter-number lp2-chapter-number-light">02</span>
            <h2>Một chiếc kén cho mái tóc được nâng niu.</h2>
            <TypingText
              className="lp2-ken-copy"
              speed={17}
              text="Lấy cảm hứng từ sự bao bọc dịu dàng, KÉN mang đến những phụ kiện lụa mềm mại để chăm sóc mái tóc theo cách tinh tế và gần gũi hơn."
            />
          </div>
        </div>

        <div className="lp2-ken-gallery">
          <motion.figure
            className="lp2-ken-image lp2-ken-image-one"
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.75, ease }}
          >
            <img src="/k1.png" alt="Phụ kiện lụa Kén" loading="lazy" />
            <figcaption>FIG. 01 — SILK, WITH CARE</figcaption>
          </motion.figure>
          <motion.figure
            className="lp2-ken-image lp2-ken-image-two"
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.75, delay: 0.12, ease }}
          >
            <img src="/k2.png" alt="Chi tiết bộ sưu tập Kén" loading="lazy" />
            <figcaption>FIG. 02 — A GENTLE TOUCH</figcaption>
          </motion.figure>
        </div>

        <ol className="lp2-ken-notes">
          {kenNotes.map((note) => (
            <motion.li
              key={note.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, ease }}
            >
              <span className="lp2-ken-note-number">[{note.number}]</span>
              <h3>{note.title}</h3>
              <TypingText className="lp2-ken-note-copy" speed={18} text={note.text} />
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const concerns = [
  "Gàu & ngứa da đầu",
  "Rụng tóc / tóc mỏng",
  "Da đầu dầu",
  "Thân tóc khô xơ",
  "Tóc hư tổn do uốn/nhuộm",
  "Da đầu nhạy cảm",
];

function BookingSection() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="lp2-booking" id="lp2-form" aria-label="Chương 3: Đặt lịch tư vấn">
      <div className="lp2-booking-inner">
        <div className="lp2-booking-intro">
          <span className="lp2-kicker">CHAPTER 03 — YOUR ROUTINE</span>
          <span className="lp2-chapter-number">03</span>
          <h2>Bắt đầu từ điều mái tóc bạn cần.</h2>
          <TypingText
            className="lp2-booking-copy"
            speed={17}
            text="Chia sẻ tình trạng tóc và da đầu của bạn. Đội ngũ All About Hair sẽ liên hệ để lắng nghe và tư vấn bước chăm sóc phù hợp."
          />
          <div className="lp2-booking-promise">
            <span aria-hidden="true"><Check size={17} /></span>
            Tư vấn cá nhân hóa cùng chuyên viên chăm sóc tóc
          </div>
        </div>

        <motion.div
          className="lp2-form-card"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease }}
        >
          <div className="lp2-form-heading">
            <h3>{submitted ? "Biểu mẫu xem trước" : "Đăng ký tư vấn"}</h3>
            <span>AAH / 03</span>
          </div>
          {submitted ? (
            <div className="lp2-form-success" role="status">
              <p>
                Biểu mẫu này chưa kết nối dịch vụ tiếp nhận, nên thông tin bạn nhập chưa được lưu
                hoặc gửi đi.
              </p>
              <button type="button" onClick={() => setSubmitted(false)}>
                Quay lại biểu mẫu
              </button>
            </div>
          ) : (
            <form className="lp2-form" onSubmit={handleSubmit}>
              <div className="lp2-form-row">
                <label>
                  <span>Họ và tên *</span>
                  <input name="name" autoComplete="name" required />
                </label>
                <label>
                  <span>Số điện thoại *</span>
                  <input
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    pattern="[0-9+ ]{9,15}"
                    required
                  />
                </label>
              </div>
              <label>
                <span>Bạn muốn được tư vấn về</span>
                <select name="concern" defaultValue="">
                  <option value="" disabled>Chọn tình trạng tóc</option>
                  {concerns.map((concern) => (
                    <option key={concern} value={concern}>{concern}</option>
                  ))}
                </select>
              </label>
              <label>
                <span>Lời nhắn của bạn</span>
                <textarea name="message" rows="3" />
              </label>
              <p className="lp2-form-note">
                Bản giao diện hiện chưa kết nối dịch vụ gửi thông tin.
              </p>
              <button className="lp2-submit" type="submit">
                Hoàn tất biểu mẫu <ArrowRight size={16} aria-hidden="true" />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default function LandingPage2() {
  const [isKenVisible, setIsKenVisible] = useState(false);
  const kenRef = useRef(null);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    document.title = "All About Hair — Routine & Kén";
    const section = kenRef.current;
    if (!section) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setIsKenVisible(entry.isIntersecting),
      { threshold: 0.05 },
    );
    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="lp2">
      <PageHeader dark={isKenVisible} />
      <motion.div
        className="lp2-scroll-progress"
        style={{ scaleX: scrollYProgress }}
        aria-hidden="true"
      />
      <EntrySection />
      <section className="lp2-routine" id="lp2-routine" aria-label="Chương 1: Routine chăm sóc tóc">
        <div className="lp2-routine-label">
          <span className="lp2-kicker">CHAPTER 01 — HAIRCARE ROUTINE</span>
          <span className="lp2-chapter-number">01</span>
        </div>
        <ProductShowcase
          Description={TypingText}
          ctaTo="#lp2-form"
          ctaLabel="Tư vấn routine"
        />
      </section>
      <Transition />
      <KenSection sectionRef={kenRef} />
      <Transition reverse />
      <BookingSection />
    </div>
  );
}
