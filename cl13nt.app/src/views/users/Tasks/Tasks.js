import React from "react";
import { Helmet } from "react-helmet";
import { Footer } from "../../../components/Footer/Footer";
import { TasksViews } from "../../../components/TasksViews/TasksViews";

const Tasks = (props) => {
  return (
    <div className="w-full bg-slate-200">
      <div className="w-full p-2 flex inline-block justify-center justify-items-center pb-10">
        <Helmet>
          <title>Tasks | Menzen</title>
        </Helmet>
        <div className="container justify-items-center h-fit">
          <TasksViews
            isLoaded={props.isLoaded}
            setIsLoaded={props.setIsLoaded}
          />
        </div>
      </div>
      <div className="w-full pt-3 bg-gray-800">
        <Footer />
      </div>
    </div>
  );
};

export default Tasks;
