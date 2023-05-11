import React, { FunctionComponent } from "react";

interface CasesByHour {
  hour: number;
  count: number;
}

interface IProps {
  data: CasesByHour[];
}

export const Graph: FunctionComponent<IProps> = ({ data }) => {
  const maxCount = Math.max(...data.map((item) => item.count));
  const minCount = Math.min(...data.map((item) => item.count));

  const yTicks = [maxCount, Math.round((maxCount + minCount) / 2), minCount];

  return (
    <div className="rounded-lg border border-gray-200 p-8">
      <h4 className="mb-4">Graph customers visit by hour</h4>
      <div className="flex items-end h-60">
        <div className="flex flex-col h-full w-1 justify-between">
          {yTicks.map((tick) => (
            <span key={tick} className="text-xs">
              {tick}
            </span>
          ))}
        </div>
        <div className="flex items-end h-full w-5/6">
          {data.map((item) => (
            <div key={item.hour} className="relative flex flex-col justify-end items-center h-full w-1/5">
              <div
                className={`w-8 ${maxCount == item.count ? "bg-blue-500" : "bg-blue-400"}`}
                style={{ height: `${(item.count / maxCount) * 100}%` }}
              ></div>
              <span className="text-xs">{item.hour}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
