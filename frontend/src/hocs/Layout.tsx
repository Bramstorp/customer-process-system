import React, { PropsWithChildren } from "react";
import { Navbar } from "../shared/Navbar";

const CustomLayout = (props: PropsWithChildren) => (
  <div>
    <Navbar />
    {props.children}
  </div>
);

export default CustomLayout;
