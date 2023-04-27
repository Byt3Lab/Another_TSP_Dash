import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { UserIcon } from "../Svgs/UserIcon";

function HelloCard(props) {
  const navigate = useNavigate();
  const role = "community_manager";
  return (
    <div
      className={`h-full w-full pt-3 p-10 bg-hello-card rounded-lg ${
        {
          graphist: "bg-graphic-background-img",
          developer: "bg-dev-background-img",
          trader: "bg-trader-background-img",
          marketer: "bg-marketing-background-img",
          community_manager: "bg-marketing-background-img",
        }[role]
      } text-white bg-cover bg-no-repeat z-50`}
    >
      <h2 className="text-xl font-mono">Hello</h2>
      <h1 className="text-6xl font-semibold font-mono">
        Forename
        <br></br>
        Name
      </h1>
      <br />
      <p className="text-base font-medium">
        Welcome back.
        <br /> We hope you're fine.
      </p>
      <Link to="/profile">
        <div className="flex justify-center w-fit float-right mt-5 z-50">
          <UserIcon size={5} />
          <p className="float-right text-base font-bold">&nbsp;Profile ➡️</p>
        </div>
      </Link>
    </div>
  );
}

export { HelloCard };
