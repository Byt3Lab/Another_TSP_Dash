import React from "react";

function AvgDepartureCard(props) {
  return (
    <div
      className={`h-full w-full p-5 rounded-lg text-white bg-gradient-to-br from-black via-sky-700 to-blue-900 hover:bg-gradient-to-br hover:from-white hover:via-white hover:to-white hover:text-gray-800`}
    >
      <h2 className="text-xl font-mono">Your Average Departure Hour :</h2>
      <h1 className="text-6xl font-semibold font-mono">06:00 PM</h1>
      <br />
    </div>
  );
}

export { AvgDepartureCard };
