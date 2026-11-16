import { Search, CircleUserRound } from "lucide-react";

const navigation = [
  { label: "Sản Phẩm", href: "/home#products" },
  { label: "Combo Toàn Diện", href: "/home#combo" },
  { label: "Scalp Center", href: "/home#scalp-center", highlighted: true },
  { label: "Chuyện Tóc", href: "/stories" },
];

export default function Header() {
  return (
    <header>
      <a className="logo" href="/" aria-label="All About Hair - Trang chủ">
        ALL ABOUT HAIR
      </a>
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
      <div className="header-icons" aria-label="Tài khoản và giỏ hàng">
        <a className="header-cart-link" href="#">
          Tìm kiếm
        </a>
        <a className="header-cart-link" href="#">
          Tài khoản
        </a>
        <a className="header-cart-link" href="#">
          Giỏ hàng
        </a>
      </div>
    </header>
  );
}
