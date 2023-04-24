import React, { FunctionComponent } from "react";
import { useRouteError } from "react-router-dom";

export const ReturnPage: FunctionComponent = () => {
  return (
    <>
      <h1 className="text-3xl mt-10 mb-10">Indsats ordrenummer og tryk ENTER</h1>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ordrenr</label>
        <input
          type="number"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder=""
          required
        />
        <div className="text-blue-400 pt-4 flex items-center justify-center">
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-slate-100 p-10 rounded">7</div>
            <div className="bg-slate-100 p-10 rounded">8</div>
            <div className="bg-slate-100 p-10 rounded">9</div>
            <div className="bg-slate-100 p-10 rounded">6</div>
            <div className="bg-slate-100 p-10 rounded">5</div>
            <div className="bg-slate-100 p-10 rounded">4</div>
            <div className="bg-slate-100 p-10 rounded">3</div>
            <div className="bg-slate-100 p-10 rounded">2</div>
            <div className="bg-slate-100 p-10 rounded">1</div>
          </div>
        </div>
      </div>
    </>
  );
};
