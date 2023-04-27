import React from "react";

const FullScreenMenuButton = (props) => {
  return (
    <div
      className="px-2 py-2 relative cursor-pointer hover:bg-gray-500 hover:text-white rounded-xl flex inline-flex items-center"
      onClick={props.toogleFullMenu}
    >
      {props.isOpen ? <CMenu /> : <OMenu />}
      <h2 className="mx-1 text-base">Menu</h2>
    </div>
  );
};

const BiggerFullScreenButton = (props) => {
  return (
    <div className="cursor-pointer hover:bg-white hover:text-black text-white rounded-xl flex inline-flex items-center p-5">
      {props.isOpen ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10"
          fill="currentcolor"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      )}
    </div>
  );
};

const OMenu = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );
};

const CMenu = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      fill="currentcolor"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
};

export { FullScreenMenuButton, BiggerFullScreenButton };
