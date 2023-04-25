import React, { FunctionComponent, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Numpad } from "../shared/Numpad";

export const ReturnKolli: FunctionComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const x = async (kolli: string) => {
    await fetch(`http://localhost:8000/create-return-case`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        return_date: "2023-04-24T14:26:31.655000",
        kolli_amount: kolli,
        order_id: location.state.orderid,
        customer_id: location.state.order.customer.id,
      }),
    }).then(async (res) => {
      if (res.status === 404 || res.status === 401) {
        alert(await res.json());
      } else {
        navigate("/return/confirm", {
          state: { orderid: location.state.orderid },
        });
      }
    });
  };

  return (
    <div className="pt-4 flex flex-col items-center justify-center">
      <h1 className="text-3xl mt-10 mb-10">Vælg kolli antal</h1>
      <p className="text-2xl">Ordrenummer: {location.state.orderid}</p>
      <p className="text-2xl">Navn: {location.state.order.customer.name}</p>
      <Numpad
        label={"Kolli antal"}
        placeholder={"indsæt kolliantal"}
        func={x}
      />
    </div>
  );
};
