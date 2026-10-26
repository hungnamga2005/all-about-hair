import { Link } from "react-router-dom";
import AnimatedText from "../components/AnimatedText.jsx";

export default function NotFoundPage() {
  return (
    <section className="not-found">
      <h1>Không tìm thấy trang</h1>
      <AnimatedText>Trang bạn đang tìm kiếm không tồn tại.</AnimatedText>
      <Link className="btn btn-primary" to="/">Về trang chủ</Link>
    </section>
  );
}
