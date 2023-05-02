import React, { FunctionComponent } from "react";
import { useRouteError } from "react-router-dom";

export const Configuration: FunctionComponent = () => {
  return (
    <div className="flex flex-col">
      <h1 className="text-5xl mb-12">Dashboard</h1>
      <div className="flex flex-row space-x-4">
        <div className="block w-52 p-6 bg-orange-100 border border-orange-200 rounded-lg shadow ">
          <p className="text-3xl pb-3">30</p>
          <p>Retursager idag.</p>
        </div>
        <div className="block w-52 p-6 bg-lime-100 border border-lime-200 rounded-lg shadow ">
          <p className="text-3xl pb-3">30</p>
          <p>Click and Collect afhentinger idag</p>
        </div>
        <div className="block w-52 p-6 bg-cyan-100 border border-cyan-200 rounded-lg shadow ">
          <p className="text-3xl pb-3">30</p>
          <p>Kunder besøg i alt idag.</p>
        </div>
      </div>
    </div>
  );
};
