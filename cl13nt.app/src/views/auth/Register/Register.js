import React, { useState, useRef } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { UserIcon } from "../../../components/Svgs/UserIcon";
import { PadLockIcon } from "../../../components/Svgs/PadLockIcon";
import { ArobaseIcon } from "../../../components/Svgs/ArobaseIcon";
import { PhoneIcon } from "../../../components/Svgs/PhoneIcon";
import { CameraIcon } from "../../../components/Svgs/CameraIcon";
import { AnimatedLoading } from "../../../components/Svgs/AnimatedLoading";
import { TickIcon } from "../../../components/Svgs/TickIcon";
import { TimesIcon } from "../../../components/Svgs/TimesIcon";
import { CalendarIcon } from "../../../components/Svgs/CalendarIcon";
import { ClockIcon } from "../../../components/Svgs/ClockIcon";
import { DollarIcon } from "../../../components/Svgs/DollarIcon";
import { GenderIcon } from "../../../components/Svgs/GenderIcon";
import { CompanyIcon } from "../../../components/Svgs/CompanyIcon";
import { BriefCaseIcon } from "../../../components/Svgs/BriefCaseIcon";
import { PictureIcon } from "../../../components/Svgs/PictureIcon";
import { BackArrowHeader } from "../../../components/BackArrowHeader/BackArrowHeader";
import { Footer } from "../../../components/Footer";

const Register = () => {
  const navigate = useNavigate();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authOK, setAuthOK] = useState(false);
  const [authFail, setAuthFail] = useState(false);
  const [name, setName] = useState("");
  const [forename, setForename] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [workAt, setWorkAt] = useState("");
  const [mail, setMail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [salary, setSalary] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [profilePicPreview, setProfilePicPreview] = useState("");
  const fileInput = useRef(null);

  const handleClick = () => {
    fileInput.current.click();
  };
  const handleFileChange = (event) => {
    const fileObj = event.target.files[0];
    if (!fileObj) {
      return;
    } else {
      setProfilePic(fileObj.name);
      var reader = new FileReader();
      reader.onload = function () {
        setProfilePicPreview(reader.result);
      };
      reader.readAsDataURL(event.target.files[0]);
      console.log(profilePicPreview);
    }
  };

  const Gather = (event) => {
    event.preventDefault();
    setIsAuthenticating(true);
    /* RegisterFunct(name, forename, phone, mail, password).then((response) => {
      setIsAuthenticating(false);
      if (response.success === false) {
        setAuthFail(true);
        setTimeout(() => {
          setAuthFail(false);
        }, 3000);
      } else if (response.success === true) {
        setAuthOK(true);
        setTimeout(() => {
          setAuthOK(false);
          navigate("/login");
        }, 2000);
      }
    }); */
  };

  return (
    <div className="w-full">
      <Helmet>
        <title>Register | Menzen</title>
      </Helmet>
      <BackArrowHeader />
      <div className="h-screen w-full flex justify-center">
        <div className="flex w-2/5 justify-center py-10 items-center bg-white">
          <form className="w-full p-10" onSubmit={Gather}>
            <h1 className="text-gray-800 font-bold text-3xl mb-1">
              Hello Admin !
            </h1>
            <p className="text-base font-normal text-gray-600 mb-7">
              Wanna Register Someone ?
            </p>
            {/* First Row */}
            <div className="w-full flex mb-4 p-1 items-center">
              <div className="flex items-center border-2 border-gray-700 py-2 px-3 rounded-2xl w-full">
                <UserIcon size={5} color={"black"} />
                &nbsp;
                <input
                  className="pl-4 outline-none border-none w-full bg-transparent text-gray-700 font-bold"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <div className="flex items-center border-2 border-gray-700 py-2 px-3 rounded-2xl w-full">
                <UserIcon size={5} color={"black"} />
                &nbsp;
                <input
                  className="pl-2 outline-none border-none w-full bg-transparent text-gray-700 font-bold"
                  type="text"
                  name="forename"
                  id="forename"
                  placeholder="Forename"
                  required
                  onChange={(e) => setForename(e.target.value)}
                />
              </div>
            </div>
            {/* Second Row */}
            <div className="w-full flex mb-4 p-1 items-center">
              <div className="flex items-center border-2 border-gray-700 py-2 px-3 rounded-2xl w-full">
                <CalendarIcon size={5} color={"black"} />
                &nbsp;
                <input
                  className="pl-2 outline-none border-none w-full bg-transparent text-gray-700 font-bold"
                  type="date"
                  name="birthDate"
                  id="birthDate"
                  placeholder="Birth Date"
                  required
                  onChange={(e) => setBirthDate(e.target.value)}
                />
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <div className="flex items-center border-2 border-gray-700 py-2 px-3 rounded-2xl w-full">
                <GenderIcon size={5} color={"black"} />
                &nbsp;
                <select
                  name="gender"
                  id="gender"
                  required
                  onChange={(e) => setGender(e.target.value)}
                  className="pl-2 outline-none border-none w-full bg-transparent text-gray-700 font-bold"
                >
                  <optgroup label="- Gender -">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </optgroup>
                </select>
              </div>
            </div>
            {/* Third Row */}
            <div className="w-full flex mb-4 p-1 items-center">
              <div className="flex items-center border-2 border-gray-700 py-2 px-3 rounded-2xl w-full h-56">
                <div className="w-full h-full bg-gray-700 rounded-xl">
                  {profilePic !== "" ? (
                    <div className="w-full h-full flex flex-col justify-center items-center hover:bg-gray-500 rounded-xl">
                      <img
                        src={profilePicPreview}
                        alt="Employee Pic Here"
                        title="Employee Pic Here"
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>
                  ) : (
                    <div
                      className="w-full h-full p-2 flex flex-col justify-center items-center hover:bg-gray-500 rounded-xl"
                      onClick={() => {
                        handleClick();
                      }}
                    >
                      <PictureIcon size={10} color={"gray"} />
                      <b className="text-white">(Optional)</b>
                      <input
                        type={"file"}
                        onChange={(e) => handleFileChange(e)}
                        ref={fileInput}
                        accept="image/*"
                        className="w-full hidden"
                        id="profilePicPick"
                        name="profilePicPick"
                      />
                    </div>
                  )}
                </div>
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <div className="flex flex-col items-center justify-around py-2 px-3 rounded-2xl w-full h-56">
                <div className="flex items-center border-2 border-gray-700 py-2 px-3 rounded-2xl w-full">
                  <CompanyIcon size={5} color={"black"} />
                  &nbsp;
                  <input
                    className="pl-2 outline-none border-none w-full bg-transparent text-gray-700 font-bold"
                    type="text"
                    name="workAt"
                    id="workAt"
                    placeholder="Work At ?"
                    required
                    onChange={(e) => setWorkAt(e.target.value)}
                  />
                </div>
                <div className="flex items-center border-2 border-gray-700 py-2 px-3 rounded-2xl w-full">
                  <BriefCaseIcon size={5} color={"black"} />
                  &nbsp;
                  <select
                    name="jobTitle"
                    id="jobTitle"
                    required
                    onChange={(e) => setJobRole(e.target.value)}
                    className="pl-2 outline-none border-none w-full bg-transparent text-gray-700 font-bold"
                  >
                    <optgroup label="- Job Title -">
                      <option value="marketer">MARKETER</option>
                      <option value="developer">DEVELOPER</option>
                      <option value="trader">TRADER</option>
                      <option value="graphics">GRAPHICS</option>
                      <option value="community_manager">
                        COMMUNITY MANAGER
                      </option>
                    </optgroup>
                  </select>
                </div>
              </div>
            </div>
            {/* Fourth Row */}
            <div className="w-full flex mb-4 p-1 items-center">
              <div className="flex items-center border-2 border-gray-700 py-2 px-3 rounded-2xl w-full">
                <ArobaseIcon size={5} color={"black"} />
                &nbsp;
                <input
                  className="pl-2 outline-none border-none w-full bg-transparent text-gray-700 font-bold"
                  type="email"
                  name="mailAddress"
                  id="mailAddress"
                  placeholder="Mail Address"
                  required
                  onChange={(e) => setMail(e.target.value)}
                />
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <div className="flex items-center border-2 py-2 px-3 border-gray-700 rounded-2xl w-full">
                <PhoneIcon size={5} color={"black"} />
                &nbsp;
                <input
                  className="pl-2 outline-none border-none w-full bg-transparent text-gray-700 font-bold"
                  type="tel"
                  name="phoneNumber"
                  id="phoneNumber"
                  placeholder="Phone Number (XXX-XXX-XXX)"
                  required
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </div>
            {/* Fifth Row */}
            <div className="w-full flex mb-4 p-1 items-center">
              <div className="flex items-center border-2 border-gray-700 py-2 px-3 rounded-2xl w-full">
                <PadLockIcon size={5} color={"black"} />
                &nbsp;
                <input
                  className="pl-2 outline-none border-none w-full bg-transparent text-gray-700 font-bold"
                  type="password"
                  name="pwd"
                  id="pwd"
                  placeholder="Password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <div className="flex items-center border-2 py-2 px-3 border-gray-700 rounded-2xl w-full">
                <DollarIcon size={5} color={"black"} />
                &nbsp;
                <input
                  className="pl-2 outline-none border-none w-full bg-transparent text-gray-700 font-bold"
                  type="number"
                  name="salaryAmount"
                  id="salaryAmount"
                  placeholder="Salary Amount"
                  required
                  onChange={(e) => setSalary(e.target.value)}
                />
              </div>
            </div>
            {!isAuthenticating && !authOK && !authFail ? (
              <button
                type="submit"
                className="block w-full bg-emerald-400 mt-4 py-2 rounded-2xl text-white font-semibold mb-2 h-11"
              >
                Continue
              </button>
            ) : null}
            {isAuthenticating ? (
              <button
                disabled={true}
                className="w-full bg-sky-500 mt-4 py-2 rounded-2xl text-white font-semibold mb-2 flex items-center justify-center h-11"
              >
                <AnimatedLoading size={6} />
              </button>
            ) : null}
            {!isAuthenticating && authOK && !authFail ? (
              <button
                disabled={true}
                className="w-full bg-emerald-400 mt-4 py-2 rounded-2xl text-white font-semibold mb-2 flex items-center justify-center h-11"
              >
                <TickIcon size={8} color={"white"} />
              </button>
            ) : null}
            {!isAuthenticating && authFail && !authOK ? (
              <button
                disabled={true}
                className="w-full bg-red-500 mt-4 py-2 rounded-2xl text-white font-semibold mb-2 flex items-center justify-center h-11"
              >
                <TimesIcon size={8} color={"white"} />
              </button>
            ) : null}
          </form>
        </div>
      </div>
      <div className="w-full pt-3 bg-gray-800">
        <Footer />
      </div>
    </div>
  );
};

export default Register;
