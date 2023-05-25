import { Fab, Tab, Tabs } from "@mui/material";
import React, { useState, useEffect } from "react";
import AdminToolbar from "../AdminToolbar";
import ConfirmDialog from "../ConfirmDialog";
import SelectToolbar from "../SelectToolbar";
import { useSnackbar } from "../../contexts/SnackbarProvider";
import DriverDialog from "../DriverDialog";
import { fetchDrivers } from "../../hooks/getDrivers";
import { deleteDrivers } from "../../hooks/deleteDrivers";
import AddIcon from "@mui/icons-material/Add";
import DriversTable from "../DriversTable";
import { addDriver } from "../../hooks/addDriver";
import HailIcon from "@mui/icons-material/Hail";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import PoolingRequestsTable from "../PoolingRequestsTable";
import { fetchPoolingRequests } from "../../hooks/getPoolingRequests";
import UpdateRequestStatusDialog from "../UpdateRequestStatusDialog";
import { updateBookingRequestStatus } from "../../hooks/updateBookingRequestStatus";
import PoolingRequestDialog from "../PoolingRequestDialog";
import { deletePoolingRequests } from "../../hooks/deletePoolingRequests";

const CommandsManagement = (props) => {
  const snackbar = useSnackbar();

  const [
    openConfirmPoolingRequestDeleteDialog,
    setOpenConfirmPoolingRequestDeleteDialog,
  ] = useState(false);
  const [openRequestStatusUpdateDialog, setOpenRequestStatusUpdateDialog] =
    useState(false);
  const [openConfirmDriverDeleteDialog, setOpenConfirmDriverDeleteDialog] =
    useState(false);
  const [openPoolingRequestDialog, setOpenPoolingRequestDialog] =
    useState(false);
  const [openDriverDialog, setOpenDriverDialog] = useState(false);
  const [poolingsSelected, setPoolingsSelected] = useState([]);
  const [selectedDrivers, setSelectedDrivers] = useState([]);
  const [poolingRequestsToDelete, setPoolingRequestsToDelete] = useState([]);
  const [requestsToUpdate, setRequestsToUpdate] = useState([]);
  const [driversToDelete, setDriversToDelete] = useState([]);
  const [poolingUpdated, setPoolingUpdated] = useState(undefined);
  const [driverUpdated, setDriverUpdated] = useState(undefined);
  const [poolings, setPoolings] = useState();
  const [drivers, setDrivers] = useState([]);
  const [isOperating, setIsOperating] = useState(props.isLoaded);
  const [initialTab, setInitialTab] = React.useState(0);
  const processing = !props.isLoaded || isOperating;
  const [statusChoice, setStatusChoice] = useState(``);

  useEffect(() => {
    props.setIsLoaded(false);
    setPoolings();
    setDrivers([]);
    handleGetPoolings();
    handleGetDrivers();
  }, []);

  useEffect(() => {
    //console.log("USERS TO DELETE IDS ", driversToDelete, driversToDelete.length);
  }, [
    poolingRequestsToDelete,
    driversToDelete,
    requestsToUpdate,
    drivers,
    poolings,
  ]);

  const setPoolingRequestsToBeDeleted = (ids) => {
    setPoolingRequestsToDelete((prevState) => [...prevState, ...ids]);
  };

  const setRequestsToBeUpdated = (ids) => {
    setRequestsToUpdate((prevState) => [...prevState, ...ids]);
  };

  const setDriversToBeDeleted = (ids) => {
    setDriversToDelete((prevState) => [...prevState, ...ids]);
  };

  const handleGetPoolings = async () => {
    fetchPoolingRequests().then((res) => {
      setPoolings(res);
      props.setIsLoaded(true);
      setIsOperating(false);
    });
  };

  const handleGetDrivers = async () => {
    fetchDrivers().then((res) => {
      setDrivers((prevState) => [...prevState, ...res]);
      props.setIsLoaded(true);
      setIsOperating(false);
    });
  };

  const handleAddDriver = async (driver) => {
    setIsOperating(true);
    addDriver(driver)
      .then((response) => {
        if (response === true) {
          snackbar.success("Le chauffeur a bien ete ajouté.");
          setOpenDriverDialog(false);
          setIsOperating(false);
          setDrivers([]);
          handleGetDrivers();
          setPoolings();
          handleGetPoolings();
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

  const handleDeletePoolingRequests = async () => {
    setIsOperating(true);
    console.log(
      "POOLING REQUESTS TO DELETE PASSED ",
      poolingRequestsToDelete,
      poolingRequestsToDelete.length
    );
    deletePoolingRequests(poolingRequestsToDelete)
      .then((result) => {
        if (result === true) {
          snackbar.success(
            "La / Les requête(s) de co-voiturage a / ont bien ete supprimée(s)."
          );
          setPoolingsSelected([]);
          setOpenConfirmPoolingRequestDeleteDialog(false);
          setIsOperating(false);
          setPoolingRequestsToDelete([]);
          setPoolings();
          handleGetPoolings();
          setDrivers([]);
          handleGetDrivers();
        } else {
          snackbar.error("Une erreur est survenue lors de la suppression");
          setIsOperating(false);
        }
      })
      .catch(() => {
        snackbar.error("Une erreur est survenue lors de la suppression");
        setIsOperating(false);
      });
  };

  const handleUpdatePooling = async () => {
    setIsOperating(true);
    console.log(
      "REQUESTS TO UPDATE PASSED ",
      requestsToUpdate,
      requestsToUpdate.length,
      "WITH STATUS ",
      statusChoice
    );
    updateBookingRequestStatus(requestsToUpdate, statusChoice)
      .then((result) => {
        if (result === true) {
          snackbar.success("Requête(s) mise(s) à jour.");
          setPoolingsSelected([]);
          setOpenRequestStatusUpdateDialog(false);
          setRequestsToUpdate([]);
          setIsOperating(false);
          setPoolingRequestsToDelete([]);
          setPoolings();
          handleGetPoolings();
          setDrivers([]);
          handleGetDrivers();
        } else {
          snackbar.error("Une erreur est survenue lors de la validation");
          setIsOperating(false);
        }
      })
      .catch(() => {
        snackbar.error("Une erreur est survenue lors de la validation");
        setIsOperating(false);
      });
  };

  const handleDeleteDrivers = async () => {
    setIsOperating(true);
    // console.log(
    //   "DRIVERS TO DELETE PASSED ",
    //   driversToDelete,
    //   driversToDelete.length
    // );
    deleteDrivers(driversToDelete)
      .then((result) => {
        if (result === true) {
          snackbar.success("Le chauffeur a bien ete supprimé !");
          setSelectedDrivers([]);
          setOpenConfirmDriverDeleteDialog(false);
          setIsOperating(false);
          setDriversToDelete([]);
          setDrivers([]);
          handleGetDrivers();
          setPoolings();
          handleGetPoolings();
        } else {
          snackbar.error("Une erreur est survenue lors de la suppression...");
          setIsOperating(false);
        }
      })
      .catch(() => {
        snackbar.error("Une erreur est survenue de la la suppression...");
        setIsOperating(false);
      });
  };

  const handleViewPoolingRequest = async (application) => {};

  const handleViewDriver = async (driver) => {};

  const handleCancelSelectedPoolingRequests = () => {
    setPoolingsSelected([]);
  };

  const handleCancelSelectedDriver = () => {
    setSelectedDrivers([]);
  };

  const handleCloseConfirmPoolingRequestDeleteDialog = () => {
    setOpenConfirmPoolingRequestDeleteDialog(false);
    setPoolingsSelected([]);
    setPoolingRequestsToDelete([]);
  };

  const handleCloseRequestUpdateDialog = () => {
    setOpenRequestStatusUpdateDialog(false);
    setRequestsToUpdate([]);
  };

  const handleCloseConfirmDriverDeleteDialog = () => {
    setOpenConfirmDriverDeleteDialog(false);
    setSelectedDrivers([]);
    setDriversToDelete([]);
  };

  const handleClosePoolingRequestDialog = () => {
    setPoolingUpdated(undefined);
    setOpenPoolingRequestDialog(false);
  };

  const handleCloseDriverDialog = () => {
    setDriverUpdated(undefined);
    setOpenDriverDialog(false);
  };

  const handleOpenConfirmPoolingRequestDeleteDialog = (applicationIds) => {
    setPoolingRequestsToBeDeleted(applicationIds);
    setOpenConfirmPoolingRequestDeleteDialog(true);
  };

  const handleOpenRequestStatusDialog = (requestsIds, status) => {
    setRequestsToBeUpdated(requestsIds);
    setStatusChoice(status);
    setOpenRequestStatusUpdateDialog(true);
  };

  const handleOpenConfirmDriverDeleteDialog = (driverIds) => {
    setDriversToBeDeleted(driverIds);
    // console.log("DRIVERS TO BE DELETED ", driverIds);
    setOpenConfirmDriverDeleteDialog(true);
  };

  const handleOpenPoolingRequestDialog = (application) => {
    setPoolingUpdated(application);
    setOpenPoolingRequestDialog(true);
  };

  const handleOpenDriverDialog = (driver) => {
    setDriverUpdated(driver);
    setOpenDriverDialog(true);
  };

  const handleSelectedPoolingsChange = (newSelected) => {
    setPoolingsSelected(newSelected);
  };

  const handleSelectedDriversChange = (newSelected) => {
    setSelectedDrivers(newSelected);
  };

  const handleChangeTab = (event, newValue) => {
    setInitialTab(newValue);
  };

  return (
    <React.Fragment>
      <div className="pb-20">
        <div className="w-full px-2 py-4 flex items-center justify-center">
          <Tabs
            value={initialTab}
            onChange={handleChangeTab}
            indicatorColor="transparent"
            aria-label="fleet management tabs"
            variant="fullWidth"
            centered
            sx={{
              padding: "10px 20px",
              width: "70%",
            }}
          >
            <Tab
              icon={<HailIcon />}
              iconPosition="start"
              label="Requêtes de taxi"
              wrapped={false}
              sx={{
                marginRight: "5%",
              }}
            />
            <Tab
              icon={<CardMembershipIcon />}
              iconPosition="start"
              label="Abonnements TS+"
              wrapped={false}
              sx={{
                marginRight: "5%",
              }}
            />
            <Tab
              icon={<LocalGasStationIcon />}
              iconPosition="start"
              label="Abonnements Carburant"
              wrapped={false}
            />
          </Tabs>
        </div>
        {initialTab === 0 ? (
          !poolingsSelected.length ? (
            <AdminToolbar title={"Requêtes de covoiturage"}></AdminToolbar>
          ) : (
            <SelectToolbar
              processing={processing}
              onCancel={handleCancelSelectedPoolingRequests}
              onDelete={handleOpenConfirmPoolingRequestDeleteDialog}
              selected={poolingsSelected}
              onUpdateRequestsStatus={handleOpenRequestStatusDialog}
            />
          )
        ) : !selectedDrivers.length ? (
          <AdminToolbar title={"Chauffeurs TS+"}>
            <Fab
              aria-label="logout"
              color="primary"
              disabled={processing}
              onClick={() => handleOpenDriverDialog()}
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
            onCancel={handleCancelSelectedDriver}
            onDelete={handleOpenConfirmDriverDeleteDialog}
            selected={selectedDrivers}
          />
        )}

        {initialTab === 0 ? (
          <PoolingRequestsTable
            processing={processing}
            onDelete={handleOpenConfirmPoolingRequestDeleteDialog}
            onStatusChange={handleOpenRequestStatusDialog}
            onView={handleOpenPoolingRequestDialog}
            onSelectedChange={handleSelectedPoolingsChange}
            selected={poolingsSelected}
            requests={poolings}
          />
        ) : (
          <DriversTable
            processing={processing}
            onDelete={handleOpenConfirmDriverDeleteDialog}
            onView={handleOpenDriverDialog}
            onSelectedChange={handleSelectedDriversChange}
            selected={selectedDrivers}
            drivers={drivers}
          />
        )}
        {initialTab === 0 ? (
          <>
            <ConfirmDialog
              description={"Cette action sera irreversible !"}
              pending={processing}
              onClose={handleCloseConfirmPoolingRequestDeleteDialog}
              onConfirm={handleDeletePoolingRequests}
              open={openConfirmPoolingRequestDeleteDialog}
              title={"Supprimer la / les requête(s) ?"}
            />
            <UpdateRequestStatusDialog
              pending={processing}
              onClose={handleCloseRequestUpdateDialog}
              onConfirm={handleUpdatePooling}
              open={openRequestStatusUpdateDialog}
              title={"Quel sera le nouveau status ?"}
              description={
                "Le status sera appliqué à toutes les requêtes sélectionnées."
              }
              statusChoice={statusChoice}
              setStatusChoice={setStatusChoice}
            />
          </>
        ) : (
          <ConfirmDialog
            description={"Cette action sera irreversible !"}
            pending={processing}
            onClose={handleCloseConfirmDriverDeleteDialog}
            onConfirm={handleDeleteDrivers}
            open={openConfirmDriverDeleteDialog}
            title={"Supprimer le(s) chauffeur ?"}
          />
        )}
        {initialTab === 0
          ? openPoolingRequestDialog && (
              <PoolingRequestDialog
                index={initialTab}
                onClose={handleClosePoolingRequestDialog}
                onView={handleViewPoolingRequest}
                open={openPoolingRequestDialog}
                processing={processing}
                pooling={poolingUpdated}
              />
            )
          : openDriverDialog && (
              <DriverDialog
                index={initialTab}
                onAdd={handleAddDriver}
                onClose={handleCloseDriverDialog}
                onView={handleViewDriver}
                open={openDriverDialog}
                processing={processing}
                driver={driverUpdated}
              />
            )}
      </div>
    </React.Fragment>
  );
};

export default CommandsManagement;
