import React, { FunctionComponent } from "react";

export const FrontPage: FunctionComponent = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <h1 className="text-7xl mb-20">SELVBETJENING</h1>
      <div className="flex items-center justify-center">
        <a
          href="#"
          className="bg-gray-300 hover:bg-sky-700 text-white font-bold rounded-lg border shadow-lg m-2 p-10"
        >
          <p>Retur vare</p>
        </a>
        <a
          href="#"
          className="bg-gray-300 hover:bg-sky-700 text-white font-bold rounded-lg border shadow-lg m-2 p-10"
        >
          <p>Click and Collect</p>
        </a>
      </div>
    </div>
  );
};
