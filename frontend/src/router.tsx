import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import { FrontPage } from "./front-page/FrontPage";
import { ClickAndCollectPage } from "./click-and-collect/ClickAndCollectPage";
import { ReturnPage } from "./return/ReturnPage";
import { ConfigurationPage } from "./configuration/ConfigurationPage";
import { ReturnKolli } from "./return/ReturnKolli";
import { ReturnConfirmed } from "./return/ReturnConfirmed";
import { ClickAndCollectConfirmed } from "./click-and-collect/ClickAndCollectConfirmed";
import { RequireToken } from "./auth/Auth";
import LoginPage from "./account/LoginPage";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<FrontPage />} />
      <Route path="/click-and-collect" element={<ClickAndCollectPage />} />
      <Route
        path="/click-and-collect/confirmed"
        element={<ClickAndCollectConfirmed />}
      />
      <Route path="/return" element={<ReturnPage />} />
      <Route path="/return/kolli" element={<ReturnKolli />} />
      <Route path="/return/confirm" element={<ReturnConfirmed />} />
      <Route path="/admin" element={<LoginPage />} />
      <Route
        path="/config"
        element={
          <RequireToken>
            <ConfigurationPage />
          </RequireToken>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
