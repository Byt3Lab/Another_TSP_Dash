import React, {useState} from "react";
import {CalendarIcon} from "../Svgs/CalendarIcon";
import DatePicker from "react-date-picker";
import {ListingIcon} from "../Svgs/ListingIcon";
import {EmptyBox} from "../Svgs/EmptyBox";

const PublicBoardView = (props) => {
  const [dateValue, setDateValue] = useState([
    new Date(),
    new Date(),
  ]);
  const [isData, setIsData] = useState(true);
  return (
    <div className="flex flex-col w-4/5 h-max p-10 rounded-3xl text-gray-700">
      <div className="px-10 mb-7 justify-between w-full items-center">
        <h1 className="text-4xl font-bold">The [Virtual] Public Board.</h1>
        <h4 className="text-2xl font-light text-gray-600">
          Announcements, Notices and Relevant Information Here.
        </h4>
      </div>
        <div className="w-full px-10 py-5">
          <div className="w-full bg-gray-700 py-3 px-6 flex items-center justify-center rounded-2xl">
          <div className="w-max flex flex-col justify-start">
            <div className="flex items-center text-white mb-2">
              <CalendarIcon size={7} />
              <h2 className="text-xl font-bold ml-2">Pick another Day ?</h2>
            </div>
            <DatePicker
              onChange={setDateValue}
              value={dateValue}
              maxDate={new Date() }
              calendarAriaLabel={"Toggle Calendar"}
              showLeadingZeros={true}
              className="bg-white w-max px-5 py-3 rounded-2xl flex justify-between"
            />
          </div>
        </div>
          {
            isData ? (<div className="w-full bg-gray-700 py-6 px-10 grid grid-cols-3 grid-flow-row rounded-2xl mt-3">
              <div className={"w-full bg-yellow-300 p-5 -rotate-3 h-80 shadow-2xl"}>
                <h2 className={"text-2xl font-bold text-center"} style={{
                  fontFamily: "Shadows Into Light, Arial"
                }}>Note Title</h2>
                <br/>
                <p className={"text-lg font-medium text-justify"} style={{
                  fontFamily: "Shadows Into Light, Arial"
                }}>Lorem Ipsum Sin dolor Amet. Lorem Ipsum Sin dolor Amet. Lorem Ipsum Sin dolor Amet. Lorem Ipsum Sin dolor Amet.</p>
              </div>
          </div>) : (<div className="w-full bg-gray-700 py-6 px-10 flex rounded-2xl mt-3">
              <div className="w-full p-10 flex items-center justify-center">
                <div className="w-1/2 flex flex-col p-6 rounded-2xl bg-gray-700 justify-center items-center text-white">
                  <EmptyBox size={14}/>
                  <h2 className="text-2xl font-bold">Nothing to Show.</h2>
                </div>
              </div>
            </div>)
          }
        </div>
    </div>
  );
};

export { PublicBoardView };
