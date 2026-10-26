import { useEffect, useMemo, useRef } from "react";
import Particles, { useParticlesProvider } from "@tsparticles/react";
import { useReducedMotion } from "framer-motion";

const SPARK_COUNT = 12;
const MAX_PARTICLES = 180;

export default function ClickSparkEffect() {
  const containerRef = useRef(null);
  const { loaded } = useParticlesProvider();
  const shouldReduceMotion = useReducedMotion();

  const options = useMemo(
    () => ({
      fullScreen: { enable: true, zIndex: 10 },
      detectRetina: true,
      fpsLimit: 60,
      particles: {
        number: { value: 0 },
        move: { enable: true },
        size: { value: { min: 2, max: 4 } },
        opacity: { value: 1 },
        color: { value: ["#7b2cbf", "#d7b8ed", "#f5d76e", "#ffffff"] },
        shape: { type: ["circle", "star"] },
        life: { duration: { value: 0.8 }, count: 1 },
      },
    }),
    [],
  );

  useEffect(() => {
    if (!loaded || shouldReduceMotion) return undefined;

    function handlePointerDown(event) {
      const container = containerRef.current;
      if (!container) return;

      const position = { x: event.clientX, y: event.clientY };
      container.particles.removeQuantity(
        Math.max(0, container.particles.count + SPARK_COUNT - MAX_PARTICLES),
      );

      for (let index = 0; index < SPARK_COUNT; index += 1) {
        container.particles.addParticle(position, {
          color: { value: ["#7b2cbf", "#d7b8ed", "#f5d76e", "#ffffff"][index % 4] },
          move: {
            angle: Math.random() * 360,
            enable: true,
            speed: Math.random() * 3 + 3,
            outModes: { default: "destroy" },
          },
          opacity: {
            value: 1,
            animation: { enable: true, speed: 3, startValue: "max", destroy: "min" },
          },
          shape: { type: Math.random() > 0.5 ? "star" : "circle" },
          size: { value: Math.random() * 3 + 2 },
        });
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [loaded, shouldReduceMotion]);

  if (!loaded || shouldReduceMotion) return null;

  return (
    <Particles
      id="click-spark-particles"
      options={options}
      particlesLoaded={(container) => {
        containerRef.current = container ?? null;
      }}
      className="click-spark-particles"
      style={{ pointerEvents: "none", zIndex: 1100 }}
    />
  );
}
