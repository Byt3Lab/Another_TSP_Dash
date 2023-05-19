import { Helmet } from "react-helmet";
import { Footer } from "../../../components/Footer";
import FleetManagement from "../../../components/Master/FleetManagement";

const FleetView = (props) => {
  return (
    <div className="w-full">
      <div className="w-full p-2 flex inline-block justify-center justify-items-center pb-10">
        <Helmet>
          <title>Flotte | TS+ Dashboard</title>
        </Helmet>
        <div className="container justify-items-center h-fit">
          <FleetManagement
            isLoaded={props.isLoaded}
            setIsLoaded={props.setIsLoaded}
          />
        </div>
      </div>
      <div className="w-full pt-3 bg-gray-800">
        <Footer />
      </div>
    </div>
  );
};

export default FleetView;
