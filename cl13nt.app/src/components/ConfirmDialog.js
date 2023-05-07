import { ReactComponent as ConfirmSvg } from "../assets/confirm.svg";
import { SvgContainer } from "./SvgContainer";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

const ConfirmDialog = ({
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
        <SvgContainer>
          <ConfirmSvg style={{ maxWidth: 280, width: "100%" }} />
        </SvgContainer>
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
          {"Confirmer"}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
