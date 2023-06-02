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
import { randomColor } from "../utils/randColorCode";
import LoadingTableView from "./LoadingView";

const headCells = [
  {
    id: "user",
    align: "left",
    label: "Utilisateur",
  },
  {
    id: "state",
    align: "center",
    label: "Status",
  },
  {
    id: "type",
    align: "center",
    label: "Type de compte",
  },
  {
    id: "createdAt",
    align: "center",
    label: "Date inscription",
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
              "aria-label": "Select all users",
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

const UserRow = ({
  index,
  onCheck,
  onDelete,
  onView,
  processing,
  selected,
  user,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const created_at = () => {
    if (
      new Date(
        user.created_at.seconds * 1000 + user.created_at.nanoseconds / 1000000
      ).getDay() === new Date().getDay() &&
      new Date(
        user.created_at.seconds * 1000 + user.created_at.nanoseconds / 1000000
      ).getMonth() === new Date().getMonth() &&
      new Date(
        user.created_at.seconds * 1000 + user.created_at.nanoseconds / 1000000
      ).getFullYear() === new Date().getFullYear()
    ) {
      return "Aujourd'hui";
    } else if (
      new Date(
        user.created_at.seconds * 1000 + user.created_at.nanoseconds / 1000000
      ).getDay() ===
        new Date().getDay() - 1 &&
      new Date(
        user.created_at.seconds * 1000 + user.created_at.nanoseconds / 1000000
      ).getMonth() === new Date().getMonth() &&
      new Date(
        user.created_at.seconds * 1000 + user.created_at.nanoseconds / 1000000
      ).getFullYear() === new Date().getFullYear()
    ) {
      return "Hier";
    } else if (
      new Date(
        user.created_at.seconds * 1000 + user.created_at.nanoseconds / 1000000
      ).getDay() ===
        new Date().getDay() - 2 &&
      new Date(
        user.created_at.seconds * 1000 + user.created_at.nanoseconds / 1000000
      ).getMonth() === new Date().getMonth() &&
      new Date(
        user.created_at.seconds * 1000 + user.created_at.nanoseconds / 1000000
      ).getFullYear() === new Date().getFullYear()
    ) {
      return "Avant-hier";
    } else if (
      new Date(
        user.created_at.seconds * 1000 + user.created_at.nanoseconds / 1000000
      ).getDay() ===
        new Date().getDay() - 3 &&
      new Date(
        user.created_at.seconds * 1000 + user.created_at.nanoseconds / 1000000
      ).getMonth() === new Date().getMonth() &&
      new Date(
        user.created_at.seconds * 1000 + user.created_at.nanoseconds / 1000000
      ).getFullYear() === new Date().getFullYear()
    ) {
      return "Il y a 3 jours";
    } else {
      return new Date(
        user.created_at.seconds * 1000 + user.created_at.nanoseconds / 1000000
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
    onDelete([[user.id, user.creds_id]]);
  };

  const handleView = () => {
    handleCloseActions();
    onView(user);
  };

  return (
    <TableRow
      aria-checked={selected}
      tabIndex={-1}
      key={user.id}
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
          onClick={() => onCheck(user.id, user.creds_id)}
        />
      </TableCell>
      <TableCell>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {user.profilePic === "" ? (
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
              {user.name != null && user.name !== ""
                ? user.name.toString().charAt(0).toUpperCase()
                : user.forename.toString().charAt(0).toUpperCase()}
            </Avatar>
          ) : (
            <Avatar
              alt="User picture"
              src={user.profilePic}
              sx={{ mr: 3, width: 56, height: 56 }}
            />
          )}
          <Box>
            <Typography component="div" variant="h6">
              {`${user.name} ${user.forename}`}
            </Typography>
            <Typography color="textSecondary" variant="body2">
              {user.mail}
            </Typography>
            <Typography color="textSecondary" variant="body2">
              {user.phone}
            </Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell align="center">
        {user.state ? (
          <Chip color="primary" label="Activé" />
        ) : (
          <Chip color="warning" label="Désactivé" />
        )}
      </TableCell>
      <TableCell align="center">
        {user.isDriver ? (
          <Chip color="primary" label="Chauffeur" />
        ) : (
          <Chip color="info" label="Utilisateur" />
        )}
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
          id="user-row-menu-button"
          aria-label="user actions"
          aria-controls="user-row-menu"
          aria-haspopup="true"
          aria-expanded={openActions ? "true" : "false"}
          disabled={processing}
          onClick={handleOpenActions}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="user-row-menu"
          anchorEl={anchorEl}
          aria-labelledby="user-row-menu-button"
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

const UserTable = ({
  onDelete,
  onView,
  onSelectedChange,
  processing,
  selected,
  users,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelectedIds = selectUtils.selectAll(users);
      onSelectedChange(newSelectedIds);
      //console.log("ALL IDS SELECTED ", newSelectedIds);
      return;
    }
    onSelectedChange([]);
  };

  const handleClick = (base_id, cred_id) => {
    let newSelected = selectUtils.selectOne(selected, base_id, cred_id);
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

  return users && users.length > 0 ? (
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
            rowCount={users.length}
          />
          <TableBody>
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user, index) => (
                <UserRow
                  index={index}
                  key={user.id}
                  onCheck={handleClick}
                  onDelete={onDelete}
                  onView={onView}
                  processing={processing}
                  selected={isSelected(user.id)}
                  user={user}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage={"Entrées par pages"}
      />
    </React.Fragment>
  ) : users && users.length === 0 ? (
    <Empty title="Pas encore d'utilisateur." />
  ) : (
    <LoadingTableView
      message="Chargement des utilisateurs..."
      title="Patientez svp"
    />
  );
};

export default UserTable;
