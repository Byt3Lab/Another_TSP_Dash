import { Navigate } from "react-router-dom";
import bcrypt from "bcryptjs";

const RouteGuardian = (props) => {
  function hasJWT() {
    let flag = false;
    //check user has JWT token
    //localStorage.getItem("token") ? (flag = true) : (flag = false);
    if (document.cookie.match(/^(.*;)?\s*authState\s*=\s*[^;]+(.*)?$/)) {
      let authState = ("; " + document.cookie)
        .split("; authState=")
        .pop()
        .split(";")[0];
      if (bcrypt.compare("authenticated", authState)) {
        flag = true;
      } else {
        flag = false;
      }
    } else {
      flag = false;
    }

    return flag;
  }

  // console.log("Status Here : ", hasJWT());

  return hasJWT() ? (
    props.componente
  ) : (
    <Navigate to={{ pathname: "/login" }} replace />
  );
};

export { RouteGuardian };
