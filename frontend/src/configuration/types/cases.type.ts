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
};


export interface ICompanyContext {
    company: ICompany | null;
    cases: ICase[] | null;
    updateCompany: (company: ICompany) => void;
    createCompany: (company: ICompany) => void;
};

export type ICaseContext = {
    cases: ICase[];
};