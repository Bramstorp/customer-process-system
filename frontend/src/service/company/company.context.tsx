import axios from "axios";
import React, { useState, createContext, useEffect, PropsWithChildren } from "react";

import { fetchToken } from "../../auth/Auth";

import { ICase, ICompany, ICompanyContext } from "../../types/cases.type";

export const CompanyContext = createContext<ICompanyContext>({} as ICompanyContext);

export const CompanyContextProvider = (props: PropsWithChildren) => {
  const [company, setCompany] = useState<ICompany>({} as ICompany);
  const [cases, setCases] = useState<ICase[] | null>(null);

  axios.defaults.baseURL = "http://localhost:8000";
  if (company && company.enable_api_integration) {
    axios.defaults.baseURL = company.api_endpoint;
  }

  const config = {
    headers: { Authorization: `Bearer ${fetchToken()}` },
  };

  const createCompany = (company: ICompany) => {
    axios.post("http://localhost:8000/create-company", company, config).then((res) => {
      setCompany(res.data);
    });
  };

  const updateCompany = (company: ICompany) => {
    axios.put("http://localhost:8000/user/update-company", company, config).then((res) => {
      setCompany(res.data);
    });
  };

  const getCompany = () => {
    axios
      .get("http://localhost:8000/user/company", config)
      .then((res) => {
        setCompany(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCases = () => {
    axios.get("http://localhost:8000/get-cases", config).then((res) => {
      setCases(res.data);
    });
  };

  useEffect(() => {
    getCompany();
    getCases();
  }, []);

  return (
    <CompanyContext.Provider value={{ company, cases, updateCompany, createCompany }}>
      {props.children}
    </CompanyContext.Provider>
  );
};
