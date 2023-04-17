import * as React from "react";
import { Routes, Route } from "react-router-dom";

import { FrontPage } from "./frontpage/FrontPage";
import { ErrorPage } from "./shared/ErrorPage";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<FrontPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
