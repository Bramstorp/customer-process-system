import React, { FunctionComponent, useContext } from "react";
import { CompanyContext } from "../service/company/company.context";

export const CustomerCases: FunctionComponent = () => {
  const { cases } = useContext(CompanyContext);

  function formatDate(dateString: Date) {
    const date = new Date(dateString);
    return date.toLocaleDateString("da-DK", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
  }

  const TYPE_MAP = {
    cnc: "Click and Collect",
    returns: "Return",
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-5xl mb-10">Customer</h1>
    </div>
  );
};
