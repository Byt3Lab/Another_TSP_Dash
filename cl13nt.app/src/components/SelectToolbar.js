import { Box, Fab, Toolbar, Tooltip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

const SelectToolbar = ({ onCancel, onDelete, processing, selected }) => {
  const numSelected = selected.length;

  return (
    <Toolbar sx={{ ml: 1, px: { xs: 3, sm: 6 } }}>
      <Fab color="secondary" onClick={onCancel} variant="extended">
        <CloseIcon sx={{ mr: 1 }} />
        {numSelected} {"Selectionnés"}
      </Fab>
      <Box sx={{ flexGrow: 1 }} />

      {numSelected > 0 && (
        <Tooltip title={"Supprimer"}>
          <Fab
            color="secondary"
            disabled={processing}
            onClick={() => onDelete(selected)}
          >
            <DeleteIcon />
          </Fab>
        </Tooltip>
      )}
    </Toolbar>
  );
};

export default SelectToolbar;
