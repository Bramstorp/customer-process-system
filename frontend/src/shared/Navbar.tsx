import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";

export const Navbar: FunctionComponent = () => {
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="flex flex-wrap items-center justify-between p-4">
        <span>
          <img
            src="https://www.anmeld-haandvaerker.dk/sites/default/files/styles/sponsor_logo_large/public/sponsor_partner_logo/ao-logo-png_0.png?itok=GCxIO0SO"
            className="h-8 mr-3"
            alt="Flowbite Logo"
          />
        </span>
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
          SELVBETJENING
        </span>
        <div className="hidden w-full md:block md:w-auto">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                to="/config"
                className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
              >
                Config
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
