import React from "react";
import { Helmet } from "react-helmet";
import { Footer } from "../../../components/Footer/Footer";
import { ListingsView } from "../../../components/ListingsView/ListingsView";

const Listings = (props) => {
  return (
    <div className="w-full bg-slate-200">
      <div className="w-full p-2 flex inline-block justify-center justify-items-center pb-10">
        <Helmet>
          <title>Listings | Menzen</title>
        </Helmet>
        <div className="container flex justify-items-center justify-center h-fit">
          <ListingsView />
        </div>
      </div>
      <div className="w-full pt-3 bg-gray-800">
        <Footer />
      </div>
    </div>
  );
};

export default Listings;
