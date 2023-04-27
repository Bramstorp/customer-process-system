import React, { PropsWithChildren } from "react";
import { Navbar } from "./Navbar";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const ConfigLayout = (props: PropsWithChildren) => {
  return (
    <div>
      <h1>dav</h1>
      <div className="container max-w-screen-lg mx-auto px-8">
        {props.children}
      </div>
    </div>
  );
};

export default ConfigLayout;
