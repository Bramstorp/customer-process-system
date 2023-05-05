import React, { FunctionComponent, useContext, useState } from "react";
import { CompanyContext } from "../service/company/company.context";

export const Statistics: FunctionComponent = () => {
  const { cases } = useContext(CompanyContext);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [caseType, setCaseType] = useState("all");

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

  function filterCases(caseData) {
    const caseDate = new Date(caseData.date_of_action);
    const filterStartDate = new Date(startDate);
    const filterEndDate = new Date(endDate);

    if (startDate && caseDate <= filterStartDate) {
      return false;
    }

    if (endDate && caseDate >= filterEndDate) {
      return false;
    }

    if (caseType !== "all" && caseData.type !== caseType) {
      return false;
    }

    return true;
  }

  const filteredCases = cases.filter(filterCases);

  return (
    <div className="flex flex-col">
      <h1 className="text-5xl mb-12">Statistics</h1>
      <h2 className="font-bold text-lg mb-4">Cases filter</h2>
      <form>
        <div className="flex flex-row gap-2">
          <div className="mb-4 basis-1/2">
            <label className="block text-gray-700 font-bold mb-2">Start dato:</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="startDate"
              type="date"
              onChange={(event) => setStartDate(event.target.value)}
            />
          </div>
          <div className="mb-6 basis-1/2">
            <label className="block text-gray-700 font-bold mb-2">Slut dato:</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="endDate"
              type="date"
              onChange={(event) => setEndDate(event.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <div className="mb-6 basis-1/2">
            <label className="block text-gray-700 font-bold mb-2">Case type</label>
            <select
              onChange={(event) => setCaseType(event.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="all">All</option>
              <option value="cnc">Click and Collect</option>
              <option value="returns">Return</option>
            </select>
          </div>
        </div>
      </form>
      <table className="mt-4 mb-4">
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
              Total pris
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
          {filteredCases.map((caseData) => (
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
                <p className="text-gray-900 whitespace-no-wrap">
                  {caseData.order.total_price} {caseData.order.currency}
                </p>
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
  );
};
