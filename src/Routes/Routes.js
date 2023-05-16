import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Home from "../views/users/Home/Home";
import Account from "../views/users/Account/Account";
import Profile from "../views/users/Profile/Profile";
import Login from "../views/auth/Login/Login";
import Register from "../views/auth/Register/Register";
import NotFound from "../views/users/404/404";
import { NavBar } from "../components/NavBar";
import { SideMenu } from "../components/SideMenu";
import { RouteGuardian } from "./RouteGuardian";
import { Overlay } from "../components/LoadingOverlay";
import UserManagementView from "../views/users/userManagement/ManageUsers";

const WithMenu = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toogleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <>
      {props.isLoaded ? null : <Overlay />}
      <>
        <>
          <div className="w-full p-2 flex items-center justify-center fixed bg-slate-600 z-40">
            <NavBar
              isExpanded={isExpanded}
              toogleExpanded={toogleExpanded}
              setIsExpanded={setIsExpanded}
            />
          </div>
          <div className="h-36 w-full p-2"></div>
        </>
        <div className="">
          <SideMenu
            isExpanded={isExpanded}
            toogleExpanded={toogleExpanded}
            setIsExpanded={setIsExpanded}
          />
        </div>
      </>
      <Outlet />
    </>
  );
};

const Routing = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <Router>
      <Routes>
        <Route
          element={<WithMenu isLoaded={isLoaded} setIsLoaded={setIsLoaded} />}
        >
          <Route
            exact
            index
            path="/"
            element={
              <RouteGuardian
                componente={
                  <Home isLoaded={isLoaded} setIsLoaded={setIsLoaded} />
                }
              />
            }
          />
          <Route
            path="/home"
            element={
              <RouteGuardian
                componente={
                  <Home isLoaded={isLoaded} setIsLoaded={setIsLoaded} />
                }
              />
            }
          />
          <Route
            path="/index"
            element={
              <RouteGuardian
                componente={
                  <Home isLoaded={isLoaded} setIsLoaded={setIsLoaded} />
                }
              />
            }
          />
          <Route
            path="/account"
            element={
              <RouteGuardian
                componente={
                  <Account isLoaded={isLoaded} setIsLoaded={setIsLoaded} />
                }
              />
            }
          />
          <Route
            path="/profile"
            element={
              <RouteGuardian
                componente={
                  <Profile isLoaded={isLoaded} setIsLoaded={setIsLoaded} />
                }
              />
            }
          />
          <Route
            path="/users"
            element={
              <RouteGuardian
                componente={
                  <UserManagementView
                    isLoaded={isLoaded}
                    setIsLoaded={setIsLoaded}
                  />
                }
              />
            }
          />
        </Route>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signin" element={<Login />} />
        <Route path="/auth" element={<Login />} />
        <Route path="/authenticate" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/registration" element={<Register />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export { Routing };
