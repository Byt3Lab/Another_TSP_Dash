import React from "react";

const SideUserCard = (props) => {
  const [isMenuShowed, setIsMenuShowed] = React.useState(false);
  return (
    <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-slate-500 dark:border-gray-700">
      <div className="flex flex-col items-center py-6">
        <img
          className="mb-3 w-28 h-28 rounded-full"
          src="https://i.pravatar.cc/300"
          alt="Profile Pic"
        />
        <h5 className="mb-1 text-lg font-semibold dark:text-white">
          Test User
        </h5>
        <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full">
          role
        </span>
      </div>
    </div>
  );
};

export { SideUserCard };
