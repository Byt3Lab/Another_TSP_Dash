import { ThemeProvider as MuiThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { createTheme } from "../theme/index";

export const SettingsContext = createContext({});

const SettingsProvider = ({ children }) => {
  const [collapsed, setCollapsed] = useLocalStorage("sidebarcollapsed", false);
  const [direction, setDirection] = useLocalStorage("direction", "ltr");
  const [mode, setMode] = useLocalStorage("mode", "light");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.dir = direction;
  }, [direction]);

  const theme = useMemo(() => createTheme(direction, mode), [direction, mode]);

  const changeCollapsed = (collapsed) => {
    if (typeof collapsed === "boolean") {
      setCollapsed(collapsed);
    }
  };

  const changeDirection = (direction) => {
    if (direction) {
      setDirection(direction);
    }
  };

  const changeMode = (mode) => {
    if (mode) {
      setMode(mode);
    }
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <SettingsContext.Provider
      value={{
        collapsed,
        direction,
        mode,
        open,
        changeCollapsed,
        changeDirection,
        changeMode,
        toggleDrawer,
      }}
    >
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </SettingsContext.Provider>
  );
};

export function useSettings() {
  return useContext(SettingsContext);
}

export default SettingsProvider;
