import { motion } from "framer-motion";
import AnimatedText from "../components/AnimatedText.jsx";
import ProductCategories from "../components/ProductCategories.jsx";
import ProductStory from "../components/ProductStory.jsx";
import ScrollReveal from "../components/ScrollReveal.jsx";
import TextLoop from "../components/TextLoop.jsx";

export default function HomePage() {
  return (
    <>
      <ScrollReveal as={motion.section} className="hero">
        <ScrollReveal as={motion.div} className="hero-content" delay={0.08}>
          <AnimatedText as={motion.h1}>Khoa học Trichology</AnimatedText>
          <AnimatedText>
            Khởi nguồn mái tóc khỏe đẹp bền vững từ một da đầu khỏe mạnh. Trải
            nghiệm giải pháp thuần chay từ thiên nhiên.
          </AnimatedText>
          <a href="/home#products" className="btn btn-primary">Khám Phá Ngay</a>
        </ScrollReveal>
        <img src="./assets/hero-banner.png" alt="Bộ sản phẩm chăm sóc tóc All About Hair" />
      </ScrollReveal>

      <TextLoop />
      <ProductCategories />
      <ProductStory />
    </>
  );
}
