import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedText from "../components/AnimatedText.jsx";
import ProductShowcase from "../components/ProductShowcase.jsx";
import ScrollReveal from "../components/ScrollReveal.jsx";
import TextLoop from "../components/TextLoop.jsx";

const hairStoryImage = "https://allabouthairvietnam.com/img_data/images/image.png";

const products = [
  {
    name: "Xịt dưỡng tóc Biotin Thuần chay",
    price: "299.000 VNĐ",
    image: "/xbotic.png",
    alt: "Xịt dưỡng tóc Biotin",
    badge: "Vegan",
    badgeClass: "vegan",
  },
  {
    name: "Tẩy tế bào chết da đầu Scalp Scrub",
    price: "379.000 VNĐ",
    image: "/ttbc.png",
    alt: "Tẩy tế bào chết da đầu",
    badge: "Best Seller",
    badgeClass: "hot",
  },
  {
    name: "Dầu xả Serum Mềm mượt Bond Complex",
    price: "299.000 VNĐ",
    image: "/dx.png",
    alt: "Dầu xả dưỡng tóc",
  },
];

function ProductSection() {
  return (
    <ScrollReveal as={motion.section} id="products" className="bestsellers">
      <ScrollReveal as={motion.h2} className="section-title">
        Sản Phẩm Nổi Bật
      </ScrollReveal>
      <div className="product-grid">
        {products.map((product, index) => (
          <ScrollReveal
            as={motion.article}
            className="product-card"
            delay={index * 0.12}
            key={product.name}
          >
            <div className="product-img">
              <img src={product.image} alt={product.alt} loading="lazy" />
              {product.badge && (
                <span className={`badge ${product.badgeClass}`}>{product.badge}</span>
              )}
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="price">{product.price}</p>
              <button className="btn btn-outline" type="button">
                Thêm vào giỏ
              </button>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </ScrollReveal>
  );
}

function StorySection() {
  return (
    <ScrollReveal as={motion.section} id="story" className="story-section">
      <div className="story-container">
        <ScrollReveal as={motion.div} className="story-image" direction="left">
          <img src={hairStoryImage} alt="Chăm sóc tóc cùng All About Hair" loading="lazy" />
        </ScrollReveal>
        <ScrollReveal as={motion.div} className="story-content" delay={0.12}>
          <p className="story-eyebrow">ALL ABOUT HAIR</p>
          <h2>CHUYỆN TÓC</h2>
          <AnimatedText>
            Góc nhỏ dành cho những ai muốn hiểu và chăm sóc mái tóc của mình theo
            cách tự nhiên nhất. Ở đây có những chia sẻ gần gũi về tóc, da đầu và
            thói quen chăm sóc mỗi ngày - từ kiến thức dễ hiểu đến những gợi ý
            nhỏ giúp bạn lắng nghe mái tóc mình tốt hơn. AAH mong rằng, qua từng
            bài viết, việc chăm sóc tóc sẽ trở thành một phần nhẹ nhàng và vừa
            vặn trong nhịp sống hằng ngày của bạn.
          </AnimatedText>
          <Link className="btn btn-primary" to="/stories">
            Xem ngay
          </Link>
        </ScrollReveal>
      </div>
    </ScrollReveal>
  );
}

function BookingSection() {
  function handleSubmit(event) {
    event.preventDefault();
    window.alert("Demo: Đã nhận lịch hẹn! Ở giai đoạn sau chúng ta sẽ gắn tính năng thật vào đây.");
    event.currentTarget.reset();
  }

  return (
    <ScrollReveal as={motion.section} id="scalp-center" className="booking-section">
      <div className="booking-container">
        <ScrollReveal as={motion.div} className="booking-text">
          <h2>AAH Scalp Center</h2>
          <AnimatedText>
            Trung tâm phục hồi và chăm sóc chuyên sâu. Hãy để chuyên gia của
            chúng tôi lắng nghe và chăm sóc da đầu bạn bằng các liệu pháp thiên
            nhiên kết hợp công nghệ hiện đại.
          </AnimatedText>
          <ul className="features">
            <li><Check aria-hidden="true" /> Soi da đầu miễn phí</li>
            <li><Check aria-hidden="true" /> Phác đồ điều trị cá nhân hóa</li>
            <li><Check aria-hidden="true" /> Không gian thư giãn tĩnh tâm</li>
          </ul>
        </ScrollReveal>
        <ScrollReveal as={motion.div} className="booking-form-box" delay={0.12}>
          <h3>Đặt Lịch Hẹn</h3>
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Họ và Tên của bạn" required />
            <input type="tel" name="phone" placeholder="Số điện thoại" required />
            <select name="service" defaultValue="" required>
              <option value="" disabled>Chọn dịch vụ</option>
              <option value="soida">Soi da đầu &amp; Tư vấn</option>
              <option value="detox">Detox Da Đầu Chuyên Sâu</option>
              <option value="phuchoi">Phục hồi liên kết tóc</option>
            </select>
            <input type="date" name="date" aria-label="Ngày hẹn" required />
            <button type="submit" className="btn btn-primary btn-full">
              Xác nhận Đặt Lịch
            </button>
          </form>
        </ScrollReveal>
      </div>
    </ScrollReveal>
  );
}

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
          <a href="/#products" className="btn btn-primary">Khám Phá Ngay</a>
        </ScrollReveal>
        <img src="/hero-banner.png" alt="Bộ sản phẩm chăm sóc tóc All About Hair" />
      </ScrollReveal>

      <TextLoop />
      <ProductShowcase />

      <ScrollReveal as={motion.section} id="combo" className="flashsale" aria-label="Ưu đãi đặc quyền">
        <ScrollReveal as={motion.div} className="flashsale-header">
          <h2><Zap aria-hidden="true" /> ƯU ĐÃI ĐẶC QUYỀN</h2>
          <div className="countdown">
            <span>Kết thúc sau: </span>
            <div className="time-box">05</div> :
            <div className="time-box">24</div> :
            <div className="time-box">59</div>
          </div>
        </ScrollReveal>
      </ScrollReveal>

      <ProductSection />
      <StorySection />
      <BookingSection />
    </>
  );
}
