import React, { useState } from "react";
import { AnimatedLoading } from "../Svgs/AnimatedLoading";
import { UserIcon } from "../Svgs/UserIcon";
import { TickIcon } from "../Svgs/TickIcon";
import { TimesIcon } from "../Svgs/TimesIcon";
import { ClockIcon } from "../Svgs/ClockIcon";
import { CalendarIcon } from "../Svgs/CalendarIcon";
import { DollarIcon } from "../Svgs/DollarIcon";

const EarlyDepartureForm = () => {
  const [name, setName] = useState("");
  const [forename, setForename] = useState("");
  const [weekday, setWeekDay] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [earlyTime, setEarlyTime] = useState("");
  const [earlyDebitValue, setEarlyDebitValue] = useState("");
  const [earlyDebit, setEarlyDebit] = useState("");
  const [departHour, setDepartHour] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authOK, setAuthOK] = useState(false);
  const [authFail, setAuthFail] = useState(false);

  const Gather = (event) => {
    event.preventDefault();
    setIsAuthenticating(true);
    /* RegisterFunct(name, forename, phone, mail, password).then((response) => {
      setIsAuthenticating(false);
      if (response.success === false) {
        setAuthFail(true);
        setTimeout(() => {
          setAuthFail(false);
        }, 3000);
      } else if (response.success === true) {
        setAuthOK(true);
        setTimeout(() => {
          setAuthOK(false);
          navigate("/login");
        }, 2000);
      }
    }); */
  };

  return (
    <form className="w-full" onSubmit={Gather}>
      {/* First Row */}
      <div className="w-full flex mb-4 p-1 items-center">
        <div className="flex items-center border-2 border-gray-700 py-2 px-3 rounded-2xl w-full">
          <UserIcon size={5} color={"black"} />
          &nbsp;
          <input
            className="pl-4 outline-none border-none w-full bg-transparent text-gray-700 font-bold"
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            required
            disabled
            contentEditable="false"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div className="flex items-center border-2 border-gray-700 py-2 px-3 rounded-2xl w-full">
          <UserIcon size={5} color={"black"} />
          &nbsp;
          <input
            className="pl-2 outline-none border-none w-full bg-transparent text-gray-700 font-bold"
            type="text"
            name="forename"
            id="forename"
            placeholder="Forename"
            required
            disabled
            contentEditable="false"
            onChange={(e) => setForename(e.target.value)}
          />
        </div>
      </div>
      {/* Second Row */}
      <div className="w-full flex mb-4 p-1 items-center">
        <div className="flex items-center border-2 border-gray-700 py-2 px-3 rounded-2xl w-full">
          <CalendarIcon size={5} color={"black"} />
          &nbsp;
          <input
            className="pl-2 outline-none border-none w-full bg-transparent text-gray-700 font-bold"
            type="text"
            name="weekday"
            id="weekday"
            placeholder="Weekday"
            required
            disabled
            contentEditable="false"
            onChange={(e) => setWeekDay(e.target.value)}
          />
        </div>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div className="flex items-center border-2 border-gray-700 py-2 px-3 rounded-2xl w-full">
          <CalendarIcon size={5} color={"black"} />
          &nbsp;
          <input
            className="pl-2 outline-none border-none w-full bg-transparent text-gray-700 font-bold"
            type="number"
            name="day"
            id="day"
            placeholder="Day"
            required
            disabled
            contentEditable="false"
            onChange={(e) => setDay(e.target.value)}
          />
        </div>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div className="flex items-center border-2 border-gray-700 py-2 px-3 rounded-2xl w-full">
          <CalendarIcon size={5} color={"black"} />
          &nbsp;
          <input
            className="pl-2 outline-none border-none w-full bg-transparent text-gray-700 font-bold"
            type="text"
            name="month"
            id="month"
            placeholder="Month"
            required
            disabled
            contentEditable="false"
            onChange={(e) => setMonth(e.target.value)}
          />
        </div>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div className="flex items-center border-2 border-gray-700 py-2 px-3 rounded-2xl w-full">
          <CalendarIcon size={5} color={"black"} />
          &nbsp;
          <input
            className="pl-2 outline-none border-none w-full bg-transparent text-gray-700 font-bold"
            type="number"
            name="year"
            id="year"
            placeholder="Year"
            required
            disabled
            contentEditable="false"
            onChange={(e) => setYear(e.target.value)}
          />
        </div>
      </div>
      {/* Third Row */}
      <div className="w-full flex mb-4 p-1 items-center">
        <div className="flex items-center border-2 border-gray-700 py-2 px-3 rounded-2xl w-full">
          <ClockIcon size={5} color={"black"} />
          &nbsp;
          <input
            className="pl-2 outline-none border-none w-full bg-transparent text-gray-700 font-bold"
            type="text"
            name="departHour"
            id="departHour"
            placeholder="Departure Hour"
            required
            disabled
            contentEditable="false"
            onChange={(e) => setDepartHour(e.target.value)}
          />
        </div>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div className="flex items-center border-2 border-gray-700 py-2 px-3 rounded-2xl w-full">
          <ClockIcon size={5} color={"black"} />
          &nbsp;
          <input
            className="pl-2 outline-none border-none w-full bg-transparent text-gray-700 font-bold"
            type="text"
            name="earlyTime"
            id="earlyTime"
            placeholder="How Early ?"
            required
            disabled
            contentEditable="false"
            onChange={(e) => setEarlyTime(e.target.value)}
          />
        </div>
      </div>
      {/* Fourth Row */}
      <div className="w-full flex mb-4 p-1 items-center">
        <div className="flex items-center border-2 border-gray-700 py-2 px-3 rounded-2xl w-full">
          <DollarIcon size={5} color={"black"} />
          &nbsp;
          <input
            className="pl-2 outline-none border-none w-full bg-transparent text-gray-700 font-bold"
            type="number"
            name="earlyDebitValue"
            id="earlyDebitValue"
            placeholder="Debited Amount Unit"
            required
            disabled
            contentEditable="false"
            onChange={(e) => setEarlyDebitValue(e.target.value)}
          />
        </div>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div className="flex items-center border-2 py-2 px-3 border-gray-700 rounded-2xl w-full">
          <DollarIcon size={5} color={"black"} />
          &nbsp;
          <input
            className="pl-2 outline-none border-none w-full bg-transparent text-gray-700 font-bold"
            type="number"
            name="earlyDebit"
            id="earlyDebit"
            placeholder="Debited Amount"
            required
            disabled
            contentEditable="false"
            onChange={(e) => setEarlyDebit(e.target.value)}
          />
        </div>
      </div>
      {!isAuthenticating && !authOK && !authFail ? (
        <button
          type="submit"
          className="block w-full bg-emerald-400 mt-4 py-2 rounded-2xl text-white font-semibold mb-2 h-11"
        >
          Continue
        </button>
      ) : null}
      {isAuthenticating ? (
        <button
          disabled={true}
          className="w-full bg-sky-500 mt-4 py-2 rounded-2xl text-white font-semibold mb-2 flex items-center justify-center h-11"
        >
          <AnimatedLoading size={6} />
        </button>
      ) : null}
      {!isAuthenticating && authOK && !authFail ? (
        <button
          disabled={true}
          className="w-full bg-emerald-400 mt-4 py-2 rounded-2xl text-white font-semibold mb-2 flex items-center justify-center h-11"
        >
          <TickIcon size={8} color={"white"} />
        </button>
      ) : null}
      {!isAuthenticating && authFail && !authOK ? (
        <button
          disabled={true}
          className="w-full bg-red-500 mt-4 py-2 rounded-2xl text-white font-semibold mb-2 flex items-center justify-center h-11"
        >
          <TimesIcon size={8} color={"white"} />
        </button>
      ) : null}
    </form>
  );
};

export { EarlyDepartureForm };
