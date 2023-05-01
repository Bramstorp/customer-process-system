import React, { PropsWithChildren } from "react";
import { Navbar } from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import { FiMap, FiSkipBack, FiCodepen, FiHome, FiList } from "react-icons/fi";

const ConfigLayout = (props: PropsWithChildren) => {
  const navigate = useNavigate();

  const signout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to="/config"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FiHome />
                <span className="ml-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/config/statistics"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FiList />
                <span className="ml-3">Statistics</span>
              </Link>
            </li>
            <li>
              <Link
                to="/config/locations"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FiMap />
                <span className="ml-3">Locations</span>
              </Link>
            </li>
            <li>
              <Link
                to="/config/integration"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FiCodepen />
                <span className="ml-3">Integration</span>
              </Link>
            </li>
            <li>
              <Link
                to="/config/cases"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FiCodepen />
                <span className="ml-3">Case overview</span>
              </Link>
            </li>
            <li>
              <button
                onClick={() => signout()}
                className="flex items-center absolute bottom-0 p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FiSkipBack />
                <span className="ml-3">Sign out</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
      <div className="p-4 sm:ml-64">{props.children}</div>
    </>
  );
};

export default ConfigLayout;
