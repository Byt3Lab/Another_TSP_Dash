import { Fab } from "@mui/material";
import React, { useState, useEffect } from "react";
import AdminToolbar from "./AdminToolbar";
import ConfirmDialog from "./ConfirmDialog";
import SelectToolbar from "./SelectToolbar";
import { useSnackbar } from "../contexts/SnackbarProvider";
import UserDialog from "./UserDialog";
import UserTable from "./UserTable";
import { fetchUsers } from "../hooks/getUsers";
import { useDeleteUsers } from "../hooks/deleteUsers";
import { useUpdateUser } from "../hooks/updateUser";
import { addUser } from "../hooks/addUser";
import AddIcon from "@mui/icons-material/Add";

const UserManagement = (props) => {
  const snackbar = useSnackbar();

  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false);
  const [openUserDialog, setOpenUserDialog] = useState(false);
  const [selected, setSelected] = useState([]);
  const [userDeleted, setUserDeleted] = useState([]);
  const [userUpdated, setUserUpdated] = useState(undefined);
  const { isUpdating, updateUser } = useUpdateUser();
  const { deleteUsers, isDeleting } = useDeleteUsers();
  const [users, setUsers] = useState([]);
  const [isOperating, setIsOperating] = useState(props.isLoaded);

  useEffect(() => {
    props.setIsLoaded(false);
    handleGetUsers();
  }, []);

  const processing = !props.isLoaded || isOperating;

  const handleGetUsers = async () => {
    fetchUsers().then((res) => {
      setUsers((prevState) => [...prevState, ...res]);
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
          setUsers([]);
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
    deleteUsers(userDeleted)
      .then(() => {
        snackbar.success("L'utilisateur a bien ete supprime");
        setSelected([]);
        setUserDeleted([]);
        setOpenConfirmDeleteDialog(false);
      })
      .catch(() => {
        snackbar.error("Une erreur est survenue a la suppression");
      });
  };

  const handleUpdateUser = async (user) => {
    updateUser(user)
      .then(() => {
        snackbar.success("L'utilisateur a bien ete mis a jour");
        setOpenUserDialog(false);
      })
      .catch(() => {
        snackbar.error("Une erreur est survenue a la mise a jour");
      });
  };

  const handleCancelSelected = () => {
    setSelected([]);
  };

  const handleCloseConfirmDeleteDialog = () => {
    setOpenConfirmDeleteDialog(false);
  };

  const handleCloseUserDialog = () => {
    setUserUpdated(undefined);
    setOpenUserDialog(false);
  };

  const handleOpenConfirmDeleteDialog = (userIds) => {
    setUserDeleted(userIds);
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
        onEdit={handleOpenUserDialog}
        onSelectedChange={handleSelectedChange}
        selected={selected}
        users={users}
      />
      <ConfirmDialog
        description={"Ceci sera irreversible"}
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
          onUpdate={handleUpdateUser}
          open={openUserDialog}
          processing={processing}
          user={userUpdated}
        />
      )}
    </React.Fragment>
  );
};

export default UserManagement;
