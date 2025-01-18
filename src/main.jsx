import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./Styles/index.css";
import ThemedApp from "./ThemedApp.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <ThemedApp />
  </StrictMode>
);
