import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import ScrollExpand from "./ScrollExpand.jsx";
import SpecterOrb from "./SpecterOrb.jsx";
import "./KenStorytelling.css";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false, amount: 0.1 },
  transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] },
});

const imageReveal = (delay = 0.05) => ({
  initial: { opacity: 0, y: 26, scale: 0.97 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: false, amount: 0.1 },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
});

const lineReveal = (delay = 0.08, center = false) => ({
  initial: { scaleX: 0, originX: center ? 0.5 : 0 },
  whileInView: { scaleX: 1 },
  viewport: { once: false, amount: 0.1 },
  transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function KenStorytelling() {
  const containerRef = useRef(null);
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimerRef = useRef(null);
  const expandProgressRef = useRef(0);

  const handleExpandProgress = useCallback((p) => {
    expandProgressRef.current = p;
    const header = document.querySelector("header");
    if (!header) return;

    const chapter2 = document.getElementById("ken-chapter-2");
    const finalChapter = document.getElementById("ken-chapter-6");

    const inDarkEntry = p >= 0.22;
    const inDarkChapters = chapter2 && chapter2.getBoundingClientRect().top <= 10;
    const pastKen = finalChapter && finalChapter.getBoundingClientRect().bottom <= 60;

    if ((inDarkEntry || inDarkChapters) && !pastKen) {
      header.classList.add("header-dark-mode");
    } else {
      header.classList.remove("header-dark-mode");
    }
  }, []);

  // Sync dark mode styling with main website header while user is immersed in KenStorytelling
  useEffect(() => {
    const checkHeaderTheme = () => {
      const header = document.querySelector("header");
      if (!header) return;

      const p = expandProgressRef.current;
      const chapter2 = document.getElementById("ken-chapter-2");
      const finalChapter = document.getElementById("ken-chapter-6");

      const inDarkEntry = p >= 0.22;
      const inDarkChapters = chapter2 && chapter2.getBoundingClientRect().top <= 100;
      const pastKen = finalChapter && finalChapter.getBoundingClientRect().bottom <= 60;

      if ((inDarkEntry || inDarkChapters) && !pastKen) {
        header.classList.add("header-dark-mode");
      } else {
        header.classList.remove("header-dark-mode");
      }
    };

    window.addEventListener("scroll", checkHeaderTheme, { passive: true });
    checkHeaderTheme();

    return () => {
      window.removeEventListener("scroll", checkHeaderTheme);
      const header = document.querySelector("header");
      if (header) header.classList.remove("header-dark-mode");
    };
  }, []);

  // Cleanup toast timer on unmount
  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  const scrollToChapter = (chapterId) => {
    const el = document.getElementById(chapterId);
    if (!el) return;
    const headerOffset = 80;
    const elPosition = el.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
      top: elPosition - headerOffset,
      behavior: "smooth",
    });
  };

  const handleCtaClick = () => {
    setToastVisible(true);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => {
      setToastVisible(false);
    }, 4000);
  };

  return (
    <section
      ref={containerRef}
      className="ken-storytelling-root"
      aria-label="KÉN — AAH Scrunchies Studio Storytelling"
    >
      {/* ====================================================================
          CHAPTER 01 • SCROLL EXPAND: Lời Hứa Từ Sự Nâng Niu
          A rounded media frame that smoothly expands to full bleed as the
          user scrolls through the viewport, introducing Chapter 1 of Kén.
          ==================================================================== */}
      <ScrollExpand
        id="ken-chapter-1"
        src="https://lh3.googleusercontent.com/ggms/AF1QipN38jCq2lR8E674J6k5U_lvh97wV_qZqH5O1W0L=s1024"
        alt="Bộ sưu tập KÉN — Lời Hứa Từ Sự Nâng Niu"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = "/k1.png";
        }}
        useWindowScroll={true}
        entryPoint="70%"
        startWidth={44}
        startHeight={54}
        startRadius={24}
        endRadius={0}
        mediaZoom={1.2}
        scrollDistance={2.0}
        holdDistance={0.3}
        smoothing={0.045}
        overlayScrim={0.58}
        bgFadeStart={0.0}
        bgFadeEnd={0.28}
        onProgress={handleExpandProgress}
        titleTag="01 • Mở Đầu"
        entryTitle="Kén"
        title="Lời Hứa Từ Sự Nâng Niu"
        scrollHint="Cuộn để mở rộng câu chuyện KÉN ↓"
      >
        <div className="ken-expand-overlay-content">
          <div className="ken-badge">01 • Mở Đầu</div>
          <h2 className="ken-heading ken-heading-centered" style={{ marginTop: "16px", marginBottom: "16px" }}>
            Lời Hứa Từ <span className="ken-title-accent">Sự Nâng Niu</span>
          </h2>
          <hr className="ken-divider-gold ken-divider-center" style={{ marginBottom: "20px" }} />
          <p className="ken-description ken-description-centered" style={{ maxWidth: "680px", marginBottom: "26px" }}>
            Mỗi chiếc scrunchies của KÉN ra đời không chỉ để buộc tóc, mà như một hiện vật trưng bày của sự nâng niu. Giống như chiếc kén bảo bọc lấy những gì tinh tế nhất trước khi hóa thành cánh bướm, KÉN ôm lấy mái tóc bạn bằng sự mềm mại tuyệt đối của lụa thượng hạng.
          </p>
          <button
            type="button"
            onClick={() => scrollToChapter("ken-chapter-2")}
            className="btn-luxury"
          >
            <span>Tiếp Tục Câu Chuyện</span>
            <ArrowDown size={14} aria-hidden="true" />
          </button>
        </div>
      </ScrollExpand>

      {/* ====================================================================
          CHAPTER 02 • Triết Lý Thiết Kế: Nhìn Gần Thêm Một Chút
          ==================================================================== */}
      <section id="ken-chapter-2" className="ken-chapter-section ken-chapter-with-orb">
        {/* Specter Orb anchored directly in background of "Nhìn Gần Thêm Một Chút" */}
        <div className="ken-chapter-orb-wrap" aria-hidden="true">
          <SpecterOrb
            colors={["#E0C097", "#6B1D2F", "#7b2cbf"]}
            backgroundColor="#0a0a0b"
            size={1.35}
            glow={1.3}
            speed={0.7}
            opacity={0.8}
            dpr={1}
          />
        </div>

        <div className="ken-container">
          <div className="ken-grid-2col ken-reverse-desktop">
            <motion.div className="ken-order-img-first" {...imageReveal(0.06)}>
              <div className="img-hover-box">
                <img
                  src="https://lh3.googleusercontent.com/ggms/AF1QipM-pXq7856s_8aO4h2Kx-qjZ82q9dF1aW7aR2B6=s1024"
                  alt="Cận cảnh chi tiết lụa đỏ rượu"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/k2.png";
                  }}
                />
              </div>
            </motion.div>

            <div className="ken-content-col ken-order-text-first">
              <motion.div className="ken-badge" {...fadeUp(0)}>
                02 • Triết Lý Thiết Kế
              </motion.div>

              <motion.h2 className="ken-heading" {...fadeUp(0.04)}>
                &ldquo;Nhìn Gần Thêm <br />
                <span className="ken-title-accent">Một Chút&rdquo;</span>
              </motion.h2>

              <motion.hr className="ken-divider-burgundy" {...lineReveal(0.08)} />

              <motion.p className="ken-description" {...fadeUp(0.12)}>
                Đẳng cấp nằm ở khoảng cách gần. KÉN chọn cách chinh phục bạn từ những đường kim mũi
                chỉ tỉ mỉ nhất, nhãn mác tinh tế, đến bề mặt lụa bóng mượt không gây ma sát. Nhìn
                gần thêm một chút, để thấy tâm huyết dồn nén trong từng chi tiết nhỏ.
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          CHAPTER 03 • Giá Trị Cốt Lõi: Material Shapes Emotion
          ==================================================================== */}
      <section id="ken-chapter-3" className="ken-chapter-section">
        <div className="ken-container">
          <div className="ken-grid-2col">
            <div className="ken-content-col ken-order-text-first">
              <motion.div className="ken-badge" {...fadeUp(0)}>
                03 • Giá Trị Cốt Lõi
              </motion.div>

              <motion.h2 className="ken-heading" {...fadeUp(0.04)}>
                Material Shapes <br />
                <span className="ken-title-accent">Emotion</span>
              </motion.h2>

              <motion.hr className="ken-divider-gold" {...lineReveal(0.08)} />

              <motion.p className="ken-description" {...fadeUp(0.12)}>
                Chất liệu định hình cảm xúc. Sự mượt mà của lụa và satin không chỉ chạm vào mái tóc
                mà còn chạm đến sự thư thái trong tâm hồn người phụ nữ hiện đại. Một chút óng ả, một
                chút kiêu kỳ nhưng vô cùng dịu êm.
              </motion.p>
            </div>

            <motion.div className="ken-order-img-first" {...imageReveal(0.06)}>
              <div className="img-hover-box">
                <img
                  src="https://lh3.googleusercontent.com/ggms/AF1QipMj1N5b-V-R_x7J-c2R0gV1940e4sS3P0X0V4v4=s1024"
                  alt="Material Shapes Emotion"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "https://placehold.co/800x1000/141416/E0C097?text=KEN+Material+Shapes+Emotion";
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          CHAPTER 04 • Trải Nghiệm Thực Tế: Chỉ Một Phút Cho Mái Tóc
          ==================================================================== */}
      <section id="ken-chapter-4" className="ken-chapter-section">
        <div className="ken-container">
          <div className="ken-header-stack">
            <motion.div className="ken-badge ken-badge-center" {...fadeUp(0)}>
              04 • Trải Nghiệm Thực Tế
            </motion.div>
            <motion.h2 className="ken-heading ken-heading-centered" {...fadeUp(0.04)}>
              Chỉ Một Phút Cho Mái Tóc
            </motion.h2>
            <motion.hr className="ken-divider-gold ken-divider-center" {...lineReveal(0.08, true)} />
            <motion.p className="ken-description ken-description-centered" {...fadeUp(0.12)}>
              Chỉ một phút biến hóa cho mái tóc. Cùng một bộ trang phục, cùng một kiểu tóc, nhưng thần
              thái thay đổi hoàn toàn chỉ với một điểm nhấn từ KÉN. Nhanh gọn, thanh lịch và luôn sẵn
              sàng để bạn tỏa sáng ở bất cứ đâu.
            </motion.p>
          </div>

          <div className="ken-dual-grid">
            <motion.div {...imageReveal(0.05)}>
              <div className="img-hover-box">
                <img
                  src="https://lh3.googleusercontent.com/ggms/AF1QipO3-N1-9R5X_h21z43j8tS2T046E97E2K8U844O=s1024"
                  alt="Just One Minute For Your Hair"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/k1.png";
                  }}
                />
              </div>
            </motion.div>

            <motion.div {...imageReveal(0.12)}>
              <div className="img-hover-box">
                <img
                  src="https://lh3.googleusercontent.com/ggms/AF1QipNEg1Hh-oZ51r4x7B6J1t3X8U7T12q1X2x-x144=s1024"
                  alt="Before After Change"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "./assets/compare.jpg";
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          CHAPTER 05 • Tính Ứng Dụng Đa Dạng: Nẻo Đường Của Sự Thanh Lịch
          ==================================================================== */}
      <section id="ken-chapter-5" className="ken-chapter-section">
        <div className="ken-container">
          <div className="ken-header-stack">
            <motion.div className="ken-badge ken-badge-center" {...fadeUp(0)}>
              05 • Tính Ứng Dụng Đa Dạng
            </motion.div>
            <motion.h2 className="ken-heading ken-heading-centered" {...fadeUp(0.04)}>
              Nẻo Đường Của Sự Thanh Lịch
            </motion.h2>
            <motion.hr className="ken-divider-burgundy ken-divider-center" {...lineReveal(0.08, true)} />
            <motion.p className="ken-description ken-description-centered" {...fadeUp(0.12)}>
              Dù là sắc trắng Moonstone tinh khôi trên nền tóc tối hay ánh sao huyền ảo của Starry
              Night, KÉN hòa quyện tự nhiên vào phong cách sống của bạn. Và để vẻ đẹp ấy bền lâu, KÉN
              cũng cần được chăm chút đúng cách – bởi &lsquo;KÉN đẹp nhất khi được chăm sóc đúng
              cách&rsquo;.
            </motion.p>
          </div>

          <div className="ken-dual-grid">
            <motion.div {...imageReveal(0.05)}>
              <div className="img-hover-box">
                <img
                  src="https://lh3.googleusercontent.com/ggms/AF1QipO4L906u70yM_S1Y_l7w871h1z2y3x4w5v6u7t8=s1024"
                  alt="Moonstone on Dark Hair"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "https://placehold.co/800x1000/141416/E0C097?text=KEN+Moonstone";
                  }}
                />
              </div>
            </motion.div>

            <motion.div {...imageReveal(0.12)}>
              <div className="img-hover-box">
                <img
                  src="https://lh3.googleusercontent.com/ggms/AF1QipP_L3l4Z4_v3X2X0q_3w3r2v1u0t9s8r7q6p5o4=s1024"
                  alt="Chăm sóc KÉN đúng cách"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "https://placehold.co/800x1000/141416/E0C097?text=KEN+Care+Guide";
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          CHAPTER 06 • Lời Kết: Đóng Gói Trải Nghiệm
          ==================================================================== */}
      <section id="ken-chapter-6" className="ken-chapter-section">
        <div className="ken-container">
          <div className="ken-grid-2col ken-reverse-desktop">
            <motion.div className="ken-order-img-first" {...imageReveal(0.06)}>
              <div className="img-hover-box">
                <img
                  src="https://lh3.googleusercontent.com/ggms/AF1QipM7Y8z9a0b1c2d3e4f5g6h7i8j9k0l1m2n3o4p5=s1024"
                  alt="Hộp quà niêm phong logo KÉN"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "https://placehold.co/800x800/141416/E0C097?text=KEN+Gift+Box";
                  }}
                />
              </div>
            </motion.div>

            <div className="ken-content-col ken-order-text-first">
              <motion.div className="ken-badge" {...fadeUp(0)}>
                06 • Lời Kết
              </motion.div>

              <motion.h2 className="ken-heading" {...fadeUp(0.04)}>
                Đóng Gói <br />
                <span className="ken-title-accent">Trải Nghiệm</span>
              </motion.h2>

              <motion.hr className="ken-divider-gold" {...lineReveal(0.08)} />

              <motion.p className="ken-description" {...fadeUp(0.12)}>
                Mỗi đơn hàng từ KÉN được trao đi như một hộp quà trân quý gửi đến chính bạn hoặc
                người thương. Khép lại một hành trình làm đẹp từ những điều nguyên bản nhất.
              </motion.p>

              <motion.div style={{ paddingTop: "12px" }} {...fadeUp(0.16)}>
                <button
                  type="button"
                  onClick={handleCtaClick}
                  className="btn-luxury btn-luxury-large"
                  aria-label="Khám Phá Bộ Sưu Tập KÉN"
                >
                  <Sparkles size={16} aria-hidden="true" />
                  <span>Khám Phá Bộ Sưu Tập KÉN</span>
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          TRANSITION GRADIENT: DARK OBSIDIAN TO LIGHT BOOKING SECTION
          Smooth ambient gradient mask connecting the dark Kén storytelling
          editorial aesthetic into the light Scalp Center section.
          ==================================================================== */}
      <div className="ken-exit-transition-gradient" aria-hidden="true" />

      {/* Interactive Toast Notification */}
      <AnimatePresence>
        {toastVisible && (
          <motion.div
            className="ken-toast-container"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="ken-toast" role="status" aria-live="polite">
              <Sparkles className="ken-toast-icon" size={20} />
              <span className="ken-toast-text">
                Chào mừng bạn đến với Bộ Sưu Tập KÉN Studio!
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
