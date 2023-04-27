import React, { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Numpad } from "../shared/Numpad";

export const ReturnPage: FunctionComponent = () => {
  const navigate = useNavigate();

  const x = (id: string) => {
    const fetchOrder = fetch(`http://localhost:8000/order/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).then(async (res) => {
      if (res.status === 404) {
        alert(await res.json());
      } else {
        return await res.json();
      }
    });

    if (fetchOrder) {
      navigate("/return/kolli", { state: { order: fetchOrder, orderid: id } });
    }
  };

  return (
    <div className="pt-4 flex flex-col items-center justify-center">
      <h1 className="text-3xl mt-10 mb-10">
        Indsats order-nummer og tryk ENTER
      </h1>
      <Numpad
        placeholder={"Indsæt ordrenummer"}
        label={"Order-nummer"}
        onClick={x}
      />
    </div>
  );
};
