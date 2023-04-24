import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import { FrontPage } from "./front-page/FrontPage";
import { ClickAndCollectPage } from "./click-and-collect/ClickAndCollectPage";
import { ReturnPage } from "./return/ReturnPage";
import { ConfigurationPage } from "./configuration/ConfigurationPage";
import { ReturnKolli } from "./return/ReturnKolli";
import { ReturnConfirmed } from "./return/ReturnConfirmed";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<FrontPage />} />
      <Route path="/click-and-collect" element={<ClickAndCollectPage />} />
      <Route path="/return" element={<ReturnPage />} />
      <Route path="/return/kolli" element={<ReturnKolli />} />
      <Route path="/return/confirm" element={<ReturnConfirmed />} />
      <Route path="/config" element={<ConfigurationPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
