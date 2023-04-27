import React from "react";
import { Helmet } from "react-helmet";
import { Footer } from "../../../components/Footer/Footer";
import { AttendanceForm } from "../../../components/AttendanceForm/AttendanceForm";

const AddAttendance = () => {
  return (
    <div className="w-full bg-slate-200">
      <div className="w-full p-2 flex inline-block justify-center justify-items-center pb-10">
        <Helmet>
          <title>Add Attendance | Menzen</title>
        </Helmet>
        <div className="container justify-items-center h-fit">
          <AttendanceForm />
        </div>
      </div>
      <div className="w-full pt-3 bg-gray-800">
        <Footer />
      </div>
    </div>
  );
};

export default AddAttendance;
