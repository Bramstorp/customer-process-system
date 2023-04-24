import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./router.js";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import CustomLayout from "./hocs/Layout.js";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <CustomLayout>
        <Router />
      </CustomLayout>
    </BrowserRouter>
  </React.StrictMode>
);
