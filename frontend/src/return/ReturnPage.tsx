import React, { FunctionComponent } from "react";
import { useRouteError } from "react-router-dom";

export const ReturnPage: FunctionComponent = () => {
  return (
    <div className="pt-4 flex flex-col items-center justify-center">
      <h1 className="text-3xl mt-10 mb-10">
        Indsats ordrenummer og tryk ENTER
      </h1>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Ordrenr
        </label>
        <input
          type="number"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder=""
          required
        />
        <div className="grid grid-cols-4 text-black text-md text-center font-bold leading-6 pt-4 gap-2">
          <div className="bg-slate-100 p-10 rounded">7</div>
          <div className="bg-slate-100 p-10 rounded">8</div>
          <div className="bg-slate-100 p-10 rounded">9</div>
          <div className="bg-slate-100 p-10 rounded">Slet</div>
          <div className="bg-slate-100 p-10 rounded">4</div>
          <div className="bg-slate-100 p-10 rounded">5</div>
          <div className="bg-slate-100 p-10 rounded">6</div>
          <div className="p-4 rounded bg-slate-100 grid place-content-center row-span-3">
            Enter
          </div>
          <div className="bg-slate-100 p-10 rounded">1</div>
          <div className="bg-slate-100 p-10 rounded">2</div>
          <div className="bg-slate-100 p-10 rounded">3</div>
          <div className="bg-slate-100 col-span-3 p-10 rounded">0</div>
        </div>
      </div>
    </div>
  );
};
