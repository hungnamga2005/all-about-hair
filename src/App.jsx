import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import ClickSparkEffect from "./components/ClickSparkEffect.jsx";
import HomePage from "./pages/HomePage.jsx";
import LandingPage2 from "./pages/LandingPage2.jsx";
import LandingPage4 from "./pages/LandingPage4.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import StoriesPage from "./pages/StoriesPage.jsx";

export default function App() {
  const { pathname } = useLocation();
  const isCustomLanding =
    pathname === "/" ||
    pathname === "/landingpage2" ||
    pathname === "/landingpage3" ||
    pathname === "/landingpage4";
  const shouldHideFooter =
    pathname === "/" ||
    pathname === "/landingpage1" ||
    pathname === "/landingpage2" ||
    pathname === "/landingpage3" ||
    pathname === "/landingpage4";

  return (
    <>
      {!isCustomLanding && <ClickSparkEffect />}
      {!isCustomLanding && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<LandingPage4 />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/landingpage2" element={<LandingPage2 />} />
          <Route path="/landingpage4" element={<LandingPage4 />} />
          <Route path="/stories" element={<StoriesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      {!shouldHideFooter && <Footer />}
    </>
  );
}
