import React from "react";
import { Helmet } from "react-helmet";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import empty from "../../../4553t5/imgs/empty_bottles.gif";

const NotFound = () => {
  return (
    <div className="w-full">
      <Helmet>
        <title>404 - Not Found | LKT Location</title>
      </Helmet>
      <main>
        <div className="h-screen w-screen bg-slate-200 flex items-center">
          <div className="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
            <div className="max-w-md">
              <h1 className="text-9xl font-dark font-bold">404</h1>
              <p className="text-2xl md:text-3xl font-light leading-normal">
                Ressource not found.
              </p>
              <p className="mb-8 text-lg">Mistyped the URL maybe ?</p>

              <Link to="/">
                <button className="px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-emerald-400 active:bg-emerald-600 hover:bg-emerald-500">
                  Go back home
                </button>
              </Link>
            </div>
            <div className="max-w-lg">
              <img src={empty} alt="Empty Bottles" className="" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
