import React, { PropsWithChildren } from "react";
import { Navbar } from "./Navbar";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const CustomLayout = (props: PropsWithChildren) => {
  let navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <div className="container max-w-screen-lg mx-auto px-8">
        {props.children}
      </div>
      {window.history.state && window.history.state.idx > 0 ? (
        <button
          className="bg-red-500 m-5 items-center absolute left-0 bottom-0 flex hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => navigate(-1)}
        >
          <FiArrowLeft />
          Afslut
        </button>
      ) : null}
    </div>
  );
};

export default CustomLayout;
