import { SideUserCard } from "./SideUserCard";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";

const SideMenu = (props) => {
  return props.isExpanded ? (
    <div className="w-1/4 h-max">
      {/* <!-- drawer component --> */}
      <div
        className="fixed z-40 h-screen p-4 overflow-y-auto bg-white w-1/4 dark:bg-slate-600 transition-transform left-0 top-0 transform-none shadow-2xl shadow-slate-900"
        tabIndex="-1"
        aria-labelledby="drawer-disable-body-scrolling-label"
        aria-modal="true"
        role="dialog"
      >
        <SideUserCard />
        <div className="py-4 overflow-y-auto">
          <ul className="space-y-2">
            <Link to="/home">
              <li className="flex items-center px-5 py-6 text-base font-medium text-white rounded-lg hover:bg-gray-700">
                <HomeIcon />
                <span className="ml-3">Home</span>
              </li>
            </Link>
            <Link to="/users">
              <li className="flex items-center px-5 py-6 text-base font-medium text-white rounded-lg hover:bg-gray-700">
                <PeopleIcon />
                <span className="ml-3">Utilisateurs</span>
              </li>
            </Link>
            <Link to="/administrators">
              <li className="flex items-center px-5 py-6 text-base font-medium text-white rounded-lg hover:bg-gray-700">
                <SupervisedUserCircleIcon />
                <span className="ml-3">Administrateurs</span>
              </li>
            </Link>
            <Link to="/commands">
              <li className="flex items-center px-5 py-6 text-base font-medium text-white rounded-lg hover:bg-gray-700">
                <MonetizationOnIcon />
                <span className="ml-3">Commandes</span>
              </li>
            </Link>
            <Link to="/fleet">
              <li className="flex items-center px-5 py-6 text-base font-medium text-white rounded-lg hover:bg-gray-700">
                <LocalTaxiIcon />
                <span className="ml-3">Flotte</span>
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  ) : null;
};

export { SideMenu };
