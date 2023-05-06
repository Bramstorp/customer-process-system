import React, { PropsWithChildren } from "react";
import { useLocation, Navigate } from "react-router-dom";

export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

export const fetchToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }

  const decodedJwt = parseJwt(token);
  if (decodedJwt.exp * 1000 < Date.now()) {
    localStorage.removeItem("token");
    return null;
  }

  return token;
};

export function RequireToken(props: PropsWithChildren) {
  let auth = fetchToken();
  let location = useLocation();

  if (!auth) {
    return <Navigate to="/admin" state={{ from: location }} />;
  }
  return props.children;
}
