import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FullScreenMenuButton } from "../FullScreenMenu/FullScreenMenuButton";
import { NotificationsBox } from "../NotificationsBox/NotificationsBox";
import { BellIcon } from "../Svgs/BellIcon";
import { UserIcon } from "../Svgs/UserIcon";

const NavBarLight = (props) => {
  /*   const [isProfile, setIsProfile] = useState(false);
  const toogleIsProfile = () => {
    setIsProfile(!isProfile);
  }; */

  return (
    <div className="p-4 w-2/3 flex items-center justify-center">
      <div className="p-5 text-gray-900 bg-white rounded-lg shadow-lg font-semibold capitalize items-center w-max flex">
        <Link to="/">
          <div className="px-2 ml-3 border-r border-gray-800 w-max items-center">
            <img
              src="https://www.freepnglogos.com/uploads/pokemon-symbol-logo-png-31.png"
              alt="Logo Here"
              className="w-8 h-8 -mt-1 inline mx-auto"
            />
            &nbsp;&nbsp;&nbsp;&nbsp;
          </div>
        </Link>
        <div className="px-2 ml-3 m border-r border-gray-800 items-center h-8 flex justify-center">
          <FullScreenMenuButton
            isOpen={props.isOpen}
            toogleFullMenu={props.toogleFullMenu}
            setIsOpen={props.setIsOpen}
          />
        </div>
        <div className="group inline-block relative justify-items-center justify-center">
          <div className="px-2 ml-3 border-r border-gray-800 items-center h-8 flex justify-center">
            <button className="font-semibold rounded inline-flex items-center">
              <div className="px-2 py-2 relative cursor-pointer hover:bg-gray-500 hover:text-white rounded-xl">
                <span className="flex items-center justify-center">
                  <BellIcon size={4} />
                  <span className="mx-1">Notifications</span>
                </span>
                <span className="absolute right-0 top-0 -mt-2 -mr-1 text-xs bg-red-500 text-white font-bold px-2 shadow-lg rounded-full">
                  0
                </span>
              </div>
            </button>
          </div>
          <div className="pt-2 absolute hidden group-hover:block w-max">
            <div className="w-full bg-gray-500 rounded-xl">
              <NotificationsBox isNotification={false} />
            </div>
          </div>
        </div>
        <Link to="/profile">
          <div className="px-2 ml-3 items-center h-8 flex justify-center">
            <button className="px-2 py-2 mr-3 cursor-pointer hover:bg-gray-500 hover:text-white rounded-xl flex items-center justify-center">
              <UserIcon size={4} />
              <span className="mx-1">Profile</span>
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
};

const NavBarDark = () => {
  return (
    <div className="p-4 w-full lg:w-1/2 bg-gray-800">
      <div className="p-2 text-gray-700 bg-gray-900 rounded-lg shadow-lg font-medium capitalize">
        <span className="px-2 mr-2 border-r border-gray-800">
          <img
            src="https://www.freepnglogos.com/uploads/spotify-logo-png/file-spotify-logo-png-4.png"
            alt="alt placeholder"
            className="w-8 h-8 -mt-1 inline mx-auto"
          />
        </span>
        <span className="px-2 py-1 cursor-pointer hover:bg-gray-800 hover:text-gray-300 text-sm rounded mb-5">
          <i className="w-8 fa fa-stream p-2 bg-gray-800 rounded-full"></i>
          <span className="mx-1">categories</span>
        </span>
        <span className="px-2 py-1 cursor-pointer hover:bg-gray-800 hover:text-gray-300 text-sm rounded mb-5">
          <i className="w-8 fa fa-th p-2 bg-gray-800 rounded-full"></i>
          <span className="mx-1">menu</span>
        </span>
        <span className="px-1 hover:text-white cursor-pointer">
          <i className="fa fa-search p-2 bg-gray-800 rounded-full"></i>
        </span>
        <span className="px-1 hover:text-white cursor-pointer">
          <i className="w-8 fa fa-calendar-alt p-2 bg-gray-800 rounded-full"></i>
        </span>
        <span className="px-1 hover:text-white cursor-pointer w-8 relative">
          <i className="w-8 fa fa-bell p-2 bg-gray-800 rounded-full"></i>
          <span className="absolute right-0 top-0 -mt-2 -mr-1 text-xs bg-red-500 text-white font-medium px-2 shadow-lg rounded-full">
            3
          </span>
        </span>
        <span className="hover:text-white cursor-pointer w-10 relative float-right mr-3">
          <i className="fa fa-user p-2 bg-gray-800 rounded-full"></i>
          <span className="absolute right-0 top-0 -mt-1 -mr-1 text-xs bg-yellow-500 text-black font-medium px-2 rounded-full">
            3
          </span>
        </span>
      </div>
    </div>
  );
};

export { NavBarLight, NavBarDark };
