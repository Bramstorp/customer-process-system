import React, { FunctionComponent } from "react";
import { useRouteError } from "react-router-dom";

export const ReturnPage: FunctionComponent = () => {
  return (
    <>
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
        <div className="grid grid-cols-4 gap-4 text-center pt-5">
          <div className="p-4 rounded-lg shadow-lg bg-fuchsia-500">9</div>
          <div className="p-4 rounded-lg shadow-lg bg-fuchsia-500">8</div>
          <div className="p-4 rounded-lg shadow-lg bg-fuchsia-500">7</div>
          <div className="p-4 rounded-lg shadow-lg bg-fuchsia-500">Slet</div>
          <div className="p-4 rounded-lg shadow-lg bg-fuchsia-500">6</div>
          <div className="p-4 rounded-lg shadow-lg bg-fuchsia-500">5</div>
          <div className="p-4 rounded-lg shadow-lg bg-fuchsia-500">4</div>
          <div className="row-span-3 pt-4 rounded-lg bg-fuchsia-500">ENTER</div>
          <div className="p-4 rounded-lg shadow-lg bg-fuchsia-500">3</div>
          <div className="p-4 rounded-lg shadow-lg bg-fuchsia-500">2</div>
          <div className="p-4 rounded-lg shadow-lg bg-fuchsia-500">1</div>
          <div className="col-span-3 pt-4 rounded-lg bg-fuchsia-500">0</div>
        </div>
      </div>
    </>
  );
};
