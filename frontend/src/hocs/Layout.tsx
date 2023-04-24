import React, { PropsWithChildren } from "react";
import { Navbar } from "../shared/Navbar";

const CustomLayout = (props: PropsWithChildren) => (
  <div>
    <Navbar />
    <div className="container max-w-screen-lg mx-auto px-8">
      {props.children}
    </div>
  </div>
);

export default CustomLayout;
