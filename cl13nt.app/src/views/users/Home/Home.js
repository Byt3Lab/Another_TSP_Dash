import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { DashboardGrid } from "../../../components/DashboardGrid/DashboardGrid";
import { Footer } from "../../../components/Footer/Footer";

const Home = (props) => {
  return (
    <div className="w-full bg-slate-200">
      <div className="w-full p-2 flex inline-block justify-center justify-items-center pb-10">
        <Helmet>
          <title>Home | Menzen</title>
        </Helmet>
        <div className="container justify-items-center h-fit">
          <DashboardGrid
            isLoaded={props.isLoaded}
            setIsLoaded={props.setIsLoaded}
          />
        </div>
      </div>
      <div className="w-full pt-3 bg-gray-800">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
