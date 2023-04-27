import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import faker from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// const labels = [
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
// ];

const hours = {
  1: "17h00",
  2: "17h15",
  3: "17h30",
  4: "17h45",
  5: "18h00",
  6: "18h15",
  7: "18h30",
  8: "18h45",
  9: "19h00",
  10: "19h15",
  11: "19h30",
  12: "19h45",
  13: "20h00",
  14: "20h15",
  15: "20h30",
  16: "20h45",
  17: "21h00",
  18: "21h15",
  19: "21h30",
  20: "21h45",
  21: "22h00",
  22: "22h15",
  23: "22h30",
  24: "22h45",
  25: "23h00",
  26: "23h15",
  27: "23h30",
  28: "23h45",
  29: "00h00",
  30: "00h15",
  31: "00h30",
  32: "00h45",
  33: "01h00",
  34: "01h15",
  35: "01h30",
  36: "01h45",
  37: "02h00",
  38: "02h15",
  39: "02h30",
  40: "02h45",
  41: "03h00",
  42: "03h15",
  43: "03h30",
  44: "03h45",
  45: "04h00",
  46: "04h15",
  47: "04h30",
  48: "04h45",
  49: "05h00",
  50: "05h15",
  51: "05h30",
  52: "05h45",
  53: "06h00",
  54: "06h15",
  55: "06h30",
  56: "06h45",
  57: "07h00",
  58: "07h15"
};

export const data = {
  datasets: [
    {
      label: "Departure",
      data: [
        { day: "Monday", hour: 3 },
        { day: "Tuesday", hour: 1 },
        { day: "Wednesday", hour: 10 },
        { day: "Thursday", hour: 5 },
        { day: "Friday", hour: 2 },
        { day: "Saturday", hour: 20 },
      ],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "false",
      display: "false",
    },
    tooltip: {
      callbacks: {
        label: function (context, indexed) {
          let label = context.dataset.label || "";

          if (label) {
            label += " :: ";
          }
          if (context.parsed.y !== null) {
            indexed = context.dataset.data[context.dataIndex].hour;
            label += hours[indexed];
          }
          return label;
        },
      },
    },
  },
  parsing: {
    xAxisKey: "day",
    yAxisKey: "hour",
  },
  scales: {
    y: {
      min: 0,
      max: 58,
      ticks: {
        beginAtZero: true,
        color: "white",
        callback: function (value, index, values) {
          return hours[value];
        },
      },
    },
    x: {
      ticks: {
        color: "white",
      },
    },
  },
  elements: {
    point: {
      radius: 10,
    },
  },
};

function WeekDepartureStat(props) {
  return (
    <div className={`h-fit w-full p-3 px-10 rounded text-white bg-gray-800`}>
      <h2 className="text-xl font-mono">
        Your Weekly Departure Graph :
      </h2>
      <br />
      <Line options={options} data={data} />
      <br />
    </div>
  );
}

export {WeekDepartureStat};
