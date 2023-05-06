import { ICustomer } from "./customer.type";

export interface IOrder {
    orderstate: string;
    ordertype: string;
    orderdata: string;
    total_price: number;
    currency: "DKK";
    id: string;
    customer: ICustomer;
}

export interface IOrderNoCustomer {
    orderstate: string;
    ordertype: string;
    orderdata: string;
    total_price: number;
    currency: "DKK";
    id: string;
}
  
