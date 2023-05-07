module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        "custom-sidenav-layout": "15% 1fr",
      },
      backgroundImage: {
        "graphic-background-img":
          "url('../4553t5/imgs/graphic_background.jpg')",
        "trader-background-img": "url('../4553t5/imgs/trader_background.jpg')",
        "dev-background-img": "url('../4553t5/imgs/dev_background.jpg')",
        "marketing-background-img":
          "url('../4553t5/imgs/marketing_background.jpg')",
      },
      width: {
        "2/44": "54%",
      },
    },
  },
  plugins: [],
};
