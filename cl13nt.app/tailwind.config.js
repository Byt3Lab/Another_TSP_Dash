module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        "custom-sidenav-layout": "15% 1fr",
      },
      width: {
        "2/44": "54%",
        "1/25": "45%",
      },
      backgroundColor: {
        primary: "#006C30",
      },
    },
  },
  plugins: [],
};
