import React, { useEffect, useState } from "react";
import { CalendarIcon } from "../Svgs/CalendarIcon";
import { ListingIcon } from "../Svgs/ListingIcon";
import { DollarIcon } from "../Svgs/DollarIcon";
import { EmptyBox } from "../Svgs/EmptyBox";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";
import "@inovua/reactdatagrid-community/base.css";
import "@inovua/reactdatagrid-community/theme/blue-light.css";

const ListingsView = (props) => {
  const [dateRangeValue, setDateRangeValue] = useState([
    new Date(),
    new Date(),
  ]);
  const [isSalarySelected, setIsSalarySelected] = useState(false);
  const [isAttendanceSelected, setIsAttendanceSelected] = useState(false);
  const [selectValue, setSelectValue] = useState(null);

  const salaryColumns = [
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

  const attendanceColumns = [
    { name: "icon", header: "[O]", minWidth: 70, maxWidth: 70, defaultFlex: 1 },
    { name: "date", header: "Date", minWidth: 50, defaultFlex: 2 },
    {
      name: "label",
      header: "Label",
      minWidth: 100,
      maxWidth: 1000,
      defaultFlex: 1,
    },
    { name: "hour", header: "Hour", minWidth: 100, defaultFlex: 1 },
    { name: "amount", header: "How Much ?", minWidth: 100, defaultFlex: 1 },
  ];

  const gridStyle = { minHeight: 300 };

  const attendanceData = [
    {
      id: 1,
      icon: "🔶",
      date: new Date("01/01/2022").toLocaleDateString(),
      label: "Late",
      hour: new Date().toLocaleTimeString(),
      amount: "-" + 250 + "XAF",
    },
    {
      id: 2,
      icon: "🔶",
      date: new Date("01/04/2022").toLocaleDateString(),
      label: "Departure",
      hour: new Date().toLocaleTimeString(),
      amount: "-" + 100 + "XAF",
    },
    {
      id: 3,
      icon: "🔷",
      date: new Date("02/09/2022").toLocaleDateString(),
      label: "Arrival",
      hour: new Date().toLocaleTimeString(),
      amount: "" + 0 + "XAF",
    },
    {
      id: 4,
      icon: "🔷",
      date: new Date("02/15/2022").toLocaleDateString(),
      label: "Arrival",
      hour: new Date().toLocaleTimeString(),
      amount: "" + 0 + "XAF",
    },
    {
      id: 5,
      icon: "🔶",
      date: new Date("02/19/2022").toLocaleDateString(),
      label: "Late",
      hour: new Date().toLocaleTimeString(),
      amount: "-" + 200 + "XAF",
    },
    {
      id: 6,
      icon: "🔷",
      date: new Date("02/25/2022").toLocaleDateString(),
      label: "Arrival",
      hour: new Date().toLocaleTimeString(),
      amount: "" + 0 + "XAF",
    },
    {
      id: 7,
      icon: "🔷",
      date: new Date("01/01/2022").toLocaleDateString(),
      label: "Arrival",
      hour: new Date().toLocaleTimeString(),
      amount: "" + 0 + "XAF",
    },
    {
      id: 8,
      icon: "🔶",
      date: new Date("01/04/2022").toLocaleDateString(),
      label: "Late",
      hour: new Date().toLocaleTimeString(),
      amount: "-" + 300 + "XAF",
    },
    {
      id: 9,
      icon: "🔷",
      date: new Date("02/09/2022").toLocaleDateString(),
      label: "Departure",
      hour: new Date().toLocaleTimeString(),
      amount: "" + 0 + "XAF",
    },
    {
      id: 10,
      icon: "🔷",
      date: new Date("02/15/2022").toLocaleDateString(),
      label: "Departure",
      hour: new Date().toLocaleTimeString(),
      amount: "" + 0 + "XAF",
    },
  ];

  const salaryData = [
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

  console.log(selectValue);
  useEffect(() => {
    if (selectValue === "salary") {
      setIsSalarySelected(true);
      setIsAttendanceSelected(false);
    }
    if (selectValue === "attendance") {
      setIsAttendanceSelected(true);
      setIsSalarySelected(false);
    }
    if (selectValue === "empty" || selectValue === null) {
      setIsAttendanceSelected(false);
      setIsSalarySelected(false);
    }
  }, [selectValue]);

  return (
    <div className="flex flex-col w-4/5 h-screen p-10 rounded-3xl text-gray-700">
      <div className="px-10 mb-7">
        <h1 className="text-4xl font-bold">Attendance and Salary History</h1>
        <h4 className="text-2xl font-light text-gray-600">
          Select the Period [Per Week] and Listing Type.
        </h4>
      </div>
      <div className="w-full px-10 py-5">
        <div className="w-full bg-gray-700 py-3 px-6 flex items-center justify-around rounded-2xl">
          <div className="w-1/3 flex flex-col justify-start">
            <div className="flex items-center text-white mb-2">
              <CalendarIcon size={7} />
              <h2 className="text-xl font-bold ml-2">Week Period</h2>
            </div>
            <DateRangePicker
              onChange={setDateRangeValue}
              value={dateRangeValue}
              calendarAriaLabel={"Toogle Calendar"}
              showLeadingZeros={true}
              maxDate={new Date()}
              className="bg-white w-max px-5 py-3 rounded-2xl flex justify-between"
            />
          </div>
          <div className="w-1/3 flex flex-col justify-start">
            <div className="flex items-center text-white mb-2">
              <ListingIcon size={7} />
              <h2 className="text-xl font-bold ml-2">Listing Type</h2>
            </div>
            <select
              className="h-12 px-5 text-xl font-bold text-gray-700 rounded-2xl bg-white w-full"
              onChange={(ev) => setSelectValue(ev.target.value)}
              /* value={selectValue} */
            >
              <option value={"empty"}>- / -</option>
              <option value={"salary"}>Salary</option>
              <option value={"attendance"}>Attendance</option>
            </select>
          </div>
        </div>
        <div className="w-full py-3 px-6 flex items-center justify-center mt-5">
          {!isSalarySelected && !isAttendanceSelected ? (
            <div className="w-full p-10 flex items-center justify-center">
              <div className="w-1/2 flex flex-col p-6 rounded-2xl bg-gray-700 justify-center items-center text-white">
                <EmptyBox size={14} />
                <h2 className="text-2xl font-bold">No Data</h2>
              </div>
            </div>
          ) : isSalarySelected && !isAttendanceSelected ? (
            <div className="w-full flex p-2 rounded-lg bg-gray-700 justify-center items-center">
              <ReactDataGrid
                idProperty="id"
                columns={salaryColumns}
                dataSource={salaryData}
                style={gridStyle}
              />
            </div>
          ) : !isSalarySelected && isAttendanceSelected ? (
            <div className="w-full flex p-2 rounded-lg bg-gray-700 justify-center items-center">
              <ReactDataGrid
                idProperty="id"
                columns={attendanceColumns}
                dataSource={attendanceData}
                style={gridStyle}
              />
            </div>
          ) : (
            <div className="w-full p-10 flex items-center justify-center bg-orange-300">
              <div className="w-1/2 flex flex-col p-6 rounded-2xl bg-gray-700 justify-center items-center text-gray-700">
                <EmptyBox size={14} />
                <h2 className="text-2xl font-bold">No Data</h2>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { ListingsView };
