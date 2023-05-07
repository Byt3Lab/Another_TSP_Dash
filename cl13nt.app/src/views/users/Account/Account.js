import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Footer } from "../../../components/Footer";
import { AccountSettingsGrid } from "../../../components/AccountSettingsGrid/AccountSettingsGrid";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Overlay } from "../../../components/LoadingOverlay";

const Account = () => {
  return (
    <div className="w-full py-0 px-0 bg-slate-200">
      <Helmet>
        <title>Account Settings | Menzen</title>
      </Helmet>
      {<Overlay />}
      <div className="w-full py-5" />
      <main className="my-8">
        <div className="container mx-auto px-6">
          <div className="inline-block border-l-8 border-l-black pl-14">
            <h2 className="text-5xl font-bold">Account</h2>
            <h4 className="text-2xl">
              <b className="font-semibold">XXX</b> with mail adress :
              <b className="font-semibold"> mail@mail.com </b>·
              <Link to="/profile">
                <span className="bg-gray-800 text-white p-2 ml-2">
                  <i className="ml-2 fa fa-arrow-right"></i>
                  <b className="font-semibold"> Your Profile </b>
                </span>
              </Link>
            </h4>
          </div>
          <div className="w-full p-10 mt-14">
            <AccountSettingsGrid />
          </div>
        </div>
      </main>
      <div className="w-full pt-3 bg-gray-800">
        <Footer />
      </div>
    </div>
  );
};

export default Account;
