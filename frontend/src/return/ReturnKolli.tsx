import React, { FunctionComponent, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Numpad } from "./Numpad";

export const ReturnKolli: FunctionComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const x = async (kolli: string) => {
    const fetchOrder = await fetch(
      `http://localhost:8000/create-return-case?customerid=${location.state.order.customer.id}&orderid=${location.state.orderid}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          return_date: "2023-04-24T14:26:31.655000",
          kolli_amount: kolli,
        }),
      }
    ).then(async (res) => {
      if (res.status === 404) {
        alert("Ordrenummeret findes ikke");
      } else if (res.status === 401) {
        alert(await res.json());
      } else {
        return await res.json();
      }
    });

    if (fetchOrder) {
      navigate("/return/confirm", { state: fetchOrder });
    }
  };

  return (
    <div className="pt-4 flex flex-col items-center justify-center">
      <h1 className="text-3xl mt-10 mb-10">Vælg kolli antal</h1>
      <Numpad label={"Kolli antal"} func={x} />
    </div>
  );
};
