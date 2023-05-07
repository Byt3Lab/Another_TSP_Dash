import React from "react";

const StatusAlerts = (props) => {
  if (props.status === "success") {
    return (
      <div className="flex justify-center mt-2">
        <div className="flex items-center w-1/2 px-6 py-4 text-green-700 bg-green-100 rounded">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </span>
          <p className="ml-2 text-medium">Success</p>
        </div>
      </div>
    );
  } else if (props.status == "failure") {
    return (
      <div className="flex justify-center mt-2">
        <div className="flex items-center w-1/2 px-6 py-4 text-red-700 bg-red-100 rounded">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </span>
          <p className="ml-2 text-medium">Failed</p>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export { StatusAlerts };
