import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

const ConfirmValidateDriverDialog = ({
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

export default ConfirmValidateDriverDialog;
