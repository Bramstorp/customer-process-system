import React, { FunctionComponent, useContext } from "react";
import { CompanyContext } from "../service/company/company.context";

export const CustomerCases: FunctionComponent = () => {
  const { cases } = useContext(CompanyContext);

  return (
    <div className="flex flex-col">
      <h1 className="text-5xl mb-12">Customer cases</h1>
      <table className="mt-4 mb-4">
        <thead>
          <tr>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Customer cases
            </th>
          </tr>
        </thead>
        <tbody>
          <td className="px-5 py-5 border-b border-gray-200 text-sm">
            <p className="text-gray-900 whitespace-no-wrap">I dag</p>
          </td>
          <td className="px-5 py-5 border-b border-gray-200 text-sm">
            <p className="text-gray-900 whitespace-no-wrap">2</p>
          </td>
        </tbody>
        <tbody>
          <td className="px-5 py-5 border-b border-gray-200 text-sm">
            <p className="text-gray-900 whitespace-no-wrap">Sidste 7 dage</p>
          </td>
          <td className="px-5 py-5 border-b border-gray-200 text-sm">
            <p className="text-gray-900 whitespace-no-wrap">2</p>
          </td>
        </tbody>
        <tbody>
          <td className="px-5 py-5 border-b border-gray-200 text-sm">
            <p className="text-gray-900 whitespace-no-wrap">Denne måned</p>
          </td>
          <td className="px-5 py-5 border-b border-gray-200 text-sm">
            <p className="text-gray-900 whitespace-no-wrap">2</p>
          </td>
        </tbody>
        <tbody>
          <td className="px-5 py-5 border-b border-gray-200 text-sm">
            <p className="text-gray-900 whitespace-no-wrap">Dette år</p>
          </td>
          <td className="px-5 py-5 border-b border-gray-200 text-sm">
            <p className="text-gray-900 whitespace-no-wrap">2</p>
          </td>
        </tbody>
      </table>
    </div>
  );
};
