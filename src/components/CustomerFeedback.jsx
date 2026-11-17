import { useState, useEffect, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

import fb1 from "../../ken/fb1.jpg";
import fb2 from "../../ken/fb2.jpg";
import fb3 from "../../ken/fb3.jpg";
import fb4 from "../../ken/fb4.jpg";
import fb5 from "../../ken/fb5.jpg";
import fb6 from "../../ken/fb6.jpg";
import fb7 from "../../ken/fb7.jpg";
import fb8 from "../../ken/fb8.jpg";
import fb9 from "../../ken/fb9.jpg";

import "./CustomerFeedback.css";

const STAMPS_DATA = [
  {
    id: 1,
    image: fb1,
    alt: "Phản hồi khách hàng All About Hair - Tem 01",
    client: "Khách hàng Trâm Anh",
    service: "Phục Hồi Tơ Tằm Kén",
    tag: "AAH Verified",
    denom: "500đ",
    baseRotate: -7,
    baseOffsetX: -14,
    baseOffsetY: 10,
    baseZIndex: 2,
  },
  {
    id: 2,
    image: fb2,
    alt: "Phản hồi khách hàng All About Hair - Tem 02",
    client: "Khách hàng Hoàng Yến",
    service: "Chăm Sóc Da Đầu Chuyên Sâu",
    tag: "AAH Verified",
    denom: "200đ",
    baseRotate: 6,
    baseOffsetX: 16,
    baseOffsetY: -18,
    baseZIndex: 1,
  },
  {
    id: 3,
    image: fb3,
    alt: "Phản hồi khách hàng All About Hair - Tem 03",
    client: "Khách hàng Thảo My",
    service: "Trải Nghiệm Kén & Dưỡng Ẩm",
    tag: "AAH Verified",
    denom: "800đ",
    baseRotate: -10,
    baseOffsetX: -8,
    baseOffsetY: 14,
    baseZIndex: 3,
  },
  {
    id: 4,
    image: fb4,
    alt: "Phản hồi khách hàng All About Hair - Tem 04",
    client: "Khách hàng Hương Giang",
    service: "Liệu Trình Tóc Hư Tổn",
    tag: "AAH Verified",
    denom: "300đ",
    baseRotate: 8,
    baseOffsetX: 20,
    baseOffsetY: -12,
    baseZIndex: 2,
  },
  {
    id: 5,
    image: fb5,
    alt: "Phản hồi khách hàng All About Hair - Tem 05",
    client: "Khách hàng Mai Phương",
    service: "ScentLabo Hair Fragrance",
    tag: "AAH Verified",
    denom: "1000đ",
    baseRotate: -5,
    baseOffsetX: -10,
    baseOffsetY: 22,
    baseZIndex: 4,
  },
  {
    id: 6,
    image: fb6,
    alt: "Phản hồi khách hàng All About Hair - Tem 06",
    client: "Khách hàng Bảo Ngọc",
    service: "Scalp Detox & Nuôi Nang Tóc",
    tag: "AAH Verified",
    denom: "400đ",
    baseRotate: 11,
    baseOffsetX: 14,
    baseOffsetY: -16,
    baseZIndex: 1,
  },
  {
    id: 7,
    image: fb7,
    alt: "Phản hồi khách hàng All About Hair - Tem 07",
    client: "Khách hàng Phương Linh",
    service: "Silk Care Chuyên Sâu",
    tag: "AAH Verified",
    denom: "600đ",
    baseRotate: -8,
    baseOffsetX: -18,
    baseOffsetY: 12,
    baseZIndex: 3,
  },
  {
    id: 8,
    image: fb8,
    alt: "Phản hồi khách hàng All About Hair - Tem 08",
    client: "Khách hàng Diệu Huyền",
    service: "Tư Vấn Trichology & Phục Hồi",
    tag: "AAH Verified",
    denom: "250đ",
    baseRotate: 5,
    baseOffsetX: 12,
    baseOffsetY: -8,
    baseZIndex: 2,
  },
  {
    id: 9,
    image: fb9,
    alt: "Phản hồi khách hàng All About Hair - Tem 09",
    client: "Khách hàng Ngọc Mai",
    service: "Chăm Sóc & Tạo Kiểu Tự Nhiên",
    tag: "AAH Verified",
    denom: "750đ",
    baseRotate: -6,
    baseOffsetX: -12,
    baseOffsetY: 18,
    baseZIndex: 5,
  },
];

/* Decorative vintage postal cancellation postmark - memoized to prevent re-renders */
const Postmark = memo(function Postmark({ className = "", rotation = -12 }) {
  return (
    <svg
      className={`lp4-feedback-postmark ${className}`}
      viewBox="0 0 100 100"
      style={{ transform: `rotate(${rotation}deg)` }}
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="1.6" strokeDasharray="4 2.5" />
      <circle cx="50" cy="50" r="32" fill="none" stroke="currentColor" strokeWidth="1.1" />
      <path d="M 0 35 Q 12 30 24 35 T 48 35" fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.8" />
      <path d="M 0 50 Q 12 45 24 50 T 48 50" fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.8" />
      <path d="M 0 65 Q 12 60 24 65 T 48 65" fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.8" />
      <text x="50" y="38" textAnchor="middle" fontSize="6.5" fontWeight="700" fill="currentColor" letterSpacing="0.08em">
        AAH SCALP
      </text>
      <text x="50" y="52" textAnchor="middle" fontSize="6.2" fontWeight="600" fill="currentColor" letterSpacing="0.05em">
        ★ VERIFIED ★
      </text>
      <text x="50" y="66" textAnchor="middle" fontSize="5.5" fill="currentColor" letterSpacing="0.06em">
        POSTAGE 2026
      </text>
    </svg>
  );
});

export default function CustomerFeedback() {
  const [activeModalIndex, setActiveModalIndex] = useState(null);

  // Keyboard navigation for lightbox modal
  const handleKeyDown = useCallback(
    (e) => {
      if (activeModalIndex === null) return;
      if (e.key === "Escape") {
        setActiveModalIndex(null);
      } else if (e.key === "ArrowLeft") {
        setActiveModalIndex((prev) => (prev > 0 ? prev - 1 : STAMPS_DATA.length - 1));
      } else if (e.key === "ArrowRight") {
        setActiveModalIndex((prev) => (prev < STAMPS_DATA.length - 1 ? prev + 1 : 0));
      }
    },
    [activeModalIndex]
  );

  useEffect(() => {
    if (activeModalIndex === null) return undefined;
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModalIndex, handleKeyDown]);

  const activeStamp = activeModalIndex !== null ? STAMPS_DATA[activeModalIndex] : null;

  return (
    <section id="lp4-feedback" className="lp4-feedback-section" aria-label="Chương 06: Feedback khách hàng">
      {/* Chapter Header */}
      <div className="lp4-chapter">
        <motion.div
          className="lp4-chapter-meta"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="lp4-kicker">Chapter 06 — Customer Feedback</span>
        </motion.div>

        <motion.h1
          className="lp4-headline"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
        >
          Những chiếc tem gửi trọn tin yêu.
        </motion.h1>

        <motion.p
          className="lp4-chapter-lead"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          Mỗi lời phản hồi là một chiếc tem thư lưu giữ khoảnh khắc rạng rỡ và sự hài lòng
          của khách hàng trên hành trình chăm sóc tóc cùng All About Hair.
        </motion.p>
      </div>

      {/* Scattered Postage Stamp Gallery Desk */}
      <div className="lp4-feedback-desk">
        {STAMPS_DATA.map((stamp, index) => (
          <motion.div
            key={stamp.id}
            className="lp4-feedback-card-col"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.55,
              delay: (index % 3) * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div
              className="lp4-feedback-card-wrapper"
              style={{
                "--rot": `${stamp.baseRotate}deg`,
                "--ox": `${stamp.baseOffsetX}px`,
                "--oy": `${stamp.baseOffsetY}px`,
                "--z": stamp.baseZIndex,
              }}
              onClick={() => setActiveModalIndex(index)}
              role="button"
              tabIndex={0}
              aria-label={`Xem chi tiết ${stamp.client}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveModalIndex(index);
                }
              }}
            >
              {/* Postage Stamp Element */}
              <div className="lp4-feedback-stamp">
                <div className="lp4-feedback-photo-frame">
                  <img
                    src={stamp.image}
                    alt={stamp.alt}
                    className="lp4-feedback-photo"
                    loading="lazy"
                    decoding="async"
                    width={320}
                    height={320}
                  />
                  <Postmark rotation={stamp.id % 2 === 0 ? 14 : -12} />
                  <div className="lp4-feedback-zoom-hint" aria-hidden="true">
                    <Maximize2 size={11} />
                    <span>Xem</span>
                  </div>
                </div>

                {/* Stamp Paper Footer */}
                <div className="lp4-feedback-stamp-footer">
                  <span className="lp4-feedback-stamp-tag">{stamp.tag}</span>
                  <span className="lp4-feedback-stamp-denom">{stamp.denom}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox / Zoom Modal for Enlarged Reading */}
      <AnimatePresence>
        {activeStamp && (
          <motion.div
            className="lp4-feedback-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setActiveModalIndex(null)}
          >
            <motion.div
              className="lp4-feedback-modal-dialog"
              initial={{ scale: 0.9, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 16 }}
              transition={{ type: "spring", stiffness: 360, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                className="lp4-feedback-modal-close"
                onClick={() => setActiveModalIndex(null)}
                aria-label="Đóng"
              >
                <X size={22} />
              </button>

              {/* Prev & Next navigation buttons */}
              <button
                type="button"
                className="lp4-feedback-modal-nav lp4-feedback-modal-prev"
                onClick={() =>
                  setActiveModalIndex((prev) => (prev > 0 ? prev - 1 : STAMPS_DATA.length - 1))
                }
                aria-label="Tem trước"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                type="button"
                className="lp4-feedback-modal-nav lp4-feedback-modal-next"
                onClick={() =>
                  setActiveModalIndex((prev) => (prev < STAMPS_DATA.length - 1 ? prev + 1 : 0))
                }
                aria-label="Tem tiếp theo"
              >
                <ChevronRight size={24} />
              </button>

              {/* Large Stamp Container */}
              <div className="lp4-feedback-modal-stamp-wrap">
                <div className="lp4-feedback-modal-stamp">
                  <div className="lp4-feedback-modal-photo-frame">
                    <img
                      src={activeStamp.image}
                      alt={activeStamp.alt}
                      className="lp4-feedback-modal-photo"
                      decoding="async"
                    />
                  </div>

                  <div className="lp4-feedback-modal-footer">
                    <div className="lp4-feedback-modal-meta">
                      <span className="lp4-feedback-modal-client">{activeStamp.client}</span>
                      <span className="lp4-feedback-modal-service">{activeStamp.service}</span>
                    </div>
                    <div className="lp4-feedback-modal-stars" aria-label="Đánh giá 5 sao">
                      ★★★★★
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
