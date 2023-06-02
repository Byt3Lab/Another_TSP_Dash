import DeleteIcon from "@mui/icons-material/Delete";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import React, { useState } from "react";
import Empty from "./Empty";
import * as selectUtils from "../utils/selectUtils";
import {
  Avatar,
  Box,
  Checkbox,
  Chip,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import LoadingTableView from "./LoadingView";

const headCells = [
  {
    id: "applicantName",
    align: "left",
    label: "Nom du chauffeur (prétendu)",
  },
  {
    id: "vehicle",
    align: "center",
    label: "Véhicule",
  },
  {
    id: "applicantType",
    align: "center",
    label: "Type de chauffeur",
  },
  {
    id: "workingHours",
    align: "center",
    label: "Cadrant de travail",
  },
  {
    id: "createdAt",
    align: "center",
    label: "Date de la requête",
  },
];

function EnhancedTableHead({ onSelectAllClick, numSelected, rowCount }) {
  return (
    <TableHead>
      <TableRow sx={{ "& th": { border: 0 } }}>
        <TableCell sx={{ py: 0 }}>
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "Select all applicants",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align={headCell.align} sx={{ py: 0 }}>
            {headCell.label}
          </TableCell>
        ))}
        <TableCell align="right" sx={{ py: 0 }}>
          {"Actions"}
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

const ApplicationRow = ({
  index,
  onCheck,
  onDelete,
  onValidate,
  onView,
  processing,
  selected,
  application,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const created_at = () => {
    if (
      new Date(
        application.created_at.seconds * 1000 +
          application.created_at.nanoseconds / 1000000
      ).getDay() === new Date().getDay() &&
      new Date(
        application.created_at.seconds * 1000 +
          application.created_at.nanoseconds / 1000000
      ).getMonth() === new Date().getMonth() &&
      new Date(
        application.created_at.seconds * 1000 +
          application.created_at.nanoseconds / 1000000
      ).getFullYear() === new Date().getFullYear()
    ) {
      return "Aujourd'hui";
    } else if (
      new Date(
        application.created_at.seconds * 1000 +
          application.created_at.nanoseconds / 1000000
      ).getDay() ===
        new Date().getDay() - 1 &&
      new Date(
        application.created_at.seconds * 1000 +
          application.created_at.nanoseconds / 1000000
      ).getMonth() === new Date().getMonth() &&
      new Date(
        application.created_at.seconds * 1000 +
          application.created_at.nanoseconds / 1000000
      ).getFullYear() === new Date().getFullYear()
    ) {
      return "Hier";
    } else if (
      new Date(
        application.created_at.seconds * 1000 +
          application.created_at.nanoseconds / 1000000
      ).getDay() ===
        new Date().getDay() - 2 &&
      new Date(
        application.created_at.seconds * 1000 +
          application.created_at.nanoseconds / 1000000
      ).getMonth() === new Date().getMonth() &&
      new Date(
        application.created_at.seconds * 1000 +
          application.created_at.nanoseconds / 1000000
      ).getFullYear() === new Date().getFullYear()
    ) {
      return "Avant-hier";
    } else if (
      new Date(
        application.created_at.seconds * 1000 +
          application.created_at.nanoseconds / 1000000
      ).getDay() ===
        new Date().getDay() - 3 &&
      new Date(
        application.created_at.seconds * 1000 +
          application.created_at.nanoseconds / 1000000
      ).getMonth() === new Date().getMonth() &&
      new Date(
        application.created_at.seconds * 1000 +
          application.created_at.nanoseconds / 1000000
      ).getFullYear() === new Date().getFullYear()
    ) {
      return "Il y a 3 jours";
    } else {
      return new Date(
        application.created_at.seconds * 1000 +
          application.created_at.nanoseconds / 1000000
      )
        .toLocaleString("fr-CM")
        .toString();
    }
  };

  const labelId = `enhanced-table-checkbox-${index}`;
  const openActions = Boolean(anchorEl);

  const handleOpenActions = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseActions = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    handleCloseActions();
    onDelete([[application.id, application.userBaseData.id]]);
  };

  const handleView = () => {
    handleCloseActions();
    onView(application);
  };

  const handleValidate = () => {
    handleCloseActions();
    onValidate([[application.id, application.userBaseData.id]]);
  };

  return (
    <TableRow
      aria-checked={selected}
      tabIndex={-1}
      key={application.id}
      selected={selected}
      sx={{ "& td": { bgcolor: "background.paper", border: 0 } }}
    >
      <TableCell
        padding="checkbox"
        sx={{ borderTopLeftRadius: "1rem", borderBottomLeftRadius: "1rem" }}
      >
        <Checkbox
          color="primary"
          checked={selected}
          inputProps={{
            "aria-labelledby": labelId,
          }}
          onClick={() => onCheck(application.id, application.userBaseData.id)}
        />
      </TableCell>
      <TableCell>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            alt="Supposely a profile picture"
            sx={{ mr: 3, width: 56, height: 56 }}
          />
          <Box>
            <Typography component="div" variant="h6">
              {`${application.name} ${application.forename}`}
            </Typography>
            <Typography color="textSecondary" variant="body2">
              {application.mail}
            </Typography>
            <Typography color="textSecondary" variant="body2">
              {application.phone}
            </Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell align="center">
        <Typography component="div" variant="h6">
          {`${application.supplementBrand} ${application.supplementModel}`}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <Chip color="primary" label={application.supplementDriverStatus} />
      </TableCell>
      <TableCell align="center">
        <Chip color="primary" label={`${application.supplementWorkTime}`} />
      </TableCell>
      <TableCell align="center">
        <Box>
          <Typography color="textSecondary" variant="body2">
            {created_at()}
          </Typography>
        </Box>
      </TableCell>
      <TableCell
        align="right"
        sx={{ borderTopRightRadius: "1rem", borderBottomRightRadius: "1rem" }}
      >
        <IconButton
          id="application-row-menu-button"
          aria-label="application actions"
          aria-controls="application-row-menu"
          aria-haspopup="true"
          aria-expanded={openActions ? "true" : "false"}
          disabled={processing}
          onClick={handleOpenActions}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="application-row-menu"
          anchorEl={anchorEl}
          aria-labelledby="application-row-menu-button"
          open={openActions}
          onClose={handleCloseActions}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem onClick={handleValidate}>
            <ListItemIcon>
              <CheckCircleIcon />
            </ListItemIcon>{" "}
            {"Valider"}
          </MenuItem>
          <MenuItem onClick={handleView}>
            <ListItemIcon>
              <PersonSearchIcon />
            </ListItemIcon>{" "}
            {"Consulter"}
          </MenuItem>
          <MenuItem onClick={handleDelete}>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>{" "}
            {"Supprimer"}
          </MenuItem>
        </Menu>
      </TableCell>
    </TableRow>
  );
};

const DriverRequestsTable = ({
  onDelete,
  onValidate,
  onView,
  onSelectedChange,
  processing,
  selected,
  applications,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelectedIds = selectUtils.selectAllApplications(applications);
      onSelectedChange(newSelectedIds);
      //console.log("ALL IDS SELECTED ", newSelectedIds);
      return;
    }
    onSelectedChange([]);
  };

  const handleClick = (application_id, base_id) => {
    let newSelected = selectUtils.selectOne(selected, application_id, base_id);
    onSelectedChange(newSelected);
    //console.log("UPDATED SELECTED IDS ", newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function isInArr(array2d, item) {
    return (
      [].concat.apply([], [].concat.apply([], array2d)).indexOf(item) !== -1
    );
  }

  const isSelected = (id) => isInArr(selected, id);

  return applications && applications.length > 0 ? (
    <React.Fragment>
      <TableContainer>
        <Table
          aria-labelledby="tableTitle"
          sx={{
            minWidth: 600,
            borderCollapse: "separate",
            borderSpacing: "0 1rem",
          }}
        >
          <EnhancedTableHead
            numSelected={selected.length}
            onSelectAllClick={handleSelectAllClick}
            rowCount={applications.length}
          />
          <TableBody>
            {applications
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((application, index) => (
                <ApplicationRow
                  index={index}
                  key={application.id}
                  onCheck={handleClick}
                  onDelete={onDelete}
                  onValidate={onValidate}
                  onView={onView}
                  processing={processing}
                  selected={isSelected(application.id)}
                  application={application}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={applications.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage={"Entrées par pages"}
      />
    </React.Fragment>
  ) : applications && applications.length === 0 ? (
    <Empty title="Pas de nouvelle requête à afficher" />
  ) : (
    <LoadingTableView
      message="Chargement des candidatures..."
      title="Patientez svp"
    />
  );
};

export default DriverRequestsTable;
