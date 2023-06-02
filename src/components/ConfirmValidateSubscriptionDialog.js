import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { ReactComponent as ValidateAction } from "../assets/validate.svg";

const ConfirmValidateSubscriptionDialog = ({
  description,
  onClose,
  onConfirm,
  open,
  pending,
  title,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
    >
      <DialogContent sx={{ textAlign: "center" }}>
        <Box
          marginBottom={5}
          display={"inline-flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <ValidateAction width={"50%"} />
        </Box>
        <DialogTitle id="confirm-dialog-title" sx={{ pb: 1, pt: 0 }}>
          {title}
        </DialogTitle>
        {description && (
          <DialogContentText id="confirm-dialog-description">
            {description}
          </DialogContentText>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{"Annuler"}</Button>
        <LoadingButton
          autoFocus
          onClick={onConfirm}
          loading={pending}
          variant="contained"
        >
          {"Oui"}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmValidateSubscriptionDialog;
