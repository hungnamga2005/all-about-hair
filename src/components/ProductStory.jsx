import { Carousel } from "antd";
import { Link } from "react-router-dom";
import muikim from "../../ken/muikim.jpg";
import str1 from "../../ken/str1.jpg";
import str2 from "../../ken/str2.jpg";
import "./ProductStory.css";

const slides = [
  {
    kicker: "Câu chuyện sản phẩm",
    title: "Từng mũi kim, một chiếc Kén",
    paragraphs: [
      "Mỗi chiếc scrunchie Kén bắt đầu từ bàn may của AAH Scrunchies Studio. Lụa và satin được chọn kỹ, cắt tay rồi may từng đường chỉ đều và kín, để mặt vải luôn mềm mượt và không gây ma sát lên sợi tóc.",
      "Chúng tôi không làm nhanh. Từ đường kim, nhãn mác đến độ phồng của từng nếp vải đều được chăm chút, để một chi tiết nhỏ trên mái tóc cũng đủ thay đổi thần thái của bạn.",
    ],
    image: muikim,
    alt: "Cận cảnh mũi kim máy may tại xưởng Kén",
  },
  {
    kicker: "Câu chuyện Ceramide",
    title: "Chìa khoá cho một mái tóc khoẻ mạnh",
    paragraphs: [
      "Lớp biểu bì tóc là lớp bên ngoài, được tạo thành từ các tế bào chồng lên nhau, sự vắng mặt của Ceramide gây nên tình trạng tóc khô ráp, dễ bị các rối loạn về da đầu. Các tác nhân từ ô nhiễm môi trường lại phân hủy Ceramide, gây ảnh hưởng nghiêm trọng đến sự trơn phẳng và toàn vẹn của sợi tóc.",
      "Nhận biết được tầm quan trọng của Ceramide, tháng 4/2023 All About Hair Việt Nam đã có cột mốc đáng tự hào khi bắt tay với một nhà máy quốc tế để cùng nghiên cứu sản phẩm Dầu xả Serum mang hoạt chất Ceramide làm cốt lõi, xuất xứ tại Thái Lan, cũng là lần đầu tiên All About Hair Việt Nam nhập khẩu chính ngạch sản phẩm nước ngoài mang thương hiệu của mình.",
    ],
    image: str1,
    alt: "Đội ngũ All About Hair làm việc cùng nhà máy tại Thái Lan",
  },
  {
    kicker: "Câu chuyện Scentlabo",
    title: "Ngôn ngữ của sự hiện diện",
    paragraphs: [
      "Mỗi mùi hương là một cách hiện diện, là cách tâm hồn chọn nói lên điều nó cảm nhận: có mùi hương như lời thì thầm dịu dàng, có mùi lại như ánh nhìn sâu thẳm khó nắm bắt.",
      "Với Scentlabo, hương thơm không chỉ là sự kết hợp của nguyên liệu. Đó là ngôn ngữ của cảm xúc, được viết nên bằng trực giác và ký ức, bằng những tầng hương chuyển mình qua thời gian từ cái chạm đầu tiên đến dư vị sau cùng.",
    ],
    image: str2,
    alt: "Scentlabo — The language of Presence",
  },
];

export default function ProductStory() {
  return (
    <section className="ps-wrap" aria-label="Câu chuyện sản phẩm">
      <Carousel arrows autoplay autoplaySpeed={6000} dotPosition="bottom">
        {slides.map((slide) => (
          <div key={slide.title}>
            <div className="ps-section">
              <div className="ps-text">
                <p className="ps-kicker">{slide.kicker}</p>
                <h2>{slide.title}</h2>
                {slide.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                <Link to="/stories" className="btn btn-primary ps-cta">Đọc thêm câu chuyện</Link>
              </div>
              <div className="ps-img">
                <img src={slide.image} alt={slide.alt} loading="lazy" />
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </section>
  );
}
