import { Snackbar, AlertTitle, Alert } from "@mui/material";
import { createContext, useContext, useState } from "react";

export const SnackbarContext = createContext({});

const SnackbarProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [severity, setSeverity] = useState(undefined);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const error = (newMessage) => {
    setTitle("Woops !");
    setMessage(newMessage);
    setSeverity("error");
    setOpen(true);
  };

  const success = (newMessage) => {
    setTitle("C'est fait !");
    setMessage(newMessage);
    setSeverity("success");
    setOpen(true);
  };

  return (
    <SnackbarContext.Provider value={{ error, success }}>
      {children}
      <Snackbar
        key={message}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={severity}>
          <AlertTitle>{title}</AlertTitle>
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export function useSnackbar() {
  return useContext(SnackbarContext);
}

export default SnackbarProvider;
