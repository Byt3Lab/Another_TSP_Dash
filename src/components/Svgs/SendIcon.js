import React from "react";

const SendIcon = (props) => {
  return (
    <svg
      className={`h-${props.size} w-${props.size} text-${props.color}-400 transform rotate-45`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
      ></path>
    </svg>
  );
};

export { SendIcon };
