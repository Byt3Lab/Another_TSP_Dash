import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Home from "../views/users/Home/Home";
import Account from "../views/users/Account/Account";
import Profile from "../views/users/Profile/Profile";
import Login from "../views/auth/Login/Login";
import Register from "../views/auth/Register/Register";
import NotFound from "../views/users/404/404";
import AddAttendance from "../views/users/Attendance/AddAttendance";
import Tasks from "../views/users/Tasks/Tasks";
import Messages from "../views/users/Messages/Messages";
import SharedFiles from "../views/users/SharedFiles/SharedFiles";
import Listings from "../views/users/Listings/Listings";
import PublicBoard from "../views/users/PublicBoard/PublicBoard";
import { FullScreenMenu } from "../components/FullScreenMenu/FullScreenMenu";
import { NavBarDark, NavBarLight } from "../components/NavBar/NavBar";
import { RouteGuardian } from "./RouteGuardian";
import { Overlay } from "../components/LoadingOverlay/LoadingOverlay";

const WithNav = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toogleFullMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <>
        {props.isLoaded ? null : <Overlay />}
        <FullScreenMenu isOpen={isOpen} toogleFullMenu={toogleFullMenu} />
        <div className="w-full py-3 px-6 bg-gray-700 flex justify-center fixed z-40">
          <NavBarLight
            isOpen={isOpen}
            toogleFullMenu={toogleFullMenu}
            setIsOpen={setIsOpen}
          />
        </div>
        <div className="w-full h-40 bg-slate-200" />
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
          element={<WithNav isLoaded={isLoaded} setIsLoaded={setIsLoaded} />}
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
            path="/attend"
            element={
              <RouteGuardian
                componente={
                  <AddAttendance
                    isLoaded={isLoaded}
                    setIsLoaded={setIsLoaded}
                  />
                }
              />
            }
          />
          <Route
            path="/tasks"
            element={
              <RouteGuardian
                componente={
                  <Tasks isLoaded={isLoaded} setIsLoaded={setIsLoaded} />
                }
              />
            }
          />
          <Route
            path="/messages"
            element={
              <RouteGuardian
                componente={
                  <Messages isLoaded={isLoaded} setIsLoaded={setIsLoaded} />
                }
              />
            }
          />
          <Route
            path="/board"
            element={
              <RouteGuardian
                componente={
                  <PublicBoard isLoaded={isLoaded} setIsLoaded={setIsLoaded} />
                }
              />
            }
          />
          <Route
            path="/shared"
            element={
              <RouteGuardian
                componente={
                  <SharedFiles isLoaded={isLoaded} setIsLoaded={setIsLoaded} />
                }
              />
            }
          />
          <Route
            path="/listings"
            element={
              <RouteGuardian
                componente={
                  <Listings isLoaded={isLoaded} setIsLoaded={setIsLoaded} />
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
