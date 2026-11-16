import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./BounceCards.css";

/*
 * Bounce Cards (React Bits), adapted: renders arbitrary card content and scopes
 * all GSAP targets to refs instead of global ".card" selectors.
 */
const noRotation = (t) =>
  /rotate\([\s\S]*?\)/.test(t)
    ? t.replace(/rotate\([\s\S]*?\)/, "rotate(0deg)")
    : t === "none"
      ? "rotate(0deg)"
      : `${t} rotate(0deg)`;

const pushed = (t, offsetX) => {
  const re = /translate\(([-0-9.]+)px\)/;
  const m = t.match(re);
  if (m) return t.replace(re, `translate(${parseFloat(m[1]) + offsetX}px)`);
  return t === "none" ? `translate(${offsetX}px)` : `${t} translate(${offsetX}px)`;
};

export default function BounceCards({
  cards = [],
  className = "",
  containerWidth = 400,
  containerHeight = 400,
  animationDelay = 0.5,
  animationStagger = 0.06,
  easeType = "elastic.out(1, 0.8)",
  transformStyles = [],
  enableHover = true,
  pushOffset = 160,
  onCardClick,
}) {
  const rootRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRefs.current.filter(Boolean),
        { scale: 0 },
        { scale: 1, stagger: animationStagger, ease: easeType, delay: animationDelay },
      );
    }, rootRef);
    return () => ctx.revert();
  }, [animationDelay, animationStagger, easeType, cards.length]);

  const tween = (i, transform, delay = 0) => {
    const el = cardRefs.current[i];
    if (!el) return;
    gsap.killTweensOf(el);
    gsap.to(el, { transform, duration: 0.4, ease: "back.out(1.4)", delay, overwrite: "auto" });
  };

  const pushSiblings = (hovered) => {
    if (!enableHover) return;
    cards.forEach((_, i) => {
      const base = transformStyles[i] || "none";
      if (i === hovered) tween(i, noRotation(base));
      else tween(i, pushed(base, i < hovered ? -pushOffset : pushOffset), Math.abs(hovered - i) * 0.05);
    });
  };

  const resetSiblings = () => {
    if (!enableHover) return;
    cards.forEach((_, i) => tween(i, transformStyles[i] || "none"));
  };

  return (
    <div
      ref={rootRef}
      className={`bounce-cards ${className}`}
      style={{ width: containerWidth, height: containerHeight }}
    >
      {cards.map((card, i) => (
        <div
          key={i}
          ref={(el) => {
            cardRefs.current[i] = el;
          }}
          className="bounce-cards__card"
          style={{ transform: transformStyles[i] ?? "none" }}
          onMouseEnter={() => pushSiblings(i)}
          onMouseLeave={resetSiblings}
          {...(onCardClick && {
            role: "button",
            tabIndex: 0,
            onClick: () => onCardClick(i),
            onKeyDown: (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onCardClick(i);
              }
            },
          })}
        >
          {card}
        </div>
      ))}
    </div>
  );
}
