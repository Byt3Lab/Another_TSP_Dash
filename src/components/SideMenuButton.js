const SideMenuButton = (props) => {
  return (
    <span
      className="px-2 py-3 relative cursor-pointer hover:bg-gray-500 hover:text-white rounded-xl flex inline-flex items-center"
      onClick={props.toogleExpanded}
    >
      {props.isExpanded ? <CMenu /> : <OMenu />}
      <span className="mx-1">Menu</span>
    </span>
  );
};

const OMenu = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );
};

const CMenu = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
};

export { SideMenuButton };
