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
  onEdit,
  processing,
  selected,
  user,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const dateOptions = {
    day: "2-digit",
    year: "2-digit",
    month: "short",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
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
    onDelete([user.id]);
  };

  const handleEdit = () => {
    handleCloseActions();
    onEdit(user);
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
          onClick={() => onCheck(user.id)}
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
            {new Date(
              user.created_at.seconds * 1000 +
                user.created_at.nanoseconds / 1000000
            )
              .toLocaleString("fr-CM", dateOptions)
              .toString()}
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
          <MenuItem onClick={handleEdit}>
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
  onEdit,
  onSelectedChange,
  processing,
  selected,
  users = [],
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = selectUtils.selectAll(users);
      onSelectedChange(newSelecteds);
      return;
    }
    onSelectedChange([]);
  };

  const handleClick = (id) => {
    let newSelected = selectUtils.selectOne(selected, id);
    onSelectedChange(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  if (users.length === 0) {
    return <Empty title="Pas encore d'utilisateur" />;
  }

  return (
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
                  onEdit={onEdit}
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
  );
};

export default UserTable;
