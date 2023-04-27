import React, { FunctionComponent, PropsWithChildren } from "react";
import { useRouteError } from "react-router-dom";
import GoogleMapReact from "google-map-react";

const GoogleMap: FunctionComponent<PropsWithChildren> = ({
  children,
  ...props
}) => {
  return <GoogleMapReact {...props}>{children}</GoogleMapReact>;
};

export default GoogleMap;
