import { Box, Fab, Toolbar, Tooltip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";

const SelectToolbar = ({
  onCancel,
  onDelete,
  processing,
  selected,
  onUpdateRequestsStatus,
}) => {
  const numSelected = selected.length;

  return (
    <Toolbar sx={{ ml: 1, px: { xs: 3, sm: 6 } }}>
      <Fab
        color="secondary"
        onClick={onCancel}
        variant="extended"
        sx={{ zIndex: 0 }}
      >
        <CloseIcon sx={{ mr: 1 }} />
        {numSelected} {"Selectionnés"}
      </Fab>
      <Box sx={{ flexGrow: 1 }} />

      {onUpdateRequestsStatus && (
        <Tooltip title={"Modifier plusieurs status"}>
          <Fab
            color="secondary"
            disabled={processing}
            onClick={() => onUpdateRequestsStatus(selected, "pending")}
            sx={{ zIndex: 0, mr: 2 }}
          >
            <ChangeCircleIcon />
          </Fab>
        </Tooltip>
      )}

      {numSelected > 0 && (
        <Tooltip title={"Supprimer"}>
          <Fab
            color="secondary"
            disabled={processing}
            onClick={() => onDelete(selected)}
            sx={{ zIndex: 0 }}
          >
            <DeleteIcon />
          </Fab>
        </Tooltip>
      )}
    </Toolbar>
  );
};

export default SelectToolbar;
