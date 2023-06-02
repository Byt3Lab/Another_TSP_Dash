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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WatchLaterIcon from "@mui/icons-material/WatchLater";

const headCells = [
  {
    id: "applicantName",
    align: "left",
    label: "Nom de l'abonné",
  },
  {
    id: "pickupAddress",
    align: "left",
    label: "Adresse de ramassage",
  },
  {
    id: "depositAddress",
    align: "left",
    label: "Adresse de dépot",
  },
  {
    id: "cost",
    align: "center",
    label: "Coût",
  },
  {
    id: "status",
    align: "center",
    label: "Status",
  },
  {
    id: "createdAt",
    align: "center",
    label: "Date de souscription",
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
              "aria-label": "Select all subs",
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

const SubscriptionRow = ({
  index,
  onCheck,
  onDelete,
  onValidate,
  onView,
  processing,
  selected,
  sub,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const created_at = () => {
    if (
      new Date(
        sub.created_at.seconds * 1000 + sub.created_at.nanoseconds / 1000000
      ).getDay() === new Date().getDay() &&
      new Date(
        sub.created_at.seconds * 1000 + sub.created_at.nanoseconds / 1000000
      ).getMonth() === new Date().getMonth() &&
      new Date(
        sub.created_at.seconds * 1000 + sub.created_at.nanoseconds / 1000000
      ).getFullYear() === new Date().getFullYear()
    ) {
      return "Aujourd'hui";
    } else if (
      new Date(
        sub.created_at.seconds * 1000 + sub.created_at.nanoseconds / 1000000
      ).getDay() ===
        new Date().getDay() - 1 &&
      new Date(
        sub.created_at.seconds * 1000 + sub.created_at.nanoseconds / 1000000
      ).getMonth() === new Date().getMonth() &&
      new Date(
        sub.created_at.seconds * 1000 + sub.created_at.nanoseconds / 1000000
      ).getFullYear() === new Date().getFullYear()
    ) {
      return "Hier";
    } else if (
      new Date(
        sub.created_at.seconds * 1000 + sub.created_at.nanoseconds / 1000000
      ).getDay() ===
        new Date().getDay() - 2 &&
      new Date(
        sub.created_at.seconds * 1000 + sub.created_at.nanoseconds / 1000000
      ).getMonth() === new Date().getMonth() &&
      new Date(
        sub.created_at.seconds * 1000 + sub.created_at.nanoseconds / 1000000
      ).getFullYear() === new Date().getFullYear()
    ) {
      return "Avant-hier";
    } else if (
      new Date(
        sub.created_at.seconds * 1000 + sub.created_at.nanoseconds / 1000000
      ).getDay() ===
        new Date().getDay() - 3 &&
      new Date(
        sub.created_at.seconds * 1000 + sub.created_at.nanoseconds / 1000000
      ).getMonth() === new Date().getMonth() &&
      new Date(
        sub.created_at.seconds * 1000 + sub.created_at.nanoseconds / 1000000
      ).getFullYear() === new Date().getFullYear()
    ) {
      return "Il y a 3 jours";
    } else {
      return new Date(
        sub.created_at.seconds * 1000 + sub.created_at.nanoseconds / 1000000
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
    onDelete([[sub.id]]);
  };

  const handleView = () => {
    handleCloseActions();
    onView(sub);
  };

  const handleValidate = () => {
    handleCloseActions();
    onValidate([[sub.id]]);
  };

  return (
    <TableRow
      aria-checked={selected}
      tabIndex={-1}
      key={sub.id}
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
              sub.id,
              sub.userBaseData != null ? sub.userBaseData.id : null
            )
          }
        />
      </TableCell>
      <TableCell>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {!sub.userBaseData || sub.userBaseData.profilePic === "" ? (
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
              {sub.name != null && sub.name !== ""
                ? sub.name.toString().charAt(0).toUpperCase()
                : sub.forename.toString().charAt(0).toUpperCase()}
            </Avatar>
          ) : (
            <Avatar
              alt="User picture"
              src={sub.userBaseData.profilePic}
              sx={{ mr: 3, width: 56, height: 56 }}
            />
          )}
          <Box>
            <Typography component="div" variant="h6">
              {`${sub.name} ${sub.forename}`}
            </Typography>
            <Typography color="textSecondary" variant="body2">
              {sub.userBaseData && sub.userBaseData.mail}
            </Typography>
            <Typography color="textSecondary" variant="body2">
              {sub.phone}
            </Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell align="left">
        <Typography component="div" variant="h6">
          {`${sub.pickupPointAddress}`}
        </Typography>
      </TableCell>
      <TableCell align="left">
        <Typography component="div" variant="h6">
          {`${sub.dropPointAddress}`}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <Chip color="primary" label={`CDF ${sub.paymentAmount}`} />
      </TableCell>
      <TableCell align="center">
        <Chip
          color="primary"
          label={`${sub.state ? "Actif" : "Inactif"}`}
          icon={sub.state ? <CheckCircleIcon /> : <WatchLaterIcon />}
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
          id="sub-row-menu-button"
          aria-label="sub actions"
          aria-controls="sub-row-menu"
          aria-haspopup="true"
          aria-expanded={openActions ? "true" : "false"}
          disabled={processing}
          onClick={handleOpenActions}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="sub-row-menu"
          anchorEl={anchorEl}
          aria-labelledby="sub-row-menu-button"
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

const SubscriptionsTable = ({
  onDelete,
  onValidate,
  onView,
  onSelectedChange,
  processing,
  selected,
  subs,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelectedIds = selectUtils.selectAllDrivers(subs);
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

  return subs && subs.length > 0 ? (
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
            rowCount={subs.length}
          />
          <TableBody>
            {subs
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((sub, index) => (
                <SubscriptionRow
                  index={index}
                  key={sub.id}
                  onCheck={handleClick}
                  onDelete={onDelete}
                  onValidate={onValidate}
                  onView={onView}
                  processing={processing}
                  selected={isSelected(sub.id)}
                  sub={sub}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={subs.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage={"Entrées par pages"}
      />
    </React.Fragment>
  ) : subs && subs.length === 0 ? (
    <Empty title="Pas encore de souscription apparemment..." />
  ) : (
    <LoadingTableView
      message="Chargement des souscriptions..."
      title="Patientez svp"
    />
  );
};

export default SubscriptionsTable;
