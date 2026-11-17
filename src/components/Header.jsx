import finalLogo from "../../assets/finallogo.png";
import { useState } from "react";
import { useCart } from "./CartDrawer.jsx";
import LoginModal from "./LoginModal.jsx";

const navigation = [
  { label: "Sản Phẩm", href: "/home#products" },
  { label: "Combo Toàn Diện", href: "/home#combo" },
  { label: "Scalp Center", href: "/home#scalp-center", highlighted: true },
  { label: "Chuyện Tóc", href: "/stories" },
];

export default function Header() {
  const { count, openCart } = useCart();
  const [loginOpen, setLoginOpen] = useState(false);
  return (
    <header>
      <nav aria-label="Điều hướng chính">
        <ul>
          {navigation.map(({ label, href, highlighted }) => (
            <li key={label}>
              <a className={highlighted ? "highlight-link" : undefined} href={href}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <a className="logo" href="/" aria-label="All About Hair - Trang chủ">
        <img src={finalLogo} alt="All About Hair" className="logo-img" />
      </a>
      <div className="header-icons" aria-label="Tài khoản và giỏ hàng">
        <a className="header-cart-link" href="#">
          Tìm kiếm
        </a>
        <a
          className="header-cart-link"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setLoginOpen(true);
          }}
        >
          Tài khoản
        </a>
        <a
          className="header-cart-link"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            openCart();
          }}
        >
          Giỏ hàng{count > 0 && ` (${count})`}
        </a>
      </div>
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </header>
  );
}
