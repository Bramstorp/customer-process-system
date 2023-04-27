import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import { FrontPage } from "./front-page/FrontPage";

import { Return } from "./return/Return";
import { Kolli } from "./return/Kolli";
import { ReturnConfirmed } from "./return/Confirmed";

import { ClickAndCollectConfirmed } from "./click-and-collect/Confirmed";
import { ClickAndCollect } from "./click-and-collect/ClickAndCollect";

import { Configuration } from "./configuration/Configuration";
import { Endpoints } from "./configuration/Endpoints";
import { Locations } from "./configuration/Locations";
import { Statistics } from "./configuration/Statistics";
import { Settings } from "./configuration/Settings";

import { RequireToken } from "./auth/Auth";
import { Login } from "./account/Login";
import ConfigLayout from "./hocs/ConfigLayout";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<FrontPage />} />
      <Route path="click-and-collect" element={<ClickAndCollect />} />
      <Route
        path="click-and-collect/confirmed"
        element={<ClickAndCollectConfirmed />}
      />
      <Route path="return" element={<Return />}></Route>
      <Route path="return/kolli" element={<Kolli />} />
      <Route path="return/confirm" element={<ReturnConfirmed />} />
      <Route path="admin" element={<Login />} />
      <Route path="/config/*" element={<ConfigRoutes />} />
      <Route path="" element={<Navigate to="/" />} />
    </Routes>
  );
}

const ConfigRoutes = () => {
  return (
    <ConfigLayout>
      <Routes>
        <Route
          path="/"
          element={
            <RequireToken>
              <Configuration />
            </RequireToken>
          }
        />
        <Route path="endpoints" element={<Endpoints />} />
        <Route path="locations" element={<Locations />} />
        <Route path="statistics" element={<Statistics />} />
        <Route path="settings" element={<Settings />} />
      </Routes>
    </ConfigLayout>
  );
};
