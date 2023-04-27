import React from "react";
import { CalendarIcon } from "../Svgs/CalendarIcon";
import { UserIcon } from "../Svgs/UserIcon";
import { PowerIcon } from "../Svgs/PowerIcon";

const TaskCard = (props) => {
  return (
    <div
      className="relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100"
      draggable="true"
      id={props.id}
      ref={props.provided.innerRef}
      {...props.provided.draggableProps}
      {...props.provided.dragHandleProps}
    >
      <button className="absolute top-0 right-0 flex items-center justify-center hidden w-5 h-5 mt-3 mr-2 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex">
        <svg
          className="w-4 h-4 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
        </svg>
      </button>
      <span className="flex items-center h-6 px-3 text-xs font-semibold text-yellow-500 bg-yellow-100 rounded-full">
        Copywriting
      </span>
      <h4 className="mt-3 text-sm font-medium">{props.title}</h4>
      <div className="flex items-center justify-between w-full mt-3 text-xs font-medium text-gray-400">
        <div className="flex items-center">
          <CalendarIcon size={4} />
          <span className="ml-1 leading-none">Dec 12</span>
        </div>
        <div className="relative flex items-center">
          <UserIcon size={4} />
          <span className="ml-1 leading-none">2</span>
        </div>
        <div className="flex items-center">
          <PowerIcon size={4} />
          <span className="ml-1 leading-none">admin</span>
        </div>
        <img
          className="w-6 h-6 rounded-full"
          src="https://randomuser.me/api/portraits/women/26.jpg"
          alt="User Pic"
        />
      </div>
    </div>
  );
};

export { TaskCard };
