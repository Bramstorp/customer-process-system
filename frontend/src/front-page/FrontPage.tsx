import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";

export const FrontPage: FunctionComponent = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <h1 className="text-7xl mb-20">SELVBETJENING</h1>
      <div className="flex items-center justify-center">
        <a
          href="#"
          className="bg-gray-300 hover:bg-sky-700 text-white font-bold rounded-lg border shadow-lg m-2 p-10"
        >
          <Link to="return">Retur vare</Link>
        </a>
        <a
          href="#"
          className="bg-gray-300 hover:bg-sky-700 text-white font-bold rounded-lg border shadow-lg m-2 p-10"
        >
          <Link to="click-and-collect">Click and Collect</Link>
        </a>
      </div>
    </div>
  );
};
