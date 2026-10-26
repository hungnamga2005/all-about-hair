import { motion, useReducedMotion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.012,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

export default function AnimatedText({ as: Component = motion.p, children, className }) {
  const shouldReduceMotion = useReducedMotion();

  if (typeof children !== "string") {
    throw new TypeError("AnimatedText only supports plain text children.");
  }

  if (shouldReduceMotion) {
    return <Component className={className}>{children}</Component>;
  }

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      variants={containerVariants}
    >
      <span className="sr-only">{children}</span>
      <span className="animated-text-visual" aria-hidden="true">
        {children.trim().split(/\s+/).map((word, index) => (
          <motion.span
            className="animated-text-word"
            key={`${word}-${index}`}
            variants={wordVariants}
          >
            {word}
          </motion.span>
        ))}
      </span>
    </Component>
  );
}
