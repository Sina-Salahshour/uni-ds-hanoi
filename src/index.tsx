import React from "react";
import ReactDOM from "react-dom/client";

import HomeScreen from "./containers/screens/home";

import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <HomeScreen></HomeScreen>
  </React.StrictMode>
);
