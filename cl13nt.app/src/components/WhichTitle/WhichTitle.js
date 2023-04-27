import React from "react";
import nite from "../../4553t5/imgs/icons/nite.png";
import day from "../../4553t5/imgs/icons/day.png";
import afternoon from "../../4553t5/imgs/icons/afternoon.png";

const WhichTitle = (props) => {
  var now = new Date();
  var before = new Date().setHours(12, 0, 0, 0);
  var beforeEvening = new Date().setHours(18, 0, 0, 0);
  beforeEvening = new Date(beforeEvening);
  before = new Date(before);
  return now > before ? (
    now < beforeEvening ? (
      <div className="w-full p-2 flex items-center mb-5">
        <div className="p-2">
          <img src={afternoon} alt="Morning" width={70} height={70} />
        </div>
        <div className="p-2">
          <h1 className="text-gray-800 font-bold text-2xl mb-1">
            {" "}
            Afternoon !
          </h1>
          <p className="text-sm font-normal text-gray-600">
            Be Well ! <br />
            Hope You Spent A Good Day; See You Later ?.
          </p>
        </div>
      </div>
    ) : (
      <div className="w-full p-2 flex items-center mb-5">
        <div className="p-2">
          <img src={nite} alt="Morning" width={70} height={70} />
        </div>
        <div className="p-2">
          <h1 className="text-gray-800 font-bold text-2xl mb-1"> Evening !</h1>
          <p className="text-sm font-normal text-gray-600">
            Be Fine ! <br />
            Still Here ? Well... Hope You Reached Your Today Goals; Be Careful
            On The Way Back.
          </p>
        </div>
      </div>
    )
  ) : (
    <div className="w-full p-2 flex items-center mb-5">
      <div className="p-2">
        <img src={day} alt="Morning" width={70} height={70} />
      </div>
      <div className="p-2">
        <h1 className="text-gray-800 font-bold text-2xl mb-1">Morning !</h1>
        <p className="text-sm font-normal text-gray-600">
          Happy To See You're Here ! <br />
          Remember, Always Set Your Attendance As Soon As You Arrive.
        </p>
      </div>
    </div>
  );
};

export { WhichTitle };
