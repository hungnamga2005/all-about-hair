import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import ClickSparkEffect from "./components/ClickSparkEffect.jsx";
import HomePage from "./pages/HomePage.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import StoriesPage from "./pages/StoriesPage.jsx";

export default function App() {
  const { pathname } = useLocation();
  const isCustomLanding =
    pathname === "/" ||
    pathname === "/all-about-hair/" ||
    pathname === "/landingpage4";
  const shouldHideFooter =
    pathname === "/" ||
    pathname === "/landingpage" ||
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
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/stories" element={<StoriesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      {!shouldHideFooter && <Footer />}
    </>
  );
}
