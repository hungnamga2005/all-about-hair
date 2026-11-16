import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { loadStarShape } from "@tsparticles/shape-star";
import App from "./App.jsx";
import "../style.css";

const initializeParticles = async (engine) => {
  await loadSlim(engine);
  await loadStarShape(engine);
};

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ParticlesProvider init={initializeParticles}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ParticlesProvider>
  </React.StrictMode>,
);
