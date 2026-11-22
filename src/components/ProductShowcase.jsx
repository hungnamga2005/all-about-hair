import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";

export const steps = [
  {
    eyebrow: "LÀM MỀM",
    name: "Dầu dưỡng tóc",
    description:
      "Bắt đầu routine bằng dầu dưỡng để làm mềm tóc và chuẩn bị mái tóc cho các bước chăm sóc tiếp theo.",
    image: "./assets/dutoc.png",
    alt: "Dầu dưỡng tóc All About Hair",
    imageClass: "showcase-product-tall",
  },
  {
    eyebrow: "LÀM SẠCH",
    name: "Tẩy tế bào chết da đầu",
    description:
      "Massage nhẹ nhàng để làm sạch da đầu, giúp loại bỏ cặn bẩn và mang lại cảm giác thông thoáng.",
    image: "./assets/ttbc.png",
    alt: "Tẩy tế bào chết da đầu All About Hair",
    imageClass: "showcase-product-wide",
  },
  {
    eyebrow: "GỘI SẠCH",
    name: "Dầu gội Scalp Care",
    description:
      "Làm sạch tóc và da đầu với dầu gội Scalp Care, bước nền tảng trong routine chăm sóc tóc.",
    image: "./assets/dg.png",
    alt: "Dầu gội Scalp Care All About Hair",
    imageClass: "showcase-product-tall",
  },
  {
    eyebrow: "DƯỠNG MƯỢT",
    name: "Dầu xả Bond Complex",
    description:
      "Dùng dầu xả trên thân và ngọn tóc để bổ sung độ mềm mượt sau khi gội.",
    image: "./assets/dx.png",
    alt: "Dầu xả Bond Complex All About Hair",
    imageClass: "showcase-product-tall",
  },
  {
    eyebrow: "DƯỠNG CHUYÊN SÂU",
    name: "Xịt dưỡng Biotin",
    description:
      "Hoàn thiện routine bằng xịt dưỡng Biotin tiện lợi, đồng hành cùng mái tóc trong nhịp sống hằng ngày.",
    image: "./assets/xbotic.png",
    alt: "Xịt dưỡng Biotin All About Hair",
    imageClass: "showcase-product-tall",
  },
];

export default function ProductShowcase({
  Description,
  ctaTo = "/#products",
  ctaLabel = "Khám phá sản phẩm",
}) {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef([]);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    let ticking = false;

    const updateActiveStep = () => {
      // Trục trigger canh theo tầm mắt và tâm của khung ảnh sticky bên trái (~44% viewport)
      const triggerY = window.innerHeight * 0.44;
      let closestIndex = 0;
      let minDistance = Infinity;

      stepRefs.current.forEach((el, index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const stepCenter = rect.top + rect.height / 2;
        const distance = Math.abs(stepCenter - triggerY);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      setActiveStep((prev) => (prev !== closestIndex ? closestIndex : prev));
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateActiveStep);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    updateActiveStep();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const activeProduct = steps[activeStep];

  return (
    <section className="product-showcase" aria-labelledby="product-showcase-title">
      <div className="product-showcase-heading">
        <p className="story-eyebrow">ALL ABOUT HAIR · TRICHOLOGY</p>
        <h2 id="product-showcase-title">Routine chăm sóc tóc toàn diện</h2>
        <p>Cuộn xuống để khám phá từng bước chăm sóc cùng All About Hair.</p>
      </div>

      <div className="product-showcase-layout">
        <div className="product-showcase-stage" aria-live="polite">
          <span className="showcase-orbit showcase-orbit-one" aria-hidden="true" />
          <span className="showcase-orbit showcase-orbit-two" aria-hidden="true" />
          <AnimatePresence>
            <motion.figure
              className={`showcase-product ${activeProduct.imageClass}`}
              key={activeProduct.image}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -16, scale: 0.96 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.28, ease: "easeOut" }}
              style={{ gridArea: "1 / 1" }}
            >
              <img src={activeProduct.image} alt={activeProduct.alt} />
              <figcaption>{activeProduct.name}</figcaption>
            </motion.figure>
          </AnimatePresence>
          <span className="product-showcase-step-count">
            {String(activeStep + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
          </span>
        </div>

        <div className="product-showcase-steps">
          {steps.map((step, index) => (
            <article
              className={`product-showcase-step${activeStep === index ? " is-active" : ""}`}
              data-step-index={index}
              key={step.name}
              ref={(element) => {
                stepRefs.current[index] = element;
              }}
              aria-current={activeStep === index ? "step" : undefined}
            >
              <p className="story-eyebrow">{step.eyebrow}</p>
              <h3>{step.name}</h3>
              {Description ? <Description text={step.description} /> : <p>{step.description}</p>}
            </article>
          ))}
          <Link className="btn btn-primary product-showcase-cta" to={ctaTo}>
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
