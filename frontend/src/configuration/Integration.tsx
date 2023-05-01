import React, { FunctionComponent, useState, useContext, useEffect } from "react";
import { CompanyContext } from "../service/company/company.context";

export const Integration: FunctionComponent = () => {
  const { company, createCompany, updateCompany } = useContext(CompanyContext);
  const [currentCompany, setCurrentCompany] = useState({
    location: "",
    company_name: "",
    company_logo: "",
    api_endpoint: "",
    api_token: "",
    zebra_printer_ip: "",
    enable_api_integration: false,
  });

  useEffect(() => {
    if (company) {
      setCurrentCompany((prev) => ({
        ...prev,
        ...company,
      }));
    }
  }, [company]);

  const handleSubmit = () => {
    if (company) {
      updateCompany(currentCompany);
    } else {
      createCompany(currentCompany);
    }
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-5xl mb-12">Integration</h1>
      <div className="flex flex-col">
        <form onSubmit={handleSubmit}>
          {Object.keys(currentCompany).map((key) => (
            <div key={key} className="flex flex-col mb-4">
              <label className="text-xl mb-2" htmlFor={key}>
                {key}
              </label>
              {typeof currentCompany[key] === "boolean" ? (
                <input
                  className="border-2 border-gray-500 rounded-lg p-2 mr-auto"
                  type="checkbox"
                  name={key}
                  checked={currentCompany[key]}
                  onChange={(e) => {
                    const value = e.target.checked;
                    const name = e.target.name;
                    setCurrentCompany((prev) => ({
                      ...prev,
                      [name]: value,
                    }));
                  }}
                />
              ) : (
                <input
                  className="border-2 border-gray-500 rounded-lg p-2"
                  type="text"
                  name={key}
                  value={currentCompany[key] == null ? "" : currentCompany[key]}
                  onChange={(e) => {
                    const value = e.target.value;
                    const name = e.target.name;
                    setCurrentCompany((prev) => ({
                      ...prev,
                      [name]: value,
                    }));
                  }}
                />
              )}
            </div>
          ))}
          <button className="bg-blue-500 text-white p-2 rounded-lg" type="submit">
            {company ? "Opdater" : "Opret"}
          </button>
        </form>
      </div>
    </div>
  );
};
