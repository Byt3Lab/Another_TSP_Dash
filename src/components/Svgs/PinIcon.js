import React from "react";
const PinIcon = (props) => {
  return (
    <svg
      className={`h-${props.size} w-${props.size} text-${props.color}-400`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
      ></path>
    </svg>
  );
};

export { PinIcon };
