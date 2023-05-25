import { Fab } from "@mui/material";
import React, { useState, useEffect } from "react";
import AdminToolbar from "../AdminToolbar";
import ConfirmDialog from "../ConfirmDialog";
import SelectToolbar from "../SelectToolbar";
import { useSnackbar } from "../../contexts/SnackbarProvider";
import UserDialog from "../UserDialog";
import UserTable from "../UserTable";
import { fetchUsers } from "../../hooks/getUsers";
import { addUser } from "../../hooks/addUser";
import { deleteUsers } from "../../hooks/deleteUsers";
import AddIcon from "@mui/icons-material/Add";

const UserManagement = (props) => {
  const snackbar = useSnackbar();

  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false);
  const [openUserDialog, setOpenUserDialog] = useState(false);
  const [selected, setSelected] = useState([]);
  const [usersToDelete, setUsersToDelete] = useState([]);
  const [userUpdated, setUserUpdated] = useState(undefined);
  const [users, setUsers] = useState();
  const [isOperating, setIsOperating] = useState(props.isLoaded);

  useEffect(() => {
    props.setIsLoaded(false);
    setUsers();
    handleGetUsers();
  }, []);

  useEffect(() => {
    //console.log("USERS TO DELETE IDS ", usersToDelete, usersToDelete.length);
  }, [usersToDelete]);

  const setUsersToBeDeleted = (ids) => {
    setUsersToDelete((prevState) => [...prevState, ...ids]);
  };

  const processing = !props.isLoaded || isOperating;

  const handleGetUsers = async () => {
    fetchUsers().then((res) => {
      setUsers(res);
      props.setIsLoaded(true);
      setIsOperating(false);
    });
  };

  const handleAddUser = async (user) => {
    setIsOperating(true);
    addUser(user)
      .then((response) => {
        if (response === true) {
          snackbar.success("L'utilisateur a bien ete ajoute");
          setOpenUserDialog(false);
          setIsOperating(false);
          setUsers();
          handleGetUsers();
        } else {
          snackbar.error("Une erreur est survenue a l'ajout");
          setIsOperating(false);
        }
      })
      .catch((errno) => {
        snackbar.error("Une erreur est survenue a l'ajout");
        setIsOperating(false);
      });
  };

  const handleDeleteUsers = async () => {
    setIsOperating(true);
    console.log("USERS TO DELETE PASSED ", usersToDelete, usersToDelete.length);
    deleteUsers(usersToDelete)
      .then((result) => {
        if (result === true) {
          snackbar.success("L'utilisateur a bien ete supprime");
          setSelected([]);
          setOpenConfirmDeleteDialog(false);
          setIsOperating(false);
          setUsersToDelete([]);
          setUsers();
          handleGetUsers();
        } else {
          snackbar.error("Une erreur est survenue a la suppression");
          setIsOperating(false);
        }
      })
      .catch(() => {
        snackbar.error("Une erreur est survenue a la suppression");
        setIsOperating(false);
      });
  };

  const handleViewUser = async (user) => {};

  const handleCancelSelected = () => {
    setSelected([]);
  };

  const handleCloseConfirmDeleteDialog = () => {
    setOpenConfirmDeleteDialog(false);
    setSelected([]);
    setUsersToDelete([]);
  };

  const handleCloseUserDialog = () => {
    setUserUpdated(undefined);
    setOpenUserDialog(false);
  };

  const handleOpenConfirmDeleteDialog = (userIds) => {
    setUsersToBeDeleted(userIds);
    setOpenConfirmDeleteDialog(true);
  };

  const handleOpenUserDialog = (user) => {
    setUserUpdated(user);
    setOpenUserDialog(true);
  };

  const handleSelectedChange = (newSelected) => {
    setSelected(newSelected);
  };

  return (
    <React.Fragment>
      {!selected.length ? (
        <AdminToolbar title={"Utilisateurs"}>
          <Fab
            aria-label="logout"
            color="primary"
            disabled={processing}
            onClick={() => handleOpenUserDialog()}
            size="medium"
            sx={{
              zIndex: 0,
            }}
          >
            <AddIcon />
          </Fab>
        </AdminToolbar>
      ) : (
        <SelectToolbar
          processing={processing}
          onCancel={handleCancelSelected}
          onDelete={handleOpenConfirmDeleteDialog}
          selected={selected}
        />
      )}
      <UserTable
        processing={processing}
        onDelete={handleOpenConfirmDeleteDialog}
        onView={handleOpenUserDialog}
        onSelectedChange={handleSelectedChange}
        selected={selected}
        users={users}
      />
      <ConfirmDialog
        description={"Cette action sera irreversible !"}
        pending={processing}
        onClose={handleCloseConfirmDeleteDialog}
        onConfirm={handleDeleteUsers}
        open={openConfirmDeleteDialog}
        title={"Confirmez vous la suppression ?"}
      />
      {openUserDialog && (
        <UserDialog
          onAdd={handleAddUser}
          onClose={handleCloseUserDialog}
          onView={handleViewUser}
          open={openUserDialog}
          processing={processing}
          user={userUpdated}
        />
      )}
    </React.Fragment>
  );
};

export default UserManagement;
