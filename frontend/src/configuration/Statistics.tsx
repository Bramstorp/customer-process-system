import React, { FunctionComponent } from "react";
import { useRouteError } from "react-router-dom";

export const Statistics: FunctionComponent = () => {
  return (
    <div className="flex flex-col">
      <h1 className="text-5xl mb-12">Dashboard</h1>
      <p>Statistics</p>
    </div>
  );
};