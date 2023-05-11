import React, { FunctionComponent, useContext, useState } from "react";
import { CompanyContext } from "../service/company/company.context";
import { ICase } from "../types/cases.type";

interface TotalByType {
  todayTotal: number;
  last7DaysTotal: number;
  thisMonthTotal: number;
  thisYearTotal: number;
}

interface CasesByHour {
  hour: number;
  count: number;
}

export const CustomerCases: FunctionComponent = () => {
  const { cases } = useContext(CompanyContext);

  function calculateCustomersByInterval(data: ICase[]): TotalByType {
    const filteredData = data;

    const todayTotal = filteredData.filter((item) => {
      const date = new Date(item.date_of_action);
      return isToday(date);
    }).length;

    const last7DaysTotal = filteredData.filter((item) => {
      const date = new Date(item.date_of_action);
      return isLast7Days(date);
    }).length;

    const thisMonthTotal = filteredData.filter((item) => {
      const date = new Date(item.date_of_action);
      return isThisMonth(date);
    }).length;

    const thisYearTotal = filteredData.filter((item) => {
      const date = new Date(item.date_of_action);
      return isThisYear(date);
    }).length;

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

  function getCasesByHour(data: ICase[]): CasesByHour[] {
    const casesByHour: CasesByHour[] = new Array(7).fill(0).map((_, i) => ({ hour: i + 9, count: 0 }));

    data.forEach((item) => {
      const date = new Date(item.date_of_action);
      const hour = date.getHours();

      if (hour >= 9 && hour <= 15) {
        casesByHour[hour - 9].count++;
      }
    });

    return casesByHour;
  }

  const casesByHour = getCasesByHour(cases ?? []);

  const data = calculateCustomersByInterval(cases ?? []);

  console.log(casesByHour);

  return (
    <div className="flex flex-col">
      <h1 className="text-5xl mb-12">Customer cases</h1>
      <table className="mt-4 mb-4">
        <thead>
          <tr>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Customers
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
      <br />
    </div>
  );
};
