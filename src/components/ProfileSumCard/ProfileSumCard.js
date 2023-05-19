import React from "react";
import { UserRoundedIcon } from "../Svgs/UserRoundedIcon";
import { VerifiedTick } from "../Svgs/VerifiedTick";
import { ArobaseIcon } from "../Svgs/ArobaseIcon";
import { LocationMarkerIcon } from "../Svgs/LocationMarkerIcon";
import { RentIcon } from "../Svgs/RentIcon";
import { DollarIcon } from "../Svgs/DollarIcon";
import { CalendarIcon } from "../Svgs/CalendarIcon";
import { SearchDocument } from "../Svgs/SearchDocument";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { BoardIcon } from "../Svgs/BoardIcon";

const ProfileSumCard = (props) => {
  const isVerified = true;
  const [isMiniMenu, setIsMiniMenu] = React.useState(false);
  const toogleMiniMenu = () => {
    setIsMiniMenu(!isMiniMenu);
  };
  return (
    <div className="flex flex-row rounded-lg bg-white p-6">
      <div className="relative">
        <img
          className="w-40 h-40 rounded-md object-cover"
          src="https://api.lorem.space/image/face?w=150&h=150"
          alt="User"
        />
      </div>

      <div className="flex flex-col px-6">
        <div className="flex h-8 flex-row items-center">
          <h2 className="text-2xl font-semibold mr-2">My Name ?</h2>
        </div>

        <div className="my-2 flex flex-row space-x-2">
          <div className="flex flex-row items-center">
            <UserRoundedIcon size={5} color={"gray"} />
            <div className="text-base text-gray-400 font-medium lowercase">
              My Role ?
            </div>
          </div>

          <div className="flex flex-row items-center">
            <ArobaseIcon size={5} color={"gray"} />

            <div className="text-base text-gray-400 font-medium lowercase">
              mail.adress@mail.adress
            </div>
          </div>
        </div>
        <div className="mt-2 flex flex-row items-center space-x-5">
          <div className="flex h-max w-40 flex-col items-center justify-center rounded-md transition-colors duration-100 ease-in-out p-3">
            <div className="flex flex-row items-center">
              <BoardIcon size={8} color={"gray"} />
              &nbsp;
              <span className="font-bold text-gray-600 text-xl"> 0 </span>
            </div>
            <div className="mt-2 text-base text-gray-400 font-bold">
              Tasks Done
            </div>
          </div>
          <div className="flex h-max w-40 flex-col items-center justify-center rounded-md transition-colors duration-100 ease-in-out p-3">
            <div className="flex flex-row items-center">
              <CalendarIcon size={8} color={"gray"} />
              &nbsp;
              <span className="font-bold text-gray-600 text-xl"> 0 </span>
            </div>
            <div className="mt-2 text-base text-gray-400 font-bold">
              Days Attended
            </div>
          </div>
        </div>
      </div>

      <div className="w-100 flex flex-grow flex-col items-end justify-start">
        <div className="flex flex-col items-end">
          <button
            className="flex rounded-md bg-gray-100 py-2 px-1 text-white 
        transition-all duration-150 ease-in-out hover:bg-gray-200 w-max float-right"
            onClick={toogleMiniMenu}
          >
            <svg
              className="fill-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z" />
            </svg>
          </button>
          {isMiniMenu ? (
            <div className="w-full mt-2 rounded-lg py-3 bg-gray-100 flex flex-col justify-center">
              <Link to={`/account`}>
                <div className="w-full px-6 py-2 text-sm font-bold hover:bg-slate-500 hover:text-white">
                  Settings
                </div>
              </Link>
              <Link to={`/FFFF`}>
                <div className="w-full px-6 py-2 text-sm font-bold hover:bg-slate-500 hover:text-white">
                  Help ?
                </div>
              </Link>
              <Link to={`/FFFF`}>
                <div className="w-full px-6 py-2 text-sm font-bold hover:bg-slate-500 hover:text-white">
                  Logout
                </div>
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export { ProfileSumCard };
