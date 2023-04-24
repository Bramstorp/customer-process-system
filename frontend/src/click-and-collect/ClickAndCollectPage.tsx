import React, { FunctionComponent } from "react";
import { useRouteError } from "react-router-dom";
import { Numpad } from "../shared/Numpad";

export const ClickAndCollectPage: FunctionComponent = () => {
  const x = async (id: string) => {
    const fetchOrder = await fetch(`http://localhost:8000/order/${id}`, {
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
        func={x}
      />
    </div>
  );
};
