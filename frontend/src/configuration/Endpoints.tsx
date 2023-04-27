import React, { FunctionComponent } from "react";
import { useRouteError } from "react-router-dom";

export const Endpoints: FunctionComponent = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-3xl mt-10 mb-10">Config</h1>
      <p>Endpoints</p>
    </div>
  );
};
