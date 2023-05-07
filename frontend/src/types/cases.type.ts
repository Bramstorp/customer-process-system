import { IOrder } from "./order.type";

export type ICompany = {
    location: string;
    company_name: string;
    company_logo: string;
    api_endpoint: string;
    api_token: string;
    zebra_printer_ip: string;
    enable_api_integration: boolean;
};
  
export type ICase = {
    id: number;
    type: string;
    date_of_action: string;
    customer_id: number;
    order_id: number;
    order: IOrder;
};


export interface ICompanyContext {
    company: ICompany | [];
    cases: ICase[] | [];
    updateCompany: (company: ICompany) => void;
    createCompany: (company: ICompany) => void;
};

export type ICaseContext = {
    cases: ICase[];
};