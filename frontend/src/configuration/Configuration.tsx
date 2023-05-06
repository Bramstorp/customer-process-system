import React, { FunctionComponent, useContext } from "react";
import { CompanyContext } from "../service/company/company.context";

import { ICase } from "../types/cases.type";

export const Configuration: FunctionComponent = () => {
  const { cases } = useContext(CompanyContext);

  const today = new Date().toISOString().slice(0, 10);

  const todaysReturns = cases?.filter(
    (item: ICase) => item.type === "returns" && item.date_of_action.slice(0, 10) === today
  ).length;
  const todaysCnc = cases?.filter(
    (item: ICase) => item.type === "cnc" && item.date_of_action.slice(0, 10) === today
  ).length;

  return (
    <div className="flex flex-col">
      <h1 className="text-5xl mb-12">Dashboard</h1>
      <div className="flex flex-row space-x-4">
        <div className="block w-52 p-6 bg-orange-100 border border-orange-200 rounded-lg shadow ">
          <p className="text-3xl pb-3">{todaysReturns}</p>
          <p>Retursager idag.</p>
        </div>
        <div className="block w-52 p-6 bg-lime-100 border border-lime-200 rounded-lg shadow ">
          <p className="text-3xl pb-3">{todaysCnc}</p>
          <p>Click and Collect afhentinger idag</p>
        </div>
        <div className="block w-52 p-6 bg-cyan-100 border border-cyan-200 rounded-lg shadow ">
          <p className="text-3xl pb-3">{todaysCnc + todaysReturns}</p>
          <p>Total sager i alt idag.</p>
        </div>
      </div>
    </div>
  );
};
