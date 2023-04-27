import React from "react";

function AvgArrivalCard(props) {
  return (
    <div className="h-full w-full p-5 rounded text-white bg-gradient-to-br from-emerald-900 via-emerald-500 to-cyan-300 hover:text-gray-800 hover:bg-gradient-to-br hover:from-white hover:via-white hover:to-white">
      <h2 className="text-xl font-mono">Your Average Arrival Hour :</h2>
      <h1 className="text-6xl font-semibold font-mono">08:30 AM</h1>
      <br />
    </div>
  );
}

export { AvgArrivalCard };
