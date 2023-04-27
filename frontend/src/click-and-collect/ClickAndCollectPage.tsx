import React, { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { Numpad } from "../shared/Numpad";
import axios from "axios";

export const ClickAndCollectPage: FunctionComponent = () => {
  const navigate = useNavigate();

  const createClickAndCollect = (customerid, orderid) => {
    axios
      .post("http://localhost:8000/create-click-and-collect", {
        pickup_date: "2023-04-24T14:26:31.655000",
        orderstate: "picked-up",
        order_id: orderid,
        customer_id: customerid,
      })
      .then((res) => {
        if (res.data) {
          navigate("/click-and-collect/confirmed", {
            state: res.data,
          });
        }
      })
      .catch((error) => {
        alert(error);
        console.log(error, "error");
      });
  };

  const x = (id: number) => {
    axios
      .get(`http://localhost:8000/order/${id}`)
      .then((res) => {
        createClickAndCollect(res.data.customer.id, id);
      })
      .catch((error) => {
        alert(error);
        console.log(error, "error");
      });
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
