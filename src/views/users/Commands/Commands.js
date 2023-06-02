import { Helmet } from "react-helmet";
import { Footer } from "../../../components/Footer";
import CommandsManagement from "../../../components/Master/CommandsManagement.";

const CommandsView = (props) => {
  return (
    <div className="w-full">
      <div className="w-full p-2 flex inline-block justify-center justify-items-center pb-10">
        <Helmet>
          <title>Commandes | TS+ Dashboard</title>
        </Helmet>
        <div className="container justify-items-center h-fit">
          <CommandsManagement
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

export default CommandsView;
