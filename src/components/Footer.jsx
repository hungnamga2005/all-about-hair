import { motion } from "framer-motion";
import AnimatedText from "./AnimatedText.jsx";
import ScrollReveal from "./ScrollReveal.jsx";

export default function Footer() {
  return (
    <ScrollReveal as={motion.footer}>
      <div className="footer-col">
        <a className="logo" href="/">
          ALL ABOUT HAIR
        </a>
        <AnimatedText>
          Phát triển từ năm 2016, tiên phong ứng dụng khoa học Trichology vào
          các sản phẩm chăm sóc tóc thuần Việt.
        </AnimatedText>
      </div>
    </ScrollReveal>
  );
}
