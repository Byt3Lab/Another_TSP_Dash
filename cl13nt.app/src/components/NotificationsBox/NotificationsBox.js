import React from "react";
import { EmptyBox } from "../Svgs/EmptyBox";

const NotificationsBox = (props) => {
  return props.isNotification ? null : (
    <div className="w-full p-10 flex-col">
      <center>
        <EmptyBox size={10} />
      </center>
      <br />
      <span className="text-white font-bold text-xl">
        No notifications for now.
      </span>
    </div>
  );
};

export { NotificationsBox };
