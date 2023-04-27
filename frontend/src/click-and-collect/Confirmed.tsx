import React, { FunctionComponent } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const ClickAndCollectConfirmed: FunctionComponent = () => {
  const location = useLocation();

  const state = location.state;

  return (
    <div className="pt-4 flex flex-col items-center justify-center">
      <h1 className="text-5xl mt-10 mb-10">Click And Collect</h1>
      <p className="text-2xl">Ordrenummer: {state.order.id}</p>
      <p className="text-2xl">Navn: {state.customer.name}</p>
      <p className="text-2xl mt-8">
        Vi har nu registret din ordre og en medarbejder vil inden for kort tid
        komme ud med den til dig.
      </p>
    </div>
  );
};
