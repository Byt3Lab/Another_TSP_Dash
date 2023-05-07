import React from "react";

const CMenu = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`h-${props.size} w-${props.size} text-${props.color}-400`}
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

export { CMenu };
