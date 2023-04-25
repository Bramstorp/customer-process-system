import React, { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { Numpad } from "../shared/Numpad";

export const ClickAndCollectPage: FunctionComponent = () => {
  const navigate = useNavigate();

  const x = async (id: number) => {
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
      await fetch("http://localhost:8000/create-click-and-collect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pickup_date: "2023-04-24T14:26:31.655000",
          orderstate: "picked-up",
          order_id: id,
          customer_id: fetchOrder.customer.id.toString(),
        }),
      }).then(async (res) => {
        if (res.status === 404 || res.status === 401) {
          alert(await res.json());
        } else {
          navigate("/click-and-collect/confirmed", {
            state: { order: fetchOrder, customer: fetchOrder.customer },
          });
        }
      });
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
