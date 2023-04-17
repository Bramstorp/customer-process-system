import React, { FunctionComponent } from "react";
import { useRouteError } from "react-router-dom";

export const ReturnPage: FunctionComponent = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <h1 className="text-7xl  ">SELVBETJENING</h1>
      <div className="flex items-center justify-center">
        <p>test</p>
      </div>
    </div>
  );
};
