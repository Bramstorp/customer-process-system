import React, { FunctionComponent, useContext } from "react";
import { CompanyContext } from "../service/company/company.context";

export const Cases: FunctionComponent = () => {
  const { cases } = useContext(CompanyContext);

  function formatDate(dateString: Date) {
    const date = new Date(dateString);
    return date.toLocaleDateString("da-DK", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
  }

  const TYPE_MAP = {
    cnc: "Click and Collect",
    returns: "Return",
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-5xl mb-10">Cases</h1>
      <div className="inline-block min-w-full shadow rounded-lg overflow-hidden mb-10">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Case id
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Type
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Date of action
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Customer id
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Order id
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {cases.map((caseData) => (
              <tr key={caseData.id} className="hover:bg-gray-100">
                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{caseData.id}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{TYPE_MAP[caseData.type]}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{formatDate(caseData.date_of_action)}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{caseData.customer_id}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{caseData.order_id}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                  <span
                    className={`relative inline-block px-3 py-1 font-semibold ${
                      caseData.status === "active" ? "text-green-900" : "text-red-900"
                    } leading-tight`}
                  >
                    <span
                      aria-hidden
                      className={`absolute inset-0 ${
                        caseData.status === "active" ? "bg-green-200" : "bg-red-200"
                      } opacity-50 rounded-full`}
                    ></span>
                    <span className="relative">{caseData.status === "active" ? "Active" : "Inactive"}</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
