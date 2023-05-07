import React from "react";
import { DollarIcon } from "../Svgs/DollarIcon";
import { RentIcon } from "../Svgs/RentIcon";
import { StarIcon } from "../Svgs/StarIcon";
import { PaymentIcon } from "../Svgs/PaymentIcon";

const ProfileMenu = (props) => {
  const [openTab, setOpenTab] = React.useState(1);
  return (
    <div className="w-full p-5 bg-white rounded-lg">
      <div className="flex flex-wrap">
        <div className="w-full flex">
          <div className="w-1/6">
            <ul className="flex list-none flex-wrap flex-col" role="tablist">
              <li className="mb-2 mr-2 flex-auto text-center">
                <a
                  className={
                    "text-xs font-bold px-5 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === 1
                      ? "text-white bg-emerald-400"
                      : "text-white bg-slate-500")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(1);
                  }}
                  data-toggle="tab"
                  href="#link1"
                  role="tablist"
                >
                  <div className="w-full flex items-center justify-center">
                    <DollarIcon size={6} color={"white"} />
                    &nbsp;&nbsp;
                    <h2 className="text-base">Rents</h2>
                  </div>
                </a>
              </li>
              <li className="mb-2 mr-2 flex-auto text-center">
                <a
                  className={
                    "text-xs font-bold px-5 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === 2
                      ? "text-white bg-emerald-400"
                      : "text-white bg-slate-500")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(2);
                  }}
                  data-toggle="tab"
                  href="#link2"
                  role="tablist"
                >
                  <div className="w-full flex items-center justify-center">
                    <RentIcon size={6} color={"white"} />
                    &nbsp;&nbsp;
                    <h2 className="text-base">Properties</h2>
                  </div>
                </a>
              </li>
              <li className="mb-2 mr-2 flex-auto text-center">
                <a
                  className={
                    "text-xs font-bold px-5 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === 3
                      ? "text-white bg-emerald-400"
                      : "text-white bg-slate-500")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(3);
                  }}
                  data-toggle="tab"
                  href="#link3"
                  role="tablist"
                >
                  <div className="w-full flex items-center justify-center">
                    <StarIcon size={6} color={"white"} />
                    &nbsp;&nbsp;
                    <h2 className="text-base">Starred</h2>
                  </div>
                </a>
              </li>
              <li className="mb-2 mr-2 flex-auto text-center">
                <a
                  className={
                    "text-xs font-bold px-5 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === 4
                      ? "text-white bg-emerald-400"
                      : "text-white bg-slate-500")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(4);
                  }}
                  data-toggle="tab"
                  href="#link4"
                  role="tablist"
                >
                  <div className="w-full flex items-center justify-center">
                    <PaymentIcon size={6} color={"white"} />
                    &nbsp;&nbsp;
                    <h2 className="text-base">Payments</h2>
                  </div>
                </a>
              </li>
            </ul>
          </div>
          <div className="relative flex flex-col break-words bg-white w-full rounded">
            <div className="px-5 py-2 flex-auto">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                  <p>Rents</p>
                </div>
                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                  <p>Properties</p>
                </div>
                <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                  <p>Starred</p>
                </div>
                <div className={openTab === 4 ? "block" : "hidden"} id="link4">
                  <p>Payments</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ProfileMenu };
