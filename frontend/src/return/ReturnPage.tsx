import React, { FunctionComponent, useState } from "react";

const btnLayout = [
  ["7", "8", "9", "SLET"],
  ["4", "5", "6", "ENTER"],
  ["1", "2", "3"],
  ["0"],
];

export const ReturnPage: FunctionComponent = () => {
  let [ordernr, setOrdernr] = useState({
    sign: "",
    num: "",
    res: "",
  });

  const numClick = (e: any) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setOrdernr({
      ...ordernr,
      num: ordernr.num + value,
    });
  };

  const enter = () => {
    console.log("enter");
  };

  const removeLast = () => {
    setOrdernr({
      ...ordernr,
      num: ordernr.num.slice(0, -1),
    });
  };

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
          placeholder="ordrenr"
          value={ordernr.num}
          required
        />
        <div className="grid grid-cols-4 text-black text-md text-center font-bold leading-6 pt-4 gap-2">
          {btnLayout.flat().map((btn, i) => {
            return (
              <button
                className={`bg-slate-100 hover:bg-slate-200 p-10 rounded grid place-content-center ${
                  btn === "0"
                    ? "col-span-3"
                    : btn === "ENTER"
                    ? "row-span-3"
                    : ""
                }`}
                key={i}
                onClick={
                  btn === "SLET"
                    ? removeLast
                    : btn === "ENTER"
                    ? enter
                    : numClick
                }
              >
                {btn}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
