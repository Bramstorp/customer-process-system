import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { FiPackage, FiShoppingCart } from "react-icons/fi";

export const FrontPage: FunctionComponent = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-4xl mt-10 mb-10">Vælg ønsket funktion</h1>
      <div className="flex items-center justify-center space-x-4">
        <Link to="return" className="bg-gray-500 hover:bg-sky-700 rounded-lg border shadow block w-52 p-10 text-center">
          <p className="text-white font-bold">Retur vare</p>
          <FiPackage className="m-auto mt-2 text-white w-10 h-10" />
        </Link>
        <Link
          to="click-and-collect"
          className="bg-gray-500 hover:bg-sky-700 rounded-lg border shadow block w-52 p-10 text-center"
        >
          <p className="text-white font-bold">Click and Collect</p>
          <FiShoppingCart className="m-auto mt-2 text-white w-10 h-10" />
        </Link>
      </div>
    </div>
  );
};
