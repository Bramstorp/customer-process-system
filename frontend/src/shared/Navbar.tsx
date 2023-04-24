import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";

export const Navbar: FunctionComponent = () => {
  return (
    <nav className="border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="flex flex-wrap items-center justify-start p-4">
        <img
          src="https://www.anmeld-haandvaerker.dk/sites/default/files/styles/sponsor_logo_large/public/sponsor_partner_logo/ao-logo-png_0.png?itok=GCxIO0SO"
          className="h-8 mr-3"
          alt="Flowbite Logo"
        />
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
          SELVBETJENING
        </span>
      </div>
    </nav>
  );
};
