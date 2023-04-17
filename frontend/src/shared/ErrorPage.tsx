import React, { FunctionComponent } from "react";
import { Link, useRouteError } from "react-router-dom";

export const ErrorPage: FunctionComponent = () => {
  const error = useRouteError();

  return (
    <main className="h-screen w-full flex flex-col justify-center items-center">
      <h1 className="text-9xl font-extrabold tracking-widest">404</h1>

      <button className="mt-5">
        <a className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring">
          <span className="relative block px-8 py-3 border border-current">
            <Link to="/">Go Home</Link>
          </span>
        </a>
      </button>
    </main>
  );
};
