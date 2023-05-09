import React, { useEffect, useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import axios from "axios";

interface RequireTokenProps {
  children: React.ReactNode;
}

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

const validateToken = (token: string) => {
  return axios
    .get("http://localhost:8000/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      if (res.data == "ok") {
        return true;
      }
    })
    .catch((error) => {
      return false;
    });
};

const isValidToken = (token: string) => {
  const decodedJwt = parseJwt(token);
  if (!decodedJwt) {
    console.log("invalid decode token");
    return false;
  }
  const isValid = decodedJwt.exp * 1000 > Date.now();
  if (!isValid) {
    console.log("invalid token");
    return false;
  }
  const isTokenValidOnBackend = validateToken(token);
  if (!isTokenValidOnBackend) {
    console.log("invalid token on backend");
    return false;
  }
  return true;
};

export const fetchToken = () => {
  const token = localStorage.getItem("token");
  if (!token || !isValidToken(token)) {
    localStorage.removeItem("token");
    return null;
  }
  return token;
};

export const RequireToken = ({ children }: RequireTokenProps) => {
  let auth = fetchToken();
  const location = useLocation();

  if (!auth) {
    return <Navigate to="/admin" state={{ from: location }} />;
  }

  return auth !== null ? <div>{children}</div> : null;
};
