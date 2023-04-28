import axios from "axios";
import React, { useState, createContext, useEffect } from "react";

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
type ICompanyContext = ICompany | null;
export const CompanyContext = createContext([[], () => null]);

export const CompanyContextProvider = ({ children }) => {
  const [company, setCompany] = useState<ICompanyContext>(null);

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
      .get("http://localhost:8000/user/company/", config)
      .then((res) => {
        setCompany(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <CompanyContext.Provider value={{ company, updateCompany, createCompany }}>{children}</CompanyContext.Provider>
  );
};
