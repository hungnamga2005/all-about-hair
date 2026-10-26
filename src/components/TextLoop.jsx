import { motion, useReducedMotion } from "framer-motion";

const text = "Mỹ phẩm 100% thuần chay theo nền tảng trichology";

export default function TextLoop() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="text-loop" aria-label={text}>
      <p className="sr-only">{text}</p>
      <motion.div
        className="text-loop-track"
        aria-hidden="true"
        animate={shouldReduceMotion ? undefined : { x: ["0%", "-50%"] }}
        transition={
          shouldReduceMotion
            ? undefined
            : { duration: 20, ease: "linear", repeat: Infinity }
        }
      >
        {[0, 1, 2, 3].map((copy) => (
          <span className="text-loop-copy" key={copy}>
            {text}
            <span className="text-loop-separator">✦</span>
          </span>
        ))}
      </motion.div>
    </section>
  );
}
