import React, { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { Numpad } from "../shared/Numpad";
import axios, { AxiosError } from "axios";

interface ClickAndCollectResponseData {
  return_date: string;
  customer_id: number;
  id: number;
  kolli_amount: number;
  order_id: number;
  ordertype: string;
}

interface OrderData {
  customer: {
    id: string;
  };
  ordertype: string;
}

export const ClickAndCollect: FunctionComponent = () => {
  const navigate = useNavigate();

  const createClickAndCollect = (customerid: string, orderid: string) => {
    axios
      .post<ClickAndCollectResponseData>("http://localhost:8000/create-click-and-collect", {
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
      .catch((error: AxiosError) => {
        alert(error.response?.data);
        console.log(error, "error");
      });
  };

  const getOrder = (id: number) => {
    axios
      .get<OrderData>(`${axios.defaults.baseURL}/order/${id}`)
      .then((res) => {
        if (res.data.ordertype === "click-and-collect") {
          createClickAndCollect(res.data.customer.id, `${id}`);
        } else {
          alert("Order er ikke en click and collect ordre");
        }
      })
      .catch((error: AxiosError) => {
        alert("Ordrenummeret findes ikke");
        console.log(error, "error");
      });
  };

  return (
    <div className="pt-4 flex flex-col items-center justify-center">
      <h1 className="text-3xl mt-10">Click and Collect</h1>
      <h1 className="text-2xl mt-10 mb-10">Indsats order-nummer og tryk ENTER</h1>
      <Numpad placeholder={"Indsæt ordrenummer"} label={"Order-nummer"} onClick={getOrder} />
    </div>
  );
};
