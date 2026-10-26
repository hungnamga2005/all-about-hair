import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";

const products = [
  {
    name: "Dầu gội Scalp Care",
    image: "/dg.png",
    alt: "Dầu gội chăm sóc da đầu All About Hair",
    className: "showcase-shampoo",
    y: [40, -18, 40],
    rotate: [-8, -3, 4],
  },
  {
    name: "Dầu dưỡng tóc",
    image: "/dutoc.png",
    alt: "Dầu dưỡng tóc All About Hair",
    className: "showcase-oil",
    y: [-28, 28, -28],
    rotate: [7, 2, -5],
  },
  {
    name: "Dầu xả Bond Complex",
    image: "/dx.png",
    alt: "Dầu xả Bond Complex All About Hair",
    className: "showcase-conditioner",
    y: [24, -35, 24],
    rotate: [-5, 1, 7],
  },
  {
    name: "Tẩy tế bào chết da đầu",
    image: "/ttbc.png",
    alt: "Tẩy tế bào chết da đầu All About Hair",
    className: "showcase-scrub",
    y: [-30, 20, -30],
    rotate: [-4, 3, 8],
  },
  {
    name: "Xịt dưỡng Biotin",
    image: "/xbotic.png",
    alt: "Xịt dưỡng Biotin All About Hair",
    className: "showcase-biotin",
    y: [35, -25, 35],
    rotate: [8, 2, -6],
  },
];

function FloatingProduct({ product, progress }) {
  const shouldReduceMotion = useReducedMotion();
  const y = useTransform(progress, [0, 0.5, 1], shouldReduceMotion ? [0, 0, 0] : product.y);
  const rotate = useTransform(
    progress,
    [0, 0.5, 1],
    shouldReduceMotion ? [0, 0, 0] : product.rotate,
  );

  return (
    <motion.figure className={`showcase-product ${product.className}`} style={{ y, rotate }}>
      <img src={product.image} alt={product.alt} loading="lazy" />
      <figcaption>{product.name}</figcaption>
    </motion.figure>
  );
}

export default function ProductShowcase() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <section className="product-showcase" ref={sectionRef}>
      <div className="product-showcase-layout">
        <div className="product-showcase-copy">
          <p className="story-eyebrow">ALL ABOUT HAIR</p>
          <h2>Chăm sóc tóc, bắt đầu từ da đầu</h2>
          <p>
            Khám phá bộ sản phẩm thuần chay được phát triển theo nền tảng
            Trichology, đồng hành cùng bạn trong từng bước chăm sóc tóc.
          </p>
          <Link className="btn btn-primary" to="/#products">
            Khám phá sản phẩm
          </Link>
        </div>
        <div className="product-showcase-stage" aria-label="Bộ sản phẩm All About Hair">
          <span className="showcase-orbit showcase-orbit-one" aria-hidden="true" />
          <span className="showcase-orbit showcase-orbit-two" aria-hidden="true" />
          {products.map((product) => (
            <FloatingProduct
              product={product}
              progress={scrollYProgress}
              key={product.name}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
