import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router } from "react-router-dom";

import App from "./App.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <ScrollToTop />
      <App />
    </Router>
  </React.StrictMode>
);
