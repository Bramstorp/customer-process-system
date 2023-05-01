import React, { FunctionComponent, useContext } from "react";
import { useRouteError } from "react-router-dom";
import { CompanyContext } from "../service/company/company.context";

export const Cases: FunctionComponent = () => {
  const { cases } = useContext(CompanyContext);

  console.log(cases);

  return (
    <div className="flex flex-col">
      <h1 className="text-5xl mb-12">Cases</h1>
      <p>Cases</p>
    </div>
  );
};
