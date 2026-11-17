import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import BounceCards from "./BounceCards.jsx";
import "./VoucherDraw.css";

// shortcut: codes are display-only demo codes; real redemption needs backend-issued codes.
export const vouchers = [
  { value: "-10%", title: "Xịt dưỡng Biotin", code: "BIOTIN10" },
  { value: "-50K", title: "Tẩy tế bào chết Scalp Scrub", code: "SCRUB50" },
  { value: "0đ", title: "Soi da đầu tại AAH Scalp Center", code: "SCALPFREE" },
  { value: "-15%", title: "Combo routine toàn diện", code: "ROUTINE15" },
  { value: "Freeship", title: "Miễn phí vận chuyển", code: "FREESHIP" },
];

/* Uniform random pick; rng is injectable so the choice can be tested deterministically. */
export function randomVoucher(list = vouchers, rng = Math.random) {
  if (!list.length) return null;
  return list[Math.min(list.length - 1, Math.floor(rng() * list.length))];
}

const fan = [
  "rotate(10deg) translate(-66px)",
  "rotate(4deg) translate(-22px)",
  "rotate(-4deg) translate(22px)",
  "rotate(-10deg) translate(66px)",
];

const cardBacks = fan.map((_, i) => (
  <div className="voucher-back" key={i}>
    <span className="sr-only">Bốc voucher</span>
    <span className="voucher-back-label" aria-hidden="true">VOUCHER</span>
  </div>
));

/* Floating cards in the bottom-right corner: tap a card to draw, the prize appears as a card too. */
export default function VoucherDraw() {
  const [prize, setPrize] = useState(null);
  const [copied, setCopied] = useState(false);

  const draw = () => {
    setCopied(false);
    setPrize({ ...randomVoucher(), id: Date.now() }); // new id → card re-bounces even on a repeat prize
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(prize.code);
      setCopied(true);
    } catch {
      setCopied(false); // clipboard blocked (http / permissions): code stays visible to copy by hand
    }
  };

  return (
    <aside className="voucher-draw" aria-label="Bốc voucher ngẫu nhiên">
      <AnimatePresence mode="wait">
        {prize ? (
          <motion.div
            key={prize.id}
            className="voucher-card"
            initial={{ scale: 0.3, rotate: -12, y: 40, opacity: 0 }}
            animate={{ scale: 1, rotate: -3, y: 0, opacity: 1 }}
            exit={{ scale: 0.5, rotate: 8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 13 }}
            role="status"
          >
            <button type="button" className="voucher-close" onClick={() => setPrize(null)} aria-label="Đóng voucher">
              <X size={13} aria-hidden="true" />
            </button>
            <span className="voucher-card-label">AAH · Voucher</span>
            <strong className="voucher-card-value">{prize.value}</strong>
            <span className="voucher-card-title">{prize.title}</span>
            <button type="button" className="voucher-card-code" onClick={copy}>
              {copied ? "Đã sao chép ✓" : prize.code}
            </button>
            <button type="button" className="voucher-card-again" onClick={draw}>
              Bốc lại
            </button>
          </motion.div>
        ) : (
          <motion.div key="stack" className="voucher-stack" exit={{ opacity: 0 }}>
            <BounceCards
              cards={cardBacks}
              containerWidth={250}
              containerHeight={150}
              transformStyles={fan}
              pushOffset={36}
              animationDelay={0.6}
              onCardClick={draw}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
}
