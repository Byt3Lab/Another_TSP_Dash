import React, { useState } from "react";
import moment from "moment";
import { Helmet } from "react-helmet";
import {Navigate, useNavigate} from "react-router-dom";
import { PadLockIcon } from "../../../components/Svgs/PadLockIcon";
import { ArobaseIcon } from "../../../components/Svgs/ArobaseIcon";
import { CameraIcon } from "../../../components/Svgs/CameraIcon";
import { AnimatedLoading } from "../../../components/Svgs/AnimatedLoading";
import { TickIcon } from "../../../components/Svgs/TickIcon";
import { TimesIcon } from "../../../components/Svgs/TimesIcon";
import { LoginService } from "../../../services/Login.Service.ts";

const Login = () => {
  const navigate = useNavigate();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authOK, setAuthOK] = useState(false);
  const [authFail, setAuthFail] = useState(false);
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const Gather = (event) => {
    event.preventDefault();
    setIsAuthenticating(true);
    const data = {
      mail: mail,
      pwd: password,
    };
    LoginService(data).then((response) => {
      setIsAuthenticating(false);
      if (response.auth) {
        setAuthOK(true);
        let now = moment();
        now.month(now.month() + 1);
        // document.cookie =
        //   "authToken=" +
        //   response.token +
        //   "; path=/; Secure; SameSite=Strict; httpOnly; expires=" +
        //   now.utc();
        document.cookie =
          "authState=" +
          response.auth +
          "; path=/; Secure; SameSite=None; expires=" +
          now.toDate();
        setTimeout(() => {
          setAuthOK(false);
          window.location.href = "http://localhost:5000/home"
        }, 3000);
      } else {
        setAuthFail(true);
        setTimeout(() => {
          setAuthFail(false);
        }, 3000);
      }
    });
  };

  return (
    <div className="w-full">
      <Helmet>
        <title>Login | Menzen</title>
      </Helmet>
      <div className="h-screen flex justify-center">
        <div className="flex w-1/2 justify-center items-center bg-white">
          <form className="bg-white w-1/2" onSubmit={Gather}>
            <div className="w-full bg-black"></div>
            <h1 className="text-gray-800 font-bold text-3xl mb-1">
              Welcome Back !
            </h1>
            <p className="text-base font-normal text-gray-600 mb-7">
              Happy To See You Again.
            </p>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <ArobaseIcon size={5} color={"gray"} />
              <input
                className="pl-2 outline-none border-none w-full"
                type="email"
                name="mail"
                required
                id="mail"
                placeholder="Email Address"
                onChange={(e) => setMail(e.target.value)}
              />
            </div>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
              <PadLockIcon size={5} color={"gray"} />
              <input
                className="pl-2 outline-none border-none w-full"
                type="password"
                name="password"
                required
                id="passwd"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {!isAuthenticating && !authOK && !authFail ? (
              <button
                type="submit"
                className="block w-full bg-emerald-400 mt-4 py-2 rounded-2xl text-white font-semibold mb-2 h-11"
              >
                Login
              </button>
            ) : null}
            {isAuthenticating ? (
              <button
                disabled={true}
                className="w-full bg-emerald-400 mt-4 py-2 rounded-2xl text-white font-semibold mb-2 flex items-center justify-center h-11"
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
            <br />
            <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">
              Forgot Your Password ?
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
