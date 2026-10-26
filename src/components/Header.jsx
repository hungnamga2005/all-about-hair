import { Search, CircleUserRound, ShoppingBag } from "lucide-react";

const navigation = [
  { label: "Sản Phẩm", href: "/#products" },
  { label: "Combo Toàn Diện", href: "/#combo" },
  { label: "Scalp Center", href: "/#scalp-center", highlighted: true },
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
        <button type="button" aria-label="Tìm kiếm">
          <Search aria-hidden="true" />
        </button>
        <button type="button" aria-label="Tài khoản">
          <CircleUserRound aria-hidden="true" />
        </button>
        <button type="button" aria-label="Giỏ hàng">
          <ShoppingBag aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
