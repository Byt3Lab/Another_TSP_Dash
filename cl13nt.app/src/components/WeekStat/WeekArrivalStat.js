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
  1: "07h30",
  2: "07h45",
  3: "08h00",
  4: "08h15",
  5: "08h30",
  6: "08h45",
  7: "09h00",
  8: "09h15",
  9: "09h30",
  10: "09h45",
  11: "10h00",
  12: "10h15",
  13: "10h30",
  14: "10h45",
  15: "11h00",
  16: "11h15",
  17: "11h30",
  18: "11h45",
  19: "12h00",
  20: "12h15",
  21: "12h30",
  22: "12h45",
  23: "13h00",
  24: "13h15",
  25: "13h30",
  26: "13h45",
  27: "14h00",
  28: "14h15",
  29: "14h30",
  30: "14h45",
  31: "15h00",
  32: "15h15",
  33: "15h30",
  34: "15h45",
  35: "16h00",
  36: "16h15",
  37: "16h30",
  38: "16h45",
};

export const data = {
  datasets: [
    {
      label: "Arrival",
      data: [
        { day: "Monday", hour: 2 },
        { day: "Tuesday", hour: 8 },
        { day: "Wednesday", hour: 5 },
        { day: "Thursday", hour: 10 },
        { day: "Friday", hour: 5 },
        { day: "Saturday", hour: 1 },
      ],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
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
      max: 38,
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

function WeekArrivalStat(props) {
  return (
    <div className={`h-fit w-full p-3 px-10 rounded text-white bg-gray-800`}>
      <h2 className="text-xl font-mono">
        Your Weekly Arrival Graph :
      </h2>
      <br />
      <Line options={options} data={data} />
      <br />
    </div>
  );
}

export {WeekArrivalStat};
