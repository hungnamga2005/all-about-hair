import logo from "../../finallogo.png";
import "./Loader.css";

// Two identical halves so translateX(-50%) loops seamlessly.
const LOGOS = Array.from({ length: 12 });

export default function Loader() {
  return (
    <div className="loader" role="status" aria-label="Loading">
      <div className="loader__track">
        {LOGOS.map((_, i) => (
          <div key={i} className="loader__stamp">
            <img src={logo} alt="" className="loader__logo" />
          </div>
        ))}
      </div>
    </div>
  );
}
