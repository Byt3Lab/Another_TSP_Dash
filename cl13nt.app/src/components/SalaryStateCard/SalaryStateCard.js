import React from "react";

function SalaryStateCard(props) {
  return (
    <div className="h-full w-full p-3 px-10 rounded-lg text-white bg-gray-800 hover:bg-emerald-500">
      <h2 className="text-xl font-mono">Your Actual Salary :</h2>
      <h1 className="text-3xl font-semibold font-mono text-gray-800">
        120 000 XAF
      </h1>
      <br />
    </div>
  );
}

export { SalaryStateCard };
