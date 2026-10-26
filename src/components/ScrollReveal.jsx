import { motion, useReducedMotion } from "framer-motion";

export default function ScrollReveal({
  as: Component = motion.div,
  children,
  className,
  delay = 0,
  direction = "up",
  ...motionProps
}) {
  const shouldReduceMotion = useReducedMotion();
  const offset = direction === "left" ? { x: 24 } : { y: 24 };

  return (
    <Component
      {...motionProps}
      className={className}
      initial={shouldReduceMotion ? false : { opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.65,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </Component>
  );
}
