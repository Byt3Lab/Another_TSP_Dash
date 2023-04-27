import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { BiggerFullScreenButton } from "./FullScreenMenuButton";
import { ChartIcon } from "../Svgs/ChartIcon";
import { MessageIcon } from "../Svgs/MessageIcon";
import { CollectionIcon } from "../Svgs/CollectionIcon";
import { UserRoundedIcon } from "../Svgs/UserRoundedIcon";
import { QuestionMarkIcon } from "../Svgs/QuestionMarkIcon";
import { BoardIcon } from "../Svgs/BoardIcon";
import { InfoIcon } from "../Svgs/InfoIcon";
import { ExitIcon } from "../Svgs/ExitIcon";
import { PencilWriteIcon } from "../Svgs/PencilWriteIcon";
import { ServerIcon } from "../Svgs/ServerIcon";
import { SpeakerIcon } from "../Svgs/SpeakerIcon";

const FullScreenMenu = (props) => {
  return props.isOpen ? (
    <div className="fixed w-full min-h-screen bg-black bg-opacity-95 top-0 z-50">
      <div className="w-max flex items-start" onClick={props.toogleFullMenu}>
        <BiggerFullScreenButton />
      </div>
      <div className="container mx-auto px-6">
        <div className="w-full p-10 mt-40 flex justify-center">
          <div className="grid grid-cols-4 gap-4 p-5 w-3/5">
            <Link to="/home">
              <div
                className="w-full bg-white p-5 inline-block rounded-lg justify-items-center"
                onClick={props.toogleFullMenu}
              >
                <center>
                  <ChartIcon size={10} />
                  <h3 className="text-lg font-bold">Home</h3>
                </center>
              </div>
            </Link>
            <Link to="/attend">
              <div
                className="w-full bg-white p-5 inline-block rounded-lg justify-items-center"
                onClick={props.toogleFullMenu}
              >
                <center>
                  <PencilWriteIcon size={10} />
                  <h3 className="text-lg font-bold">Add Presence</h3>
                </center>
              </div>
            </Link>
            <Link to="/tasks">
              <div
                className="w-full bg-white p-5 inline-block rounded-lg justify-items-center"
                onClick={props.toogleFullMenu}
              >
                <center>
                  <BoardIcon size={10} />
                  <h3 className="text-lg font-bold">Tasks</h3>
                </center>
              </div>
            </Link>
            <Link to="/messages">
              <div
                className="w-full bg-white p-5 inline-block rounded-lg justify-items-center"
                onClick={props.toogleFullMenu}
              >
                <center>
                  <MessageIcon size={10} />
                  <h3 className="text-lg font-bold">Messages</h3>
                </center>
              </div>
            </Link>
            <Link to="/profile">
              <div
                className="w-full bg-white p-5 inline-block rounded-lg justify-items-center"
                onClick={props.toogleFullMenu}
              >
                <center>
                  <UserRoundedIcon size={10} />
                  <h3 className="text-lg font-bold">Profile</h3>
                </center>
              </div>
            </Link>
            <Link to="/listings">
              <div
                className="w-full bg-white p-5 inline-block rounded-lg justify-items-center"
                onClick={props.toogleFullMenu}
              >
                <center>
                  <CollectionIcon size={10} />
                  <h3 className="text-lg font-bold">Listings</h3>
                </center>
              </div>
            </Link>
            <Link to="/shared">
              <div
                className="w-full bg-white p-5 inline-block rounded-lg justify-items-center"
                onClick={props.toogleFullMenu}
              >
                <center>
                  <ServerIcon size={10} />
                  <h3 className="text-lg font-bold">Shared Files</h3>
                </center>
              </div>
            </Link>
            <Link to="/board">
              <div
                className="w-full bg-white p-5 inline-block rounded-lg justify-items-center"
                onClick={props.toogleFullMenu}
              >
                <center>
                  <SpeakerIcon size={10} />
                  <h3 className="text-lg font-bold">Public Board</h3>
                </center>
              </div>
            </Link>
            <div className="w-full bg-emerald-600 p-5 inline-block rounded-lg justify-items-center text-white">
              <center>
                <QuestionMarkIcon size={10} />
                <h3 className="text-lg font-bold">Help</h3>
              </center>
            </div>
            <div className="w-full bg-slate-600 p-5 inline-block rounded-lg justify-items-center text-white">
              <center>
                <InfoIcon size={10} />
                <h3 className="text-lg font-bold">About Menzen</h3>
              </center>
            </div>
            <div className="w-full bg-red-500 p-5 inline-block rounded-lg justify-items-center text-white">
              <center>
                <ExitIcon size={10} />
                <h3 className="text-lg font-bold">Logout</h3>
              </center>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export { FullScreenMenu };
