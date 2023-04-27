import loading from "../assets/imgs/loader.gif";

const Overlay = (props) => {
  return (
    <div className="h-screen w-full bg-black opacity-95 z-50 fixed flex items-center justify-center">
      <div className="w-1/4 h-max p-10 flex items-center justify-center">
        <img
          src={loading}
          alt="Loading, Please Wait..."
          title="Loading..."
          className="w-1/2"
        />
      </div>
    </div>
  );
};

/* const LoadingOverlay = (props) => {
  const [isOverlay, setIsOverlay] = useState(false);
  const cookies = null;
  if (cookies != null) {
  } else {
    return <Navigate to="/login" replace="true" />;
  }
  return isOverlay ? <Overlay /> : null;
  return <Overlay />;
}; */

export { Overlay };
