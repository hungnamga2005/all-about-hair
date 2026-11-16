import { useEffect, useMemo, useRef } from "react";
import Particles, { useParticlesProvider } from "@tsparticles/react";
import { useReducedMotion } from "framer-motion";

const SPRINKLE_COUNT = 20;
const MAX_PARTICLES = 200;
const SPRINKLE_COLORS = ["#7b2cbf", "#d7b8ed", "#f5d76e", "#ffffff"];

export default function ClickSparkEffect() {
  const containerRef = useRef(null);
  const { loaded } = useParticlesProvider();
  const shouldReduceMotion = useReducedMotion();

  const options = useMemo(
    () => ({
      fullScreen: { enable: true, zIndex: 1100 },
      detectRetina: false,
      fpsLimit: 60,
      particles: {
        number: { value: 0 },
        move: { enable: true },
        size: { value: { min: 4, max: 6 } },
        opacity: { value: 1 },
        paint: {
          color: { value: SPRINKLE_COLORS },
          fill: { enable: false },
          stroke: { width: 1.2 },
        },
        rotate: {
          value: { min: 0, max: 360 },
          animation: { enable: true, speed: 30, sync: false },
        },
        life: { duration: { value: 10 }, count: 1 },
        shape: { type: "star", options: { star: { sides: 4, inset: 0.35 } } },
      },
    }),
    [],
  );

  useEffect(() => {
    if (!loaded || shouldReduceMotion) return undefined;

    function handlePointerDown(event) {
      if (event.target instanceof Element && event.target.closest("footer")) return;

      const container = containerRef.current;
      if (!container) return;

      container.particles.removeQuantity(
        Math.max(0, container.particles.count + SPRINKLE_COUNT - MAX_PARTICLES),
      );

      for (let index = 0; index < SPRINKLE_COUNT; index += 1) {
        const color = SPRINKLE_COLORS[index % SPRINKLE_COLORS.length];
        container.particles.addParticle(
          { x: event.clientX, y: event.clientY },
          {
            paint: {
              color: { value: color },
              fill: { enable: false },
              stroke: { color: { value: color }, width: 1.2 },
            },
            move: {
              angle: 225 + Math.random() * 90,
              enable: true,
              gravity: { acceleration: 6, enable: true, inverse: false },
              speed: Math.random() * 2 + 3,
              outModes: { default: "destroy" },
            },
            rotate: {
              value: Math.random() * 360,
              animation: { enable: true, speed: 30, sync: false },
            },
            shape: { type: "star", options: { star: { sides: 4, inset: 0.35 } } },
            size: { value: Math.random() * 2 + 4 },
          },
        );
      }
    }

    document.addEventListener("pointerdown", handlePointerDown, true);
    return () => document.removeEventListener("pointerdown", handlePointerDown, true);
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
