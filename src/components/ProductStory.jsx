import { Link } from "react-router-dom";
import muikim from "../../ken/muikim.jpg";
import "./ProductStory.css";

export default function ProductStory() {
  return (
    <section className="ps-section" aria-labelledby="ps-title">
      <div className="ps-text">
        <p className="ps-kicker">Câu chuyện sản phẩm</p>
        <h2 id="ps-title">Từng mũi kim, một chiếc Kén</h2>
        <p>
          Mỗi chiếc scrunchie Kén bắt đầu từ bàn may của AAH Scrunchies Studio.
          Lụa và satin được chọn kỹ, cắt tay rồi may từng đường chỉ đều và kín,
          để mặt vải luôn mềm mượt và không gây ma sát lên sợi tóc.
        </p>
        <p>
          Chúng tôi không làm nhanh. Từ đường kim, nhãn mác đến độ phồng của
          từng nếp vải đều được chăm chút, để một chi tiết nhỏ trên mái tóc
          cũng đủ thay đổi thần thái của bạn.
        </p>
        <Link to="/stories" className="btn btn-primary ps-cta">Đọc thêm câu chuyện</Link>
      </div>
      <div className="ps-img">
        <img src={muikim} alt="Cận cảnh mũi kim máy may tại xưởng Kén" loading="lazy" />
      </div>
    </section>
  );
}
