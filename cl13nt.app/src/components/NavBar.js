import { Link } from "react-router-dom";
import { UserIcon } from "./Svgs/UserIcon";
import { SideMenuButton } from "./SideMenuButton";

const NavBar = (props) => {
  return (
    <div className="p-4 w-2/3 flex items-center justify-center ">
      <div className="p-5 text-gray-900 bg-white rounded-lg shadow-lg font-semibold capitalize items-center w-max flex">
        <Link to="/">
          <div className="px-2 border-r border-gray-800 w-max items-center">
            <img
              src="logo192.png"
              alt="Transport Service +"
              className="w-12 h-12 -mt-1 inline mx-auto"
            />
          </div>
        </Link>
        <div className="px-2 m border-r border-gray-800 items-center h-8 flex justify-center">
          <SideMenuButton
            isExpanded={props.isExpanded}
            toogleExpanded={props.toogleExpanded}
            setIsExpanded={props.setIsExpanded}
            sideMenuItemName= "Menu"
          />
        </div>
        <Link to="/profile">
          <div className="px-2 items-center h-8 flex justify-center">
            <button
              className="px-2 py-3 relative cursor-pointer hover:bg-gray-500 hover:text-white rounded-xl flex inline-flex items-center justify-center"
            >
              <UserIcon size={22} />
              <span className="mx-1">Profil</span>
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export { NavBar };
