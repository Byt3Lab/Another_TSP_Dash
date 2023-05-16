import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "../Svgs/ArrowLeftIcon";

const BackArrowHeader = (props) => {
  return (
    <div className="w-full py-3 px-10 bg-gray-700 text-white fixed">
      <div className="w-full py-2 px-5 flex justify-start items-baseline">
        <Link to={"/"} className="flex justify-center items-center">
          <ArrowLeftIcon size={11} color={"gray"} />
          <b className="ml-2 text-lg">Back</b>
        </Link>
      </div>
    </div>
  );
};

export { BackArrowHeader };
