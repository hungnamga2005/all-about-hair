import { ShoppingBag } from "lucide-react";
import moonstone from "../../list/moonstone.jpg";
import burgundy from "../../list/burgundy.jpg";
import obsidianSheen from "../../list/obsidian sheen.jpg";
import scent1 from "../../ken/p-scent1.jpg";
import scent2 from "../../ken/p-scent2.jpg";
import scent3 from "../../ken/p-scent3.jpg";
import { useCart } from "./CartDrawer.jsx";
import "./ProductCategories.css";

// shortcut: prices marked "Đang cập nhật" are placeholders, replace with real prices.
const categories = [
  {
    id: "products",
    path: "Sản phẩm / Chăm sóc tóc",
    title: "Chăm sóc tóc",
    products: [
      { name: "Dầu gội Scalp Care", tagline: "Làm sạch dịu nhẹ cho da đầu", price: "299.000 đ", image: "./assets/dg.png" },
      { name: "Tẩy tế bào chết da đầu Scalp Scrub", tagline: "Làm sạch sâu, thông thoáng da đầu", price: "379.000 đ", image: "./assets/ttbc.png" },
      { name: "Xịt dưỡng tóc Biotin Thuần chay", tagline: "Nuôi dưỡng tóc mỗi ngày", price: "299.000 đ", image: "./assets/xbotic.png" },
    ],
  },
  {
    id: "ken",
    path: "Phụ kiện / Kén",
    title: "Kén",
    products: [
      { name: "Kén Scrunchie Moonstone", tagline: "Lụa satin, không gãy tóc", price: "Đang cập nhật", image: moonstone },
      { name: "Kén Scrunchie Burgundy", tagline: "Lụa satin, không gãy tóc", price: "Đang cập nhật", image: burgundy },
      { name: "Kén Scrunchie Obsidian Sheen", tagline: "Lụa satin, không gãy tóc", price: "Đang cập nhật", image: obsidianSheen },
    ],
  },
  {
    id: "scentlabo",
    path: "Hương thơm / Scentlabo",
    title: "Scentlabo",
    products: [
      { name: "Scentlabo Body Mist Shu 100ml", tagline: "Light in motion", price: "Đang cập nhật", image: scent1 },
      { name: "Scentlabo Body Mist 100ml", tagline: "Hương thơm lưu luyến", price: "Đang cập nhật", image: scent2 },
      { name: "Scentlabo Body Mist 100ml", tagline: "Hương thơm lưu luyến", price: "Đang cập nhật", image: scent3 },
    ],
  },
];

export default function ProductCategories() {
  const { add } = useCart();
  return categories.map((category) => (
    <section className="pc-section" id={category.id} key={category.id}>
      <p className="pc-path">{category.path}</p>
      <div className="pc-body">
        <h2 className="pc-title">{category.title}</h2>
        <div className="pc-grid">
          {category.products.map((product, index) => (
            <article className="pc-card" key={index}>
              <div className="pc-img">
                <img src={product.image} alt={product.name} loading="lazy" />
              </div>
              <div className="pc-info">
                <div>
                  <h3>{product.name}</h3>
                  <p className="pc-tagline">{product.tagline}</p>
                  <p className="pc-price">{product.price}</p>
                </div>
                <button className="pc-cart" type="button" onClick={() => add(product)} aria-label={`Thêm ${product.name} vào giỏ`}>
                  <ShoppingBag aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  ));
}
