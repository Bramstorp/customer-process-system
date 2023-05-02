import React, { FunctionComponent, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Numpad } from "../shared/Numpad";
import axios from "axios";

export const Kolli: FunctionComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location.state);

  const createReturnCase = (kolli: string) => {
    axios
      .post(`http://localhost:8000/create-return-case`, {
        retrurn: { kolli_amount: kolli },
        order: {
          id: location.state.id,
          orderdata: location.state.orderdata,
          orderstatus: location.state.orderstatus,
          ordertype: location.state.ordertype,
          customer_id: location.state.customer.id,
        },
        customer: location.state.customer,
      })
      .then((res) => {
        console.log(res.data);
        console.log(res);
        if (res.data) {
          navigate("/return/confirm", {
            state: { orderid: location.state.orderid },
          });
        }
      })
      .catch(function (error) {
        alert("Der skete en fejl, prøv igen");
        console.log(error, "error");
      });
  };

  return (
    <div className="pt-4 flex flex-col items-center justify-center">
      <h1 className="text-3xl mt-10 mb-10">Vælg kolli antal</h1>
      <p className="text-2xl">Ordrenummer: {location.state.id}</p>
      <p className="text-2xl">Navn: {location.state.customer.name}</p>
      <Numpad label={"Kolli antal"} placeholder={"indsæt kolliantal"} onClick={createReturnCase} />
    </div>
  );
};
