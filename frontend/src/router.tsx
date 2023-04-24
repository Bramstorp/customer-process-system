import * as React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { FrontPage } from "./front-page/FrontPage";
import { ErrorPage } from "./shared/ErrorPage";
import { ClickAndCollectPage } from "./click-and-collect/ClickAndCollectPage";
import { ReturnPage } from "./return/ReturnPage";
import { ConfigurationPage } from "./configuration/ConfigurationPage";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<FrontPage />} />
      <Route path="/click-and-collect" element={<ClickAndCollectPage />} />
      <Route path="/return" element={<ReturnPage />} />
      <Route path="/config" element={<ConfigurationPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
