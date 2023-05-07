import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import empty from "../../../assets/imgs/empty_bottles.gif";

const NotFound = () => {
  return (
    <div className="w-full">
      <Helmet>
        <title>Not Found | TS+ Dashboard</title>
      </Helmet>
      <main>
        <div className="h-screen w-screen bg-slate-200 flex items-center">
          <div className="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
            <div className="max-w-md">
              <h1 className="text-9xl font-dark font-bold">404</h1>
              <p className="text-2xl md:text-3xl font-light leading-normal">
                Page inexistante.
              </p>
              <p className="mb-8 text-lg">Un typo sur l'URL peut etre ?</p>

              <Link to="/">
                <button className="px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-emerald-400 active:bg-emerald-600 hover:bg-emerald-500">
                  Retourner a l'acceuil
                </button>
              </Link>
            </div>
            <div className="max-w-lg">
              <img src={empty} alt="Empty Bottles" className="" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
