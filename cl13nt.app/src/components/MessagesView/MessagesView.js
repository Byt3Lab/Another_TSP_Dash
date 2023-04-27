import React, { useEffect, useState } from "react";
import { CalendarIcon } from "../Svgs/CalendarIcon";
import { UserIcon } from "../Svgs/UserIcon";
import { PinIcon } from "../Svgs/PinIcon";
import { PowerIcon } from "../Svgs/PowerIcon";
import { TaskCard } from "../TaskCard/TaskCard";
import { SendIcon } from "../Svgs/SendIcon";

const MessagesView = (props) => {
  return (
    <div className="flex flex-col w-4/5 h-screen p-10 rounded-3xl text-gray-700">
      <div className="px-10 mb-7">
        <h1 className="text-4xl font-bold">Messages and Discussions</h1>
        <h4 className="text-2xl font-light text-gray-600">
          Communication is Really Important; It's Really Something.
        </h4>
      </div>
      {/* Experiment */}
      <div className="flex h-full antialiased text-gray-800">
        <div className="grid grid-cols-5 gap-1 h-full w-full justify-center">
          <div className="col-span-2 p-5 w-full h-full">
            <div className="flex items-center justify-center bg-gray-700 w-full py-6 px-4 rounded-lg">
              <div className="h-28 w-28 rounded-full border overflow-hidden">
                <img
                  src="https://i.pravatar.cc/300"
                  alt="Avatar"
                  className="h-full w-full"
                />
              </div>
              <div className="flex flex-col items-center justify-center ml-5">
                <div className="text-xl font-semibold mt-2 text-white">
                  Name Soon.
                </div>
                <div className="text-base text-gray-300">Job Title Soon</div>
              </div>
            </div>
            <div className="flex flex-col mt-8 h-1/2">
              <div className="flex flex-row items-center justify-between text-xs">
                <span className="font-bold text-base">Discussions</span>
                <span className="flex items-center justify-center bg-white text-sm text-gray-700 font-bold h-9 w-9 rounded-full">
                  4
                </span>
              </div>
              <div className="flex flex-col space-y-1 mt-4 h-full p-3 overflow-y-scroll">
                <button className="flex flex-row items-center hover:bg-white bg-gray-400 text-white hover:text-gray-700 rounded-xl py-4 px-4">
                  <div className="flex items-center justify-center h-10 w-10 bg-sky-300 text-gray-700 rounded-full">
                    F
                  </div>
                  <div className="ml-5 text-sm font-semibold">
                    Franck Something
                  </div>
                </button>
                <button className="flex flex-row items-center hover:bg-white bg-gray-400 text-white hover:text-gray-600 rounded-xl py-4 px-4">
                  <div className="flex items-center justify-center h-10 w-10 bg-sky-300 text-gray-700 rounded-full">
                    F
                  </div>
                  <div className="ml-5 text-sm font-semibold">
                    Franck Something
                  </div>
                </button>
                <button className="flex flex-row items-center hover:bg-white bg-gray-400 text-white hover:text-gray-600 rounded-xl py-4 px-4">
                  <div className="flex items-center justify-center h-10 w-10 bg-sky-300 text-gray-700 rounded-full">
                    F
                  </div>
                  <div className="ml-5 text-sm font-semibold">
                    Franck Something
                  </div>
                </button>
                <button className="flex flex-row items-center hover:bg-white bg-gray-400 text-white hover:text-gray-600 rounded-xl py-4 px-4">
                  <div className="flex items-center justify-center h-10 w-10 bg-sky-300 text-gray-700 rounded-full">
                    F
                  </div>
                  <div className="ml-5 text-sm font-semibold">
                    Franck Something
                  </div>
                </button>
                <button className="flex flex-row items-center hover:bg-white bg-gray-400 text-white hover:text-gray-600 rounded-xl py-4 px-4">
                  <div className="flex items-center justify-center h-10 w-10 bg-sky-300 text-gray-700 rounded-full">
                    F
                  </div>
                  <div className="ml-5 text-sm font-semibold">
                    Franck Something
                  </div>
                </button>
                <button className="flex flex-row items-center hover:bg-white bg-gray-400 text-white hover:text-gray-600 rounded-xl py-4 px-4">
                  <div className="flex items-center justify-center h-10 w-10 bg-sky-300 text-gray-700 rounded-full">
                    F
                  </div>
                  <div className="ml-5 text-sm font-semibold">
                    Franck Something
                  </div>
                </button>
                <button className="flex flex-row items-center hover:bg-white bg-gray-400 text-white hover:text-gray-600 rounded-xl py-4 px-4">
                  <div className="flex items-center justify-center h-10 w-10 bg-sky-300 text-gray-700 rounded-full">
                    F
                  </div>
                  <div className="ml-5 text-sm font-semibold">
                    Franck Something
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div className="col-span-3 flex flex-col flex-auto h-3/4">
            <div className="flex flex-col flex-auto rounded-2xl h-full p-4">
              <div className="flex flex-col h-full overflow-y-scroll mb-4">
                <div className="flex flex-col h-full">
                  <div className="grid grid-cols-12 gap-y-2">
                    <div className="col-start-1 col-end-8 p-3 rounded-lg">
                      <div className="flex flex-row items-center">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-sky-300 text-gray-700 flex-shrink-0">
                          A
                        </div>
                        <div className="relative ml-3 text-sm bg-sky-100 py-2 px-4 shadow rounded-xl">
                          <div>Hey How are you today?</div>
                        </div>
                      </div>
                    </div>
                    <div className="col-start-1 col-end-8 p-3 rounded-lg">
                      <div className="flex flex-row items-center">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-sky-300 text-gray-700 flex-shrink-0">
                          A
                        </div>
                        <div className="relative ml-3 text-sm bg-sky-100 py-2 px-4 shadow rounded-xl">
                          <div>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Vel ipsa commodi illum saepe numquam maxime
                            asperiores voluptate sit, minima perspiciatis.
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-start-6 col-end-13 p-3 rounded-lg">
                      <div className="flex items-center justify-start flex-row-reverse">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-emerald-300 text-gray-700 flex-shrink-0">
                          A
                        </div>
                        <div className="relative mr-3 text-sm bg-emerald-100 py-2 px-4 shadow rounded-xl">
                          <div>I'm ok what about you?</div>
                        </div>
                      </div>
                    </div>
                    <div className="col-start-6 col-end-13 p-3 rounded-lg">
                      <div className="flex items-center justify-start flex-row-reverse">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-emerald-300 text-gray-700 flex-shrink-0">
                          A
                        </div>
                        <div className="relative mr-3 text-sm bg-emerald-100 py-2 px-4 shadow rounded-xl">
                          <div>
                            Lorem ipsum dolor sit, amet consectetur adipisicing.
                            ?
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-start-1 col-end-8 p-3 rounded-lg">
                      <div className="flex flex-row items-center">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-sky-300 text-gray-700 flex-shrink-0">
                          A
                        </div>
                        <div className="relative ml-3 text-sm bg-sky-100 py-2 px-4 shadow rounded-xl">
                          <div>Lorem ipsum dolor sit amet !</div>
                        </div>
                      </div>
                    </div>
                    <div className="col-start-6 col-end-13 p-3 rounded-lg">
                      <div className="flex items-center justify-start flex-row-reverse">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-emerald-300 text-gray-700 flex-shrink-0">
                          A
                        </div>
                        <div className="relative mr-3 text-sm bg-emerald-100 py-2 px-4 shadow rounded-xl">
                          <div>
                            Lorem ipsum dolor sit, amet consectetur adipisicing.
                            ?
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-start-1 col-end-8 p-3 rounded-lg">
                      <div className="flex flex-row items-center">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-sky-300 text-gray-700 flex-shrink-0">
                          A
                        </div>
                        <div className="relative ml-3 text-sm bg-sky-100 py-2 px-4 shadow rounded-xl">
                          <div>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Perspiciatis, in.
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-start-6 col-end-13 p-3 rounded-lg">
                      <div className="flex items-center justify-start flex-row-reverse">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-emerald-300 text-gray-700 flex-shrink-0">
                          A
                        </div>
                        <div className="relative mr-3 text-sm bg-emerald-100 py-2 px-4 shadow rounded-xl">
                          <div>
                            Lorem ipsum dolor sit, amet consectetur adipisicing.
                            ?
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-start-1 col-end-8 p-3 rounded-lg">
                      <div className="flex flex-row items-center">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-sky-300 text-gray-700 flex-shrink-0">
                          A
                        </div>
                        <div className="relative ml-3 text-sm bg-sky-100 py-2 px-4 shadow rounded-xl">
                          <div>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Perspiciatis, in.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-center h-24 rounded-xl bg-white w-full px-4">
                <div className="bg-gray-700 text-white p-3 rounded-full hover:bg-gray-500">
                  <button className="flex items-center justify-center">
                    <PinIcon size={5} />
                  </button>
                </div>
                <div className="flex-grow ml-4">
                  <div className="relative w-full">
                    <textarea className="flex w-full border rounded-xl focus:outline-none px-2 py-1 h-14" />
                  </div>
                </div>
                <div className="ml-4">
                  <button className="flex items-center justify-center bg-gray-700 rounded-xl text-white hover:bg-gray-500 px-6 py-3 flex-shrink-0">
                    <span>Send</span>
                    <span className="ml-2">
                      <SendIcon size={5} />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { MessagesView };
