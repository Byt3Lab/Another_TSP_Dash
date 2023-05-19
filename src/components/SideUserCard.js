import React from "react";
import { Avatar } from "@mui/material";

const SideUserCard = (props) => {
  const [isMenuShowed, setIsMenuShowed] = React.useState(false);
  return (
    <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-slate-500 dark:border-gray-700">
      <div className="flex flex-col items-center py-6">
        <Avatar
          alt="Supposely a profile picture"
          sx={{ mb: "0.75rem", width: "7rem", height: "7rem" }}
        />
        <h5 className="mb-1 text-lg font-semibold dark:text-white">
          TEST USER
        </h5>
        <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full">
          administateur
        </span>
      </div>
    </div>
  );
};

export { SideUserCard };
