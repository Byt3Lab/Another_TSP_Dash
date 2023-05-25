import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export function SelectVariants({ statusChoice, setStatusChoice }) {
  const handleChange = (event) => {
    setStatusChoice(event.target.value);
  };

  return (
    <div>
      <FormControl variant="filled" sx={{ m: 1, minWidth: 120, width: "50%" }}>
        <InputLabel id="demo-simple-select-filled-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={statusChoice}
          onChange={handleChange}
        >
          <MenuItem value={"pending"}>En attente</MenuItem>
          <MenuItem value={"ongoing"}>En cours</MenuItem>
          <MenuItem value={"approved"}>Approuvé</MenuItem>
          <MenuItem value={"canceled"}>Annulé</MenuItem>
          <MenuItem value={"expired"}>Requête Expirée</MenuItem>
          <MenuItem value={"done"}>Terminée</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

const UpdateRequestStatusDialog = ({
  description,
  onClose,
  onConfirm,
  open,
  pending,
  title,
  statusChoice,
  setStatusChoice,
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
        <Box sx={{ pt: 2, width: "100%" }}>
          <SelectVariants
            statusChoice={statusChoice}
            setStatusChoice={setStatusChoice}
          />
        </Box>
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

export default UpdateRequestStatusDialog;
