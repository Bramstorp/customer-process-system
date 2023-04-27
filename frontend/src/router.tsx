import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import { FrontPage } from "./front-page/FrontPage";
import { ClickAndCollect } from "./click-and-collect/ClickAndCollect";
import { ReturnPage } from "./return/Return";
import { Configuration } from "./configuration/Configuration";
import { ReturnKolli } from "./return/ReturnKolli";
import { ReturnConfirmed } from "./return/ReturnConfirmed";
import { ClickAndCollectConfirmed } from "./click-and-collect/ClickAndCollectConfirmed";
import { RequireToken } from "./auth/Auth";
import { Login } from "./account/Login";
import ConfigLayout from "./hocs/ConfigLayout";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<FrontPage />} />
      <Route path="/click-and-collect" element={<ClickAndCollect />} />
      <Route
        path="/click-and-collect/confirmed"
        element={<ClickAndCollectConfirmed />}
      />
      <Route path="/return" element={<ReturnPage />} />
      <Route path="/return/kolli" element={<ReturnKolli />} />
      <Route path="/return/confirm" element={<ReturnConfirmed />} />
      <Route path="/admin" element={<Login />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

const configroutes = () => {
  return (
    <Routes>
      <Route
        path="/config"
        element={
          <RequireToken>
            <Configuration />
          </RequireToken>
        }
      />
    </Routes>
  );
};
