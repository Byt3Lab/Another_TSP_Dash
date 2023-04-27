import React, { useEffect } from "react";
import { HelloCard } from "../HelloCard/HelloCard";
import { AvgArrivalCard } from "../AvgArrivalCard/AvgArrivalCard";
import { AvgDepartureCard } from "../AvgDepartureCard/AvgDepartureCard";
import { SalaryStateCard } from "../SalaryStateCard/SalaryStateCard";
import { SalaryLossStateCard } from "../SalaryLossStateCard/SalaryLossStateCard";
import { WeekArrivalStat } from "../WeekStat/WeekArrivalStat";
import { WeekDepartureStat } from "../WeekStat/WeekDepartureStat";
import { IOListing } from "../IOListing/IOListing";
import { SalaryStateListing } from "../SalaryStateListing/SalaryStateListing";
import { GetDashboardData } from "../../services/GetDashboardData.Service.ts";

const DashboardGrid = (props) => {
  useEffect(() => {
    props.setIsLoaded(false);
    GetDashboardData().then((response) => {
      if (response.worked && response.worked === true) {
        props.setIsLoaded(true);
        console.log(response);
      } else {
        console.log("Failed : ", response);
      }
    });
  }, []);

  return (
    <>
      <div className="grid grid-cols-3 gap-4 p-2">
        <div className="rounded-lg row-span-2 col-span-2">
          <HelloCard />
        </div>
        <div className="rounded-lg col-span-1 h-40">
          <AvgArrivalCard />
        </div>
        <div className="rounded-lg col-span-1 h-40">
          <AvgDepartureCard />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 p-2">
        <div className="rounded-lg col-span-1 h-24">
          <SalaryStateCard />
        </div>
        <div className="rounded-lg col-span-1 h-24">
          <SalaryLossStateCard />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-0.5 p-2">
        <div className="rounded-lg col-span-1">
          <WeekArrivalStat />
        </div>
        <div className=" rounded-lg col-span-1">
          <WeekDepartureStat />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 p-2">
        <div className="rounded-lg col-span-1 h-max">
          <SalaryStateListing />
        </div>
        <div className="rounded-lg col-span-1 h-max">
          <IOListing />
        </div>
      </div>
    </>
  );
};

export { DashboardGrid };
