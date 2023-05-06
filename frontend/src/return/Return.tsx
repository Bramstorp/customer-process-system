import React, { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Numpad } from "../shared/Numpad";
import axios from "axios";

import { IOrder } from "../types/order.type";

export const Return: FunctionComponent = () => {
  const navigate = useNavigate();

  const getOrder = (id: string) => {
    axios
      .get<IOrder>(`${axios.defaults.baseURL}/order/${id}`)
      .then((res) => {
        const { customer, ...order } = res.data;
        navigate("/return/kolli", { state: { order, customer } });
      })

      .catch((error) => {
        alert("Ordrenummeret findes ikke");
        console.log(error, "error");
      });
  };

  return (
    <div className="pt-4 flex flex-col items-center justify-center">
      <h1 className="text-3xl mt-10">Retur</h1>
      <h1 className="text-2xl mt-10 mb-10">Indsats order-nummer og tryk ENTER</h1>
      <Numpad placeholder={"Indsæt ordrenummer"} label={"Order-nummer"} onClick={(id) => getOrder(id)} />
    </div>
  );
};
