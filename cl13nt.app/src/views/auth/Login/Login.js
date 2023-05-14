import { useEffect, useState } from "react";
import moment from "moment";
import fernet from "fernet";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { PadLockIcon } from "../../../components/Svgs/PadLockIcon";
import { ArobaseIcon } from "../../../components/Svgs/ArobaseIcon";
import { AnimatedLoading } from "../../../components/Svgs/AnimatedLoading";
import { TickIcon } from "../../../components/Svgs/TickIcon";
import { TimesIcon } from "../../../components/Svgs/TimesIcon";
import { LoginService } from "../../../services/Login.Service.ts";

const encryptPassword = async (password) => {
  try {
    var token = new fernet.Token({
      secret: new fernet.Secret(process.env.REACT_APP_CRYPTKEY),
      ttl: 0,
    });
    const encPwd = token.encode(password);
    // console.log("ENCRYPTED PWD", encPwd, " FROM ", password);
    // );
    return encPwd;
  } catch (error) {
    return "";
  }
};

const Login = () => {
  const navigate = useNavigate();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authOK, setAuthOK] = useState(false);
  const [authFail, setAuthFail] = useState(false);
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // clean cookies
    document.cookie =
      "authState=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    document.cookie =
      "authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  }, []);

  const Gather = async (event) => {
    event.preventDefault();
    setIsAuthenticating(true);
    const encPwd = await encryptPassword(password);
    const data = {
      authData: {
        mail: mail,
        password: encPwd,
      },
    };
    LoginService(data).then((response) => {
      setIsAuthenticating(false);
      if (response.data && response.data.auth && response.data.uid) {
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
          response.data.auth +
          "; path=/; Secure; SameSite=None; expires=" +
          now.toDate();
        setTimeout(() => {
          setAuthOK(false);
          window.location.href = `/home`;
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
        <title>Connexion | TS+ Dashboard</title>
      </Helmet>
      <div className="h-screen flex justify-center">
        <div className="flex w-1/2 justify-center items-center bg-white">
          <form className="bg-white w-1/2" onSubmit={Gather}>
            <div className="w-full flex justify-between items-center">
              <div className="w-100 h-100">
                <h1 className="text-gray-800 font-bold text-3xl mb-1">
                  Bienvenu(e) !
                </h1>
                <p className="text-base font-normal text-gray-600">
                  Content de vous revoir.
                </p>
              </div>
              <div className="w-100 h-100">
                <img src="logo.svg" alt="TSP Logo" className="w-32 h-32" />
              </div>
            </div>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <ArobaseIcon size={5} color={"gray"} />
              <input
                className="pl-2 outline-none border-none w-full"
                type="email"
                name="mail"
                required
                id="mail"
                placeholder="Adresse mail"
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
                placeholder="Mot de passe"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {!isAuthenticating && !authOK && !authFail ? (
              <button
                type="submit"
                className="block w-full bg-primary mt-4 py-2 rounded-2xl text-white font-semibold mb-2 h-11"
              >
                Connexion
              </button>
            ) : null}
            {isAuthenticating ? (
              <button
                disabled={true}
                className="w-full bg-primary mt-4 py-2 rounded-2xl text-white font-semibold mb-2 flex items-center justify-center h-11"
              >
                <AnimatedLoading size={6} />
              </button>
            ) : null}
            {!isAuthenticating && authOK && !authFail ? (
              <button
                disabled={true}
                className="w-full bg-primary mt-4 py-2 rounded-2xl text-white font-semibold mb-2 flex items-center justify-center h-11"
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
