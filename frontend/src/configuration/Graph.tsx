import React, { FunctionComponent, useContext, useState } from "react";
import { CompanyContext } from "../service/company/company.context";
import { ICase } from "../types/cases.type";

interface CasesByHour {
  hour: number;
  count: number;
}

interface IProps {
  data: CasesByHour[];
}

export const Graph: FunctionComponent<IProps> = ({ data }) => {
  const maxCount = Math.max(...data.map((item) => item.count));

  return (
    <div className="rounded-lg border border-gray-200 p-8">
      <h4>Graph customers visit by hour</h4>
      <div className="flex items-end h-60">
        {data.map((item) => (
          <div key={item.hour} className="flex flex-col justify-end items-center h-full w-1/5">
            <div className="w-8 bg-blue-400" style={{ height: `${(item.count / maxCount) * 100}%` }}></div>
            <span className="text-xs">{item.hour}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
