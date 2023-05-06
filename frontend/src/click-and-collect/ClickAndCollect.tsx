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

export interface IOrder {
  orderstate: string;
  ordertype: string;
  orderdata: string;
  total_price: number;
  currency: "DKK";
  id: string;
  customer: ICustomer;
}

export interface ICustomer {
  id: number;
  name: string;
  email: string;
  address: string;
  zipcode: 9600;
  city: string;
  country: string;
  phone: string;
}

export const ClickAndCollect: FunctionComponent = () => {
  const navigate = useNavigate();

  const createClickAndCollect = (res: IOrder) => {
    axios
      .post<ClickAndCollectResponseData>("http://localhost:8000/create-click-and-collect", {
        cnc_order: {
          orderstate: "picked-up",
        },
        order: {
          id: res.id,
          orderdata: res.orderdata,
          orderstate: res.orderstate,
          ordertype: res.ordertype,
          customer_id: res.customer.id,
          currecy: res.currency,
          total_price: res.total_price,
        },
        customer: res.customer,
      })
      .then((res) => {
        if (res.data) {
          navigate("/click-and-collect/confirmed", {
            state: res.data,
          });
        }
      })
      .catch((error: AxiosError) => {
        console.log(error.response);
        alert(error.response?.data);
        console.log(error, "error");
      });
  };

  const getOrder = (id: number) => {
    axios
      .get<IOrder>(`${axios.defaults.baseURL}/order/${id}`)
      .then((res) => {
        if (res.data.ordertype === "click-and-collect") {
          createClickAndCollect(res.data);
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
      <Numpad placeholder={"Indsæt ordrenummer"} label={"Order-nummer"} onClick={(id) => getOrder(Number(id))} />
    </div>
  );
};
