import React from "react";

const OMenu = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`w-${props.size} h-${props.size} text-${props.color}-400`}
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

export { OMenu };
