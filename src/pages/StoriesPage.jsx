import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ScrollReveal from "../components/ScrollReveal.jsx";

const stories = [
  {
    category: "DA ĐẦU",
    title: "Da đầu khỏe là nền tảng cho mái tóc khỏe",
    excerpt:
      "Tìm hiểu vì sao một da đầu cân bằng là bước đầu tiên trong hành trình chăm sóc tóc.",
    image: "/dg.png",
    alt: "Sản phẩm chăm sóc da đầu",
  },
  {
    category: "CHĂM SÓC TÓC",
    title: "Gội đầu dịu nhẹ, chăm sóc tóc mỗi ngày",
    excerpt:
      "Một vài thói quen nhỏ giúp việc gội đầu trở thành khoảng thời gian thư giãn và phù hợp hơn.",
    image: "/dutoc.png",
    alt: "Sản phẩm chăm sóc tóc",
  },
  {
    category: "DƯỠNG TÓC",
    title: "Lắng nghe điều mái tóc cần",
    excerpt:
      "Chọn cách dưỡng tóc vừa vặn với mái tóc và nhịp sống của bạn.",
    image: "/dx.png",
    alt: "Sản phẩm dưỡng tóc",
  },
  {
    category: "TRICHOLOGY",
    title: "Tẩy tế bào chết da đầu là gì?",
    excerpt:
      "Khám phá cách làm sạch da đầu chuyên sâu và cách đưa bước chăm sóc này vào routine.",
    image: "/ttbc.png",
    alt: "Sản phẩm tẩy tế bào chết da đầu",
  },
];

export default function StoriesPage() {
  return (
    <section className="stories-page">
      <div className="stories-page-header">
        <Link className="stories-back-link" to="/#story">
          ← Về trang chủ
        </Link>
        <p className="story-eyebrow">ALL ABOUT HAIR</p>
        <h1>Chuyện Tóc</h1>
        <p className="stories-intro">
          Những chia sẻ gần gũi về tóc, da đầu và thói quen chăm sóc mỗi ngày.
        </p>
      </div>

      <div className="stories-grid">
        {stories.map((story, index) => (
          <ScrollReveal
            as={motion.article}
            className="story-card"
            delay={index * 0.08}
            key={story.title}
          >
            <div className="story-card-image">
              <img src={story.image} alt={story.alt} loading="lazy" />
            </div>
            <div className="story-card-content">
              <p className="story-card-category">{story.category}</p>
              <h2>{story.title}</h2>
              <p>{story.excerpt}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
