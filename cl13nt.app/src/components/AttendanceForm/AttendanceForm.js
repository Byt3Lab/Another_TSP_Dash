import React, { useState } from "react";
import { WhichForm } from "../WhichForm/WhichForm";
import { WhichTitle } from "../WhichTitle/WhichTitle";

const AttendanceForm = () => {
  return (
    <div className="w-full flex items-center justify-center p-5">
      <div className="w-3/5 p-10">
        <WhichTitle />
        <WhichForm />
      </div>
    </div>
  );
};

export { AttendanceForm };
