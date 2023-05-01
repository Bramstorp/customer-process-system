import axios from "axios";
import React, { useState, createContext, useEffect, PropsWithChildren } from "react";

import { fetchToken } from "../../auth/Auth";

type ICompany = {
  location: string;
  company_name: string;
  company_logo: string;
  api_endpoint: string;
  api_token: string;
  zebra_printer_ip: string;
  enable_api_integration: boolean;
};

type ICase = {
  id: number;
  type: string;
  date_of_action: string;
  customer_id: number;
  order_id: number;
};

type ICompanyContext = ICompany | null;
export const CompanyContext = createContext<ICompanyContext>(null);

export const CompanyContextProvider = (props: PropsWithChildren) => {
  const [company, setCompany] = useState<ICompanyContext>(null);
  const [cases, setCases] = useState<ICase | null>(null);

  axios.defaults.baseURL = "http://localhost:8000";
  if (company?.enable_api_integration) {
    axios.defaults.baseURL = company.api_endpoint;
  }

  const config = {
    headers: { Authorization: `Bearer ${fetchToken()}` },
  };

  const createCompany = (company: ICompany) => {
    axios.post("http://localhost:8000/create-company/", company, config);
  };

  const updateCompany = (company: ICompany) => {
    axios.put("http://localhost:8000/user/update-company", company, config);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/user/company", config)
      .then((res) => {
        setCompany(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios.get("http://localhost:8000/get-cases", config).then((res) => {
      setCases(res.data);
    });
  }, []);

  return (
    <CompanyContext.Provider value={{ company, cases, updateCompany, createCompany }}>
      {props.children}
    </CompanyContext.Provider>
  );
};
