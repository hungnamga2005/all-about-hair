import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";

export const steps = [
  {
    eyebrow: "BƯỚC 01 · LÀM MỀM",
    name: "Dầu dưỡng tóc",
    description:
      "Bắt đầu routine bằng dầu dưỡng để làm mềm tóc và chuẩn bị mái tóc cho các bước chăm sóc tiếp theo.",
    image: "/dutoc.png",
    alt: "Dầu dưỡng tóc All About Hair",
    imageClass: "showcase-product-tall",
  },
  {
    eyebrow: "BƯỚC 02 · LÀM SẠCH",
    name: "Tẩy tế bào chết da đầu",
    description:
      "Massage nhẹ nhàng để làm sạch da đầu, giúp loại bỏ cặn bẩn và mang lại cảm giác thông thoáng.",
    image: "/ttbc.png",
    alt: "Tẩy tế bào chết da đầu All About Hair",
    imageClass: "showcase-product-wide",
  },
  {
    eyebrow: "BƯỚC 03 · GỘI SẠCH",
    name: "Dầu gội Scalp Care",
    description:
      "Làm sạch tóc và da đầu với dầu gội Scalp Care, bước nền tảng trong routine chăm sóc tóc.",
    image: "/dg.png",
    alt: "Dầu gội Scalp Care All About Hair",
    imageClass: "showcase-product-tall",
  },
  {
    eyebrow: "BƯỚC 04 · DƯỠNG MƯỢT",
    name: "Dầu xả Bond Complex",
    description:
      "Dùng dầu xả trên thân và ngọn tóc để bổ sung độ mềm mượt sau khi gội.",
    image: "/dx.png",
    alt: "Dầu xả Bond Complex All About Hair",
    imageClass: "showcase-product-tall",
  },
  {
    eyebrow: "BƯỚC 05 · DƯỠNG CHUYÊN SÂU",
    name: "Xịt dưỡng Biotin",
    description:
      "Hoàn thiện routine bằng xịt dưỡng Biotin tiện lợi, đồng hành cùng mái tóc trong nhịp sống hằng ngày.",
    image: "/xbotic.png",
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
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleStep = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

        if (visibleStep) {
          setActiveStep(Number(visibleStep.target.dataset.stepIndex));
        }
      },
      {
        rootMargin: "-35% 0px -40% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    stepRefs.current.forEach((step) => {
      if (step) observer.observe(step);
    });

    return () => observer.disconnect();
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
          <AnimatePresence mode="wait">
            <motion.figure
              className={`showcase-product ${activeProduct.imageClass}`}
              key={activeProduct.image}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -16, scale: 0.97 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.35, ease: "easeOut" }}
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
