import React, { PropsWithChildren } from "react";
import { useLocation, Navigate } from "react-router-dom";

export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const fetchToken = () => {
  return localStorage.getItem("token");
};

export function RequireToken(props: PropsWithChildren) {
  let auth = fetchToken();
  let location = useLocation();

  if (!auth) {
    return <Navigate to="/admin" state={{ from: location }} />;
  }
  return props.children;
}
