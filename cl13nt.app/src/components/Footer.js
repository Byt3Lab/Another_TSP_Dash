const Footer = () => {
  return (
    // Create a website Footer
    <footer className="w-full p-10">
      <div className="w-full flex justify-center text-white">
        <img
          src="logo192.png"
          alt="Transport Service +"
          className="w-20 h-20 -mt-1 inline mx-auto"
        />
      </div>
      <div className="w-full flex justify-center text-white">
        <h2 className="text-2xl font-black mt-1">[+] TS+ Dashboard [-]</h2>
      </div>
      <div className="w-full flex justify-center text-white">
        <h2 className="text-lg font-light mt-4">
          Copyright © {new Date().getUTCFullYear()} - All right reserved
        </h2>
      </div>
      <div className="w-full flex justify-center text-white">
        <h2 className="text-xs font-light mt-4">Dev by Byt3L4b</h2>
      </div>
    </footer>
  );
};

export { Footer };
