import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import GlobalStyles from "./components/GlobalStyles";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    <GlobalStyles />
  </React.StrictMode>
);
