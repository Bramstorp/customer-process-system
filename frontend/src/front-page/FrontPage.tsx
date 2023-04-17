import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { FiPackage } from "react-icons/fi";
import { FiShoppingCart } from "react-icons/fi";

export const FrontPage: FunctionComponent = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <h1 className="text-7xl mb-20">SELVBETJENING</h1>
      <div className="flex items-center justify-center">
        <Link
          to="return"
          className="bg-gray-500 hover:bg-sky-700 rounded-lg border shadow-lg m-2 p-10"
        >
          <p className="text-white font-bold">Retur vare</p>
          <FiPackage className="m-auto mt-2 text-white w-10 h-10" />
        </Link>
        <Link
          to="click-and-collect"
          className="bg-gray-500 hover:bg-sky-700 rounded-lg border shadow-lg m-2 p-10"
        >
          <p className="text-white font-bold">Click and Collect</p>
          <FiShoppingCart className="m-auto mt-2 text-white w-10 h-10" />
        </Link>
      </div>
    </div>
  );
};
