import React from "react";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";
import "@inovua/reactdatagrid-community/base.css";
import "@inovua/reactdatagrid-community/theme/blue-light.css";

//https://reactdatagrid.io/

const columns = [
  { name: "icon", header: "[O]", minWidth: 70, maxWidth: 70, defaultFlex: 1 },
  { name: "date", header: "Date", minWidth: 50, defaultFlex: 2 },
  {
    name: "label",
    header: "Label",
    minWidth: 100,
    maxWidth: 1000,
    defaultFlex: 1,
  },
  { name: "amount", header: "Amount", minWidth: 100, defaultFlex: 1 },
];

const gridStyle = { minHeight: 300 };

const dataSource = [
  {
    id: 1,
    icon: "🟥",
    date: new Date("01/01/2022").toLocaleDateString(),
    label: "Retard",
    amount: "-" + 150 + "XAF",
  },
  {
    id: 2,
    icon: "🟩",
    date: new Date("01/04/2022").toLocaleDateString(),
    label: "Prime",
    amount: 2000 + "XAF",
  },
  {
    id: 3,
    icon: "🟩",
    date: new Date("02/09/2022").toLocaleDateString(),
    label: "Donation",
    amount: 2000 + "XAF",
  },
  {
    id: 4,
    icon: "🟥",
    date: new Date("02/15/2022").toLocaleDateString(),
    label: "Absence",
    amount: "-" + 1000 + "XAF",
  },
  {
    id: 5,
    icon: "🟩",
    date: new Date("02/19/2022").toLocaleDateString(),
    label: "Prime",
    amount: 2000 + "XAF",
  },
  {
    id: 6,
    icon: "🟥",
    date: new Date("02/25/2022").toLocaleDateString(),
    label: "Retard",
    amount: "-" + 150 + "XAF",
  },
  {
    id: 7,
    icon: "🟥",
    date: new Date("01/01/2022").toLocaleDateString(),
    label: "Retard",
    amount: "-" + 150 + "XAF",
  },
  {
    id: 8,
    icon: "🟩",
    date: new Date("01/04/2022").toLocaleDateString(),
    label: "Prime",
    amount: 2000 + "XAF",
  },
  {
    id: 9,
    icon: "🟩",
    date: new Date("02/09/2022").toLocaleDateString(),
    label: "Donation",
    amount: 2000 + "XAF",
  },
  {
    id: 10,
    icon: "🟥",
    date: new Date("02/15/2022").toLocaleDateString(),
    label: "Absence",
    amount: "-" + 1000 + "XAF",
  },
  {
    id: 11,
    icon: "🟩",
    date: new Date("02/19/2022").toLocaleDateString(),
    label: "Prime",
    amount: 2000 + "XAF",
  },
  {
    id: 12,
    icon: "🟥",
    date: new Date("02/25/2022").toLocaleDateString(),
    label: "Retard",
    amount: "-" + 150 + "XAF",
  },
];

function SalaryStateListing(props) {
  return (
    <div className={`h-fit w-full py-3 rounded-lg text-white bg-gray-800`}>
      <div className="flex items-baseline justify-between px-10">
        <h2 className="text-xl font-mono">Salary History :</h2>
        <HistoryIcon />
      </div>
      <br />
      <ReactDataGrid
        idProperty="id"
        columns={columns}
        dataSource={dataSource}
        style={gridStyle}
      />
    </div>
  );
}

const HistoryIcon = () => <span className="float-right text-2xl">📜</span>;

export { SalaryStateListing };
