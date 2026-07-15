import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter basename="/COIN-OF-CHRIST-G5-GOLD">
      <App />
    </BrowserRouter>
  </React.StrictMode>
</mui>
