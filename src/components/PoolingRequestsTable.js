import DeleteIcon from "@mui/icons-material/Delete";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React, { useState } from "react";
import Empty from "./Empty";
import * as selectUtils from "../utils/selectUtils";
import { randomColor } from "../utils/randColorCode";
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
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import ApprovalIcon from "@mui/icons-material/Approval";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";

const headCells = [
  {
    id: "requesterName",
    align: "left",
    label: "Nom du client",
  },
  {
    id: "requesterDeparture",
    align: "left",
    label: "Point de départ",
  },
  {
    id: "requesterDestination",
    align: "left",
    label: "Point de destination",
  },
  {
    id: "requesterPaymentAmount",
    align: "center",
    label: "Montant de la course",
  },
  {
    id: "requestStatus",
    align: "center",
    label: "Statut de la requête",
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
              "aria-label": "Select all requests",
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

const PoolingRequestRow = ({
  index,
  onCheck,
  onDelete,
  onStatusChange,
  onView,
  processing,
  selected,
  request,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const created_at = () => {
    if (
      new Date(
        request.created_at.seconds * 1000 +
          request.created_at.nanoseconds / 1000000
      ).getDay() === new Date().getDay() &&
      new Date(
        request.created_at.seconds * 1000 +
          request.created_at.nanoseconds / 1000000
      ).getMonth() === new Date().getMonth() &&
      new Date(
        request.created_at.seconds * 1000 +
          request.created_at.nanoseconds / 1000000
      ).getFullYear() === new Date().getFullYear()
    ) {
      return "Aujourd'hui";
    } else if (
      new Date(
        request.created_at.seconds * 1000 +
          request.created_at.nanoseconds / 1000000
      ).getDay() ===
        new Date().getDay() - 1 &&
      new Date(
        request.created_at.seconds * 1000 +
          request.created_at.nanoseconds / 1000000
      ).getMonth() === new Date().getMonth() &&
      new Date(
        request.created_at.seconds * 1000 +
          request.created_at.nanoseconds / 1000000
      ).getFullYear() === new Date().getFullYear()
    ) {
      return "Hier";
    } else if (
      new Date(
        request.created_at.seconds * 1000 +
          request.created_at.nanoseconds / 1000000
      ).getDay() ===
        new Date().getDay() - 2 &&
      new Date(
        request.created_at.seconds * 1000 +
          request.created_at.nanoseconds / 1000000
      ).getMonth() === new Date().getMonth() &&
      new Date(
        request.created_at.seconds * 1000 +
          request.created_at.nanoseconds / 1000000
      ).getFullYear() === new Date().getFullYear()
    ) {
      return "Avant-hier";
    } else if (
      new Date(
        request.created_at.seconds * 1000 +
          request.created_at.nanoseconds / 1000000
      ).getDay() ===
        new Date().getDay() - 3 &&
      new Date(
        request.created_at.seconds * 1000 +
          request.created_at.nanoseconds / 1000000
      ).getMonth() === new Date().getMonth() &&
      new Date(
        request.created_at.seconds * 1000 +
          request.created_at.nanoseconds / 1000000
      ).getFullYear() === new Date().getFullYear()
    ) {
      return "Il y a 3 jours";
    } else {
      return new Date(
        request.created_at.seconds * 1000 +
          request.created_at.nanoseconds / 1000000
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
    onDelete([[request.id]]);
  };

  const handleView = () => {
    handleCloseActions();
    onView(request);
  };

  const handleStatusChange = () => {
    handleCloseActions();
    onStatusChange([[request.id]], `${request.state}`);
  };

  return (
    <TableRow
      aria-checked={selected}
      tabIndex={-1}
      key={request.id}
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
          onClick={() => onCheck(request.id, request.userBaseData.id)}
        />
      </TableCell>
      <TableCell>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {request.userBaseData.profilePic === "" ? (
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
              {request.userBaseData.name != null &&
              request.userBaseData.name !== ""
                ? request.userBaseData.name.toString().charAt(0).toUpperCase()
                : request.userBaseData.forename
                    .toString()
                    .charAt(0)
                    .toUpperCase()}
            </Avatar>
          ) : (
            <Avatar
              alt="User picture"
              src={request.userBaseData.profilePic}
              sx={{ mr: 3, width: 56, height: 56 }}
            />
          )}
          <Box>
            <Typography component="div" variant="h6">
              {`${request.userBaseData.name} ${request.userBaseData.forename}`}
            </Typography>
            <Typography color="textSecondary" variant="body2">
              {request.userCredsData.mail}
            </Typography>
            <Typography color="textSecondary" variant="body2">
              {request.userCredsData.phone}
            </Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell align="left">
        <Typography
          component="div"
          variant="subtitle1"
          textTransform={"capitalize"}
        >
          {`${request.departureDistrict}, ${request.departureReferencePoint}`}
        </Typography>
      </TableCell>
      <TableCell align="left">
        <Typography
          component="div"
          variant="subtitle1"
          textTransform={"capitalize"}
        >
          {`${request.arrivalDistrict}, ${request.arrivalReferencePoint}`}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <Chip color="primary" label={`CDF ${request.paymentAmount}`} />
      </TableCell>
      <TableCell align="center">
        <Chip
          color={
            request.state === "pending"
              ? "info"
              : request.state === "approved"
              ? "primary"
              : request.state === "ongoing"
              ? "secondary"
              : request.state === "canceled"
              ? "error"
              : request.state === "expired"
              ? "warning"
              : request.state === "done"
              ? "success"
              : "default"
          }
          icon={
            request.state === "pending" ? (
              <HourglassTopIcon />
            ) : request.state === "approved" ? (
              <ApprovalIcon />
            ) : request.state === "ongoing" ? (
              <AirportShuttleIcon />
            ) : request.state === "canceled" ? (
              <CancelIcon />
            ) : request.state === "expired" ? (
              <UnpublishedIcon />
            ) : request.state === "done" ? (
              <CheckCircleIcon />
            ) : null
          }
          label={
            request.state === "pending"
              ? "En attente"
              : request.state === "ongoing"
              ? "En cours"
              : request.state === "approved"
              ? "Approuvée"
              : request.state === "canceled"
              ? "Annulée"
              : request.state === "expired"
              ? "Requête Expirée"
              : request.state === "done"
              ? "Terminée"
              : " - "
          }
          sx={{
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
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
          id="request-row-menu-button"
          aria-label="request actions"
          aria-controls="request-row-menu"
          aria-haspopup="true"
          aria-expanded={openActions ? "true" : "false"}
          disabled={processing}
          onClick={handleOpenActions}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="request-row-menu"
          anchorEl={anchorEl}
          aria-labelledby="request-row-menu-button"
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
          <MenuItem onClick={handleStatusChange}>
            <ListItemIcon>
              <ChangeCircleIcon />
            </ListItemIcon>{" "}
            {"Changer le statut"}
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

const PoolingRequestsTable = ({
  onDelete,
  onStatusChange,
  onView,
  onSelectedChange,
  processing,
  selected,
  requests,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useState(() => {
    console.log("POOLING REQUESTS -> ", requests && requests.length);
  }, [requests]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelectedIds = selectUtils.selectAllPoolings(requests);
      onSelectedChange(newSelectedIds);
      //console.log("ALL IDS SELECTED ", newSelectedIds);
      return;
    }
    onSelectedChange([]);
  };

  const handleClick = (request_id, base_id) => {
    let newSelected = selectUtils.selectOne(selected, request_id, base_id);
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

  return requests && requests.length > 0 ? (
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
            rowCount={requests ? requests.length : 0}
          />
          <TableBody>
            {requests
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((request, index) => (
                <PoolingRequestRow
                  index={index}
                  key={request.id}
                  onCheck={handleClick}
                  onDelete={onDelete}
                  onStatusChange={onStatusChange}
                  onView={onView}
                  processing={processing}
                  selected={isSelected(request.id)}
                  request={request}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={requests ? requests.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage={"Entrées par pages"}
      />
    </React.Fragment>
  ) : requests && requests.length === 0 ? (
    <Empty title="Pas de nouvelle commande jusque là..." />
  ) : (
    <LoadingTableView
      message="Chargement des requêtes..."
      title="Patientez svp"
    />
  );
};

export default PoolingRequestsTable;
