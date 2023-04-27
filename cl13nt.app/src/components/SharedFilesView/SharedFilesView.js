import React from "react";
import { HomeIcon } from "../Svgs/HomeIcon";
import { SearchIcon } from "../Svgs/SearchIcon";
import { DeleteIcon } from "../Svgs/DeleteIcon";
import { DownloadIcon } from "../Svgs/DownloadIcon";
import { UploadIcon } from "../Svgs/UploadIcon";

const SharedFilesView = (props) => {
  return (
    <div className="flex flex-col w-4/5 h-screen p-10 rounded-3xl text-gray-700">
      <div className="px-10 mb-7 flex justify-between w-full items-center">
        <div>
          <h1 className="text-4xl font-bold">Enterprise Shared Files.</h1>
          <h4 className="text-2xl font-light text-gray-600">
            Files Publicly Posted by Your Peers.
          </h4>
        </div>
        <div>
          <button className="flex justify-around items-center px-6 py-3 w-max bg-emerald-400 hover:bg-emerald-500 text-white text-2xl font-bold rounded-3xl">
            <UploadIcon size={6} />
            &nbsp;&nbsp;Add File
          </button>
        </div>
      </div>
      <div className="w-full px-10 py-5">
        <div className="w-full p-5 flex flex-col space-y-2">
          <div className="w-full flex justify-around items-center py-4 bg-gray-700 rounded-2xl">
            <div className="flex items-center w-max text-xl font-bold text-white">
              <HomeIcon size={6} />
              &nbsp;/ public
            </div>
            <div className="w-1/2 flex justify-center">
              <div className="w-max p-3 flex justify-center items-center bg-white text-gray-700 rounded-l-xl">
                <SearchIcon size={5} />
              </div>
              <input
                type="text"
                className="w-full p-2 text-xl font-medium bg-white text-gray-700 rounded-r-xl focus:outline-none focus:border-none focus:ring-0"
                placeholder="Search..."
              />
            </div>
          </div>
          <div className="w-full flex justify-around items-center py-4 bg-gray-700 rounded-2xl">
            <div className="flex items-center w-max text-3xl font-bold text-white">
              <h1>
                <b className="text-emerald-400">0</b> File[s]
              </h1>
            </div>
            <div className="flex items-center w-max text-3xl font-bold text-white">
              <h1>
                <b className="text-emerald-400">0</b> Folders
              </h1>
            </div>
            <div className="flex items-center w-max text-3xl font-bold text-white">
              <h1>
                <b className="text-emerald-400">0</b> GB
              </h1>
            </div>
          </div>
          <div className="w-full flex justify-center py-3 bg-gray-700 rounded-2xl max-h-96 overflow-y-scroll">
            <table className="w-full text-center rounded-2xl">
              <thead className="bg-gray-700 text-xl font-bold">
                <tr>
                  <th scope="col" className="text-white px-6 py-4">
                    File
                  </th>
                  <th scope="col" className="text-white px-6 py-4">
                    Size
                  </th>
                  <th scope="col" className="text-white px-6 py-4">
                    Date
                  </th>
                  <th scope="col" className="text-white px-6 py-4">
                    Publisher
                  </th>
                  <th scope="col" className="text-white px-6 py-4">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-slate-500 whitespace-nowrap text-lg font-medium text-white hover:bg-white hover:text-gray-700">
                  <td className="px-3 py-2">file.txt</td>
                  <td className="px-3 py-2">file.txt</td>
                  <td className="px-3 py-2">file.txt</td>
                  <td className="px-3 py-2">file.txt</td>
                  <td className="p-2 flex justify-around">
                    <button className="p-3 bg-sky-400 hover:bg-sky-500 hover:text-gray-700 text-white rounded-xl">
                      <DownloadIcon size={5} />
                    </button>
                    <button className="p-3 bg-orange-400 hover:bg-orange-500 hover:text-gray-700 text-white rounded-xl">
                      <DeleteIcon size={5} />
                    </button>
                  </td>
                </tr>
                <tr className="bg-slate-500 whitespace-nowrap text-lg font-medium text-white hover:bg-white hover:text-gray-700">
                  <td className="px-3 py-2">file.txt</td>
                  <td className="px-3 py-2">file.txt</td>
                  <td className="px-3 py-2">file.txt</td>
                  <td className="px-3 py-2">file.txt</td>
                  <td className="p-2 flex justify-around">
                    <button className="p-3 bg-sky-400 hover:bg-sky-500 hover:text-gray-700 text-white rounded-xl">
                      <DownloadIcon size={5} />
                    </button>
                    <button className="p-3 bg-orange-400 hover:bg-orange-500 hover:text-gray-700 text-white rounded-xl">
                      <DeleteIcon size={5} />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export { SharedFilesView };
