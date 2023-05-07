import React, { FunctionComponent, useContext } from "react";
import { CompanyContext } from "../service/company/company.context";

import { ICase } from "../types/cases.type";

interface TotalByType {
  todayTotal: number;
  last7DaysTotal: number;
  thisMonthTotal: number;
  thisYearTotal: number;
}

export const Turnover: FunctionComponent = () => {
  const { cases } = useContext(CompanyContext);

  function calculateTotalByType(data: ICase[], type: string): TotalByType {
    console.log(data);
    const filteredData = data.filter((item) => item.type === type);

    const todayTotal = filteredData
      .filter((item) => {
        const date = new Date(item.order.orderdata);
        return isToday(date);
      })
      .reduce((acc, curr) => acc + curr.order.total_price, 0);

    const last7DaysTotal = filteredData
      .filter((item) => {
        const date = new Date(item.order.orderdata);
        return isLast7Days(date);
      })
      .reduce((acc, curr) => acc + curr.order.total_price, 0);

    const thisMonthTotal = filteredData
      .filter((item) => {
        const date = new Date(item.order.orderdata);
        return isThisMonth(date);
      })
      .reduce((acc, curr) => acc + curr.order.total_price, 0);

    const thisYearTotal = filteredData
      .filter((item) => {
        const date = new Date(item.order.orderdata);
        return isThisYear(date);
      })
      .reduce((acc, curr) => acc + curr.order.total_price, 0);

    function isToday(date: Date): boolean {
      const today = new Date();
      return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      );
    }

    function isLast7Days(date: Date): boolean {
      const today = new Date();
      const last7Days = new Date(today.setDate(today.getDate() - 7));
      return date >= last7Days;
    }

    function isThisMonth(date: Date): boolean {
      const today = new Date();
      return date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
    }

    function isThisYear(date: Date): boolean {
      const today = new Date();
      return date.getFullYear() === today.getFullYear();
    }

    return {
      todayTotal,
      last7DaysTotal,
      thisMonthTotal,
      thisYearTotal,
    };
  }

  const data = calculateTotalByType(cases ?? [], "cnc");

  return (
    <div className="flex flex-col">
      <h1 className="text-5xl mb-12">Turnover - Click and Collect</h1>
      <table className="mt-4 mb-4">
        <thead>
          <tr>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Name (DKK)
            </th>
          </tr>
        </thead>
        <tbody>
          <td className="px-5 py-5 border-b border-gray-200 text-sm">
            <p className="text-gray-900 whitespace-no-wrap">I dag</p>
          </td>
          <td className="px-5 py-5 border-b border-gray-200 text-sm">
            <p className="text-gray-900 whitespace-no-wrap">{data.todayTotal}</p>
          </td>
        </tbody>
        <tbody>
          <td className="px-5 py-5 border-b border-gray-200 text-sm">
            <p className="text-gray-900 whitespace-no-wrap">Sidste 7 dage</p>
          </td>
          <td className="px-5 py-5 border-b border-gray-200 text-sm">
            <p className="text-gray-900 whitespace-no-wrap">{data.last7DaysTotal}</p>
          </td>
        </tbody>
        <tbody>
          <td className="px-5 py-5 border-b border-gray-200 text-sm">
            <p className="text-gray-900 whitespace-no-wrap">Denne måned</p>
          </td>
          <td className="px-5 py-5 border-b border-gray-200 text-sm">
            <p className="text-gray-900 whitespace-no-wrap">{data.thisMonthTotal}</p>
          </td>
        </tbody>
        <tbody>
          <td className="px-5 py-5 border-b border-gray-200 text-sm">
            <p className="text-gray-900 whitespace-no-wrap">Dette år</p>
          </td>
          <td className="px-5 py-5 border-b border-gray-200 text-sm">
            <p className="text-gray-900 whitespace-no-wrap">{data.thisYearTotal}</p>
          </td>
        </tbody>
      </table>
    </div>
  );
};
