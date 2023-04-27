import React, { FunctionComponent, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Numpad } from "../shared/Numpad";
import axios from "axios";

export const ReturnKolli: FunctionComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const x = (kolli: string) => {
    axios
      .post(`http://localhost:8000/create-return-case`, {
        return_date: "2023-04-24T14:26:31.655000",
        kolli_amount: kolli,
        order_id: location.state.id,
        customer_id: location.state.customer.id,
      })
      .then((res) => {
        if (res.data) {
          navigate("/return/confirm", {
            state: { orderid: location.state.orderid },
          });
        }
      })
      .catch(function (error) {
        alert(error.response.data);
        console.log(error, "error");
      });
  };

  return (
    <div className="pt-4 flex flex-col items-center justify-center">
      <h1 className="text-3xl mt-10 mb-10">Vælg kolli antal</h1>
      <p className="text-2xl">Ordrenummer: {location.state.id}</p>
      <p className="text-2xl">Navn: {location.state.customer.name}</p>
      <Numpad
        label={"Kolli antal"}
        placeholder={"indsæt kolliantal"}
        onClick={x}
      />
    </div>
  );
};
