import { ArrowUpRight, Instagram, Music2 } from "lucide-react";

const navigationLinks = [
  { label: "Trang chủ", href: "/" },
  { label: "Sản phẩm", href: "/#products" },
  { label: "Scalp Center", href: "/#scalp-center" },
  { label: "Chuyện tóc", href: "/stories" },
];

const policyLinks = [
  "Trợ giúp & Câu hỏi thường gặp",
  "Quy định sử dụng sản phẩm",
  "Chính sách đổi - trả hàng",
  "Chính sách vận chuyển",
  "Hướng dẫn thanh toán",
  "Chính sách bảo mật thông tin",
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__layout">
        <div className="site-footer__main">
          <a className="site-footer__eyebrow" href="/" aria-label="All About Hair - Trang chủ">
            ALL ABOUT HAIR <span>·</span> TRICHOLOGY
          </a>

          <h2 className="site-footer__headline">
            <span>All About Hair</span>
            <span className="site-footer__headline-muted">All About Hair</span>
          </h2>

          <div className="site-footer__lifecycle" aria-label="Quy trình chăm sóc tóc">
            <span>CHĂM SÓC</span>
            <a href="/#products">Làm sạch</a>
            <a href="/#products">Dưỡng tóc</a>
            <a href="/#scalp-center">Chăm sóc da đầu</a>
            <a href="/#scalp-center">Phục hồi</a>
          </div>

          <div className="site-footer__link-groups">
            <nav aria-label="Điều hướng cuối trang">
              <h3>Khám phá</h3>
              <ul>
                {navigationLinks.map(({ label, href }) => (
                  <li key={label}><a href={href}>{label}</a></li>
                ))}
              </ul>
            </nav>

            <section aria-labelledby="footer-policies-title">
              <h3 id="footer-policies-title">Chính sách</h3>
              <ul>
                {policyLinks.map((policy) => (
                  <li key={policy}><span>{policy}</span></li>
                ))}
              </ul>
            </section>
          </div>

          <div className="site-footer__socials" aria-label="Mạng xã hội của AAH">
            <span aria-label="Facebook" title="Facebook">f</span>
            <span aria-label="Instagram" title="Instagram"><Instagram size={18} /></span>
            <span aria-label="TikTok" title="TikTok"><Music2 size={18} /></span>
          </div>

          <div className="site-footer__legal">
            <p><strong>Công ty TNHH Mỹ phẩm All About Hair</strong> · MST: 1602069988</p>
            <p>34 đường số 11, Khu dân cư Him Lam, Quận 7, TPHCM · Hotline: <a href="tel:+84822522322">0822 522 322</a></p>
            <p>© {new Date().getFullYear()} All About Hair. Bảo lưu mọi quyền.</p>
          </div>
        </div>

        <aside className="site-footer__feature" aria-label="Khám phá All About Hair">
          <img
            className="site-footer__feature-image"
            src="/k2.png"
            alt="KÉN scrunchie in burgundy satin"
          />

          <div className="site-footer__feature-card">
            <p className="site-footer__feature-eyebrow">CHĂM SÓC ĐÚNG CƠ CHẾ</p>
            <h3>Da đầu khỏe. Mái tóc bền đẹp.</h3>
            <a className="site-footer__cta" href="/#products">
              Khám phá sản phẩm <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
        </aside>
      </div>

      <div className="site-footer__bottom">
        <a href="https://allabouthairvietnam.com/">allabouthairvietnam.com</a>
        <span>Chăm sóc tóc từ nền tảng da đầu khỏe mạnh.</span>
      </div>
    </footer>
  );
}
