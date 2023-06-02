import DeleteIcon from "@mui/icons-material/Delete";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import MoreVertIcon from "@mui/icons-material/MoreVert";
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
import { randomColor } from "../utils/randColorCode";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { useNavigate } from "react-router-dom";

const headCells = [
  {
    id: "subscriberName",
    align: "left",
    label: "Nom de l'abonné",
  },
  {
    id: "quantity",
    align: "center",
    label: "Quantité",
  },
  {
    id: "fuelType",
    align: "center",
    label: "Type de carburant",
  },
  {
    id: "provider",
    align: "center",
    label: "Fournisseur",
  },
  {
    id: "cost",
    align: "center",
    label: "Coût",
  },
  {
    id: "duration",
    align: "center",
    label: "Durée",
  },
  {
    id: "createdAt",
    align: "center",
    label: "Date de création",
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
              "aria-label": "Select all fuel subscriptions",
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

const FuelingRow = ({
  index,
  onCheck,
  onDelete,
  onView,
  onExport,
  processing,
  selected,
  fueling,
}) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const created_at = () => {
    if (
      new Date(
        fueling.created_at.seconds * 1000 +
          fueling.created_at.nanoseconds / 1000000
      ).getDay() === new Date().getDay() &&
      new Date(
        fueling.created_at.seconds * 1000 +
          fueling.created_at.nanoseconds / 1000000
      ).getMonth() === new Date().getMonth() &&
      new Date(
        fueling.created_at.seconds * 1000 +
          fueling.created_at.nanoseconds / 1000000
      ).getFullYear() === new Date().getFullYear()
    ) {
      return "Aujourd'hui";
    } else if (
      new Date(
        fueling.created_at.seconds * 1000 +
          fueling.created_at.nanoseconds / 1000000
      ).getDay() ===
        new Date().getDay() - 1 &&
      new Date(
        fueling.created_at.seconds * 1000 +
          fueling.created_at.nanoseconds / 1000000
      ).getMonth() === new Date().getMonth() &&
      new Date(
        fueling.created_at.seconds * 1000 +
          fueling.created_at.nanoseconds / 1000000
      ).getFullYear() === new Date().getFullYear()
    ) {
      return "Hier";
    } else if (
      new Date(
        fueling.created_at.seconds * 1000 +
          fueling.created_at.nanoseconds / 1000000
      ).getDay() ===
        new Date().getDay() - 2 &&
      new Date(
        fueling.created_at.seconds * 1000 +
          fueling.created_at.nanoseconds / 1000000
      ).getMonth() === new Date().getMonth() &&
      new Date(
        fueling.created_at.seconds * 1000 +
          fueling.created_at.nanoseconds / 1000000
      ).getFullYear() === new Date().getFullYear()
    ) {
      return "Avant-hier";
    } else if (
      new Date(
        fueling.created_at.seconds * 1000 +
          fueling.created_at.nanoseconds / 1000000
      ).getDay() ===
        new Date().getDay() - 3 &&
      new Date(
        fueling.created_at.seconds * 1000 +
          fueling.created_at.nanoseconds / 1000000
      ).getMonth() === new Date().getMonth() &&
      new Date(
        fueling.created_at.seconds * 1000 +
          fueling.created_at.nanoseconds / 1000000
      ).getFullYear() === new Date().getFullYear()
    ) {
      return "Il y a 3 jours";
    } else {
      return new Date(
        fueling.created_at.seconds * 1000 +
          fueling.created_at.nanoseconds / 1000000
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
    onDelete([[fueling.id]]);
  };

  const handleExportData = () => {
    handleCloseActions();
    onExport(fueling);
  };

  const handleView = () => {
    handleCloseActions();
    onView(fueling);
  };

  const handleGoTo = () => {
    handleCloseActions();
    const win = window.open("https://mail.google.com", "_blank");
    if (win != null) {
      win.focus();
    }
  };

  return (
    <TableRow
      aria-checked={selected}
      tabIndex={-1}
      key={fueling.id}
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
          onClick={() =>
            onCheck(
              fueling.id,
              fueling.userBaseData != null ? fueling.userBaseData.id : null
            )
          }
        />
      </TableCell>
      <TableCell>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {!fueling.userBaseData || fueling.userBaseData.profilePic === "" ? (
            <Avatar
              sx={{
                mr: 3,
                width: 56,
                height: 56,
                backgroundColor: randomColor(),
                fontSize: 30,
                fontWeight: "bold",
                color: "white",
              }}
            >
              {fueling.name != null && fueling.name !== ""
                ? fueling.name.toString().charAt(0).toUpperCase()
                : fueling.forename.toString().charAt(0).toUpperCase()}
            </Avatar>
          ) : (
            <Avatar
              alt="User picture"
              src={fueling.userBaseData.profilePic}
              sx={{ mr: 3, width: 56, height: 56 }}
            />
          )}
          <Box>
            <Typography component="div" variant="h6">
              {`${fueling.name} ${fueling.forename}`}
            </Typography>
            <Typography color="textSecondary" variant="body2">
              {fueling.userBaseData && fueling.userBaseData.mail}
            </Typography>
            <Typography color="textSecondary" variant="body2">
              {fueling.phone}
            </Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell align="center">
        <Chip color="primary" label={`${fueling.quantity}L`} />
      </TableCell>
      <TableCell align="center">
        <Chip color="primary" label={`${fueling.fuelType}`} />
      </TableCell>
      <TableCell align="center">
        <Typography component="div" variant="h6">
          {`${fueling.fuelProvider}`}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <Chip color="primary" label={`CDF ${fueling.paymentAmount}`} />
      </TableCell>
      <TableCell align="center">
        <Chip
          color="primary"
          label={
            fueling.subDuration.toString().split("")[1] === "M"
              ? `${fueling.subDuration.toString().split("")[0]} Mois`
              : `${fueling.subDuration.toString().split("")[0]} An(s)`
          }
        />
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
          id="fueling-row-menu-button"
          aria-label="fueling actions"
          aria-controls="fueling-row-menu"
          aria-haspopup="true"
          aria-expanded={openActions ? "true" : "false"}
          disabled={processing}
          onClick={handleOpenActions}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="fueling-row-menu"
          anchorEl={anchorEl}
          aria-labelledby="fueling-row-menu-button"
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
          <MenuItem onClick={handleGoTo}>
            <ListItemIcon>
              <ArrowOutwardIcon />
            </ListItemIcon>{" "}
            {"Transferer"}
          </MenuItem>
          <MenuItem onClick={handleExportData}>
            <ListItemIcon>
              <FileDownloadIcon />
            </ListItemIcon>{" "}
            {"Exporter"}
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

const FuelingsTable = ({
  onDelete,
  onView,
  onSelectedChange,
  onExport,
  processing,
  selected,
  fuelings,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelectedIds = selectUtils.selectAllDrivers(fuelings);
      // console.log("ALL IDS SELECTED ", newSelectedIds);
      onSelectedChange(newSelectedIds);
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

  return fuelings && fuelings.length > 0 ? (
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
            rowCount={fuelings.length}
          />
          <TableBody>
            {fuelings
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((fueling, index) => (
                <FuelingRow
                  index={index}
                  key={fueling.id}
                  onCheck={handleClick}
                  onDelete={onDelete}
                  onView={onView}
                  onExport={onExport}
                  processing={processing}
                  selected={isSelected(fueling.id)}
                  fueling={fueling}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={fuelings.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage={"Entrées par pages"}
      />
    </React.Fragment>
  ) : fuelings && fuelings.length === 0 ? (
    <Empty title="Pas encore d'abonnements de carburant..." />
  ) : (
    <LoadingTableView
      message="Chargement des abonnements de carburant..."
      title="Patientez svp"
    />
  );
};

export default FuelingsTable;
