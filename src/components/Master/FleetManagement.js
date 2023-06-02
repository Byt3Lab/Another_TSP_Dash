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
import GarageIcon from "@mui/icons-material/Garage";
import MinorCrashIcon from "@mui/icons-material/MinorCrash";
import DriverRequestsTable from "../DriverRequestsTable";
import DriversTable from "../DriversTable";
import { fetchDriversApplications } from "../../hooks/getDriversApplications";
import ConfirmValidateDriverDialog from "../ConfirmValidateDriverDialog";
import { updateDriverRequest } from "../../hooks/updateDriverRequest";
import { deleteDriversApplications } from "../../hooks/deleteDriversApplication";
import { addDriver } from "../../hooks/addDriver";
import DriverRequestDialog from "../DriverRequestDialog";

const FleetManagement = (props) => {
  const snackbar = useSnackbar();

  const [
    openConfirmApplicationDeleteDialog,
    setOpenConfirmApplicationDeleteDialog,
  ] = useState(false);
  const [
    openConfirmApplicationValidateDialog,
    setOpenConfirmApplicationValidateDialog,
  ] = useState(false);
  const [openConfirmDriverDeleteDialog, setOpenConfirmDriverDeleteDialog] =
    useState(false);
  const [openApplicationDialog, setOpenApplicationDialog] = useState(false);
  const [openDriverDialog, setOpenDriverDialog] = useState(false);
  const [applicationsSelected, setApplicationsSelected] = useState([]);
  const [selectedDrivers, setSelectedDrivers] = useState([]);
  const [applicationsToDelete, setApplicationsToDelete] = useState([]);
  const [applicationsToValidate, setApplicationsToValidate] = useState([]);
  const [driversToDelete, setDriversToDelete] = useState([]);
  const [applicationUpdated, setApplicationUpdated] = useState(undefined);
  const [driverUpdated, setDriverUpdated] = useState(undefined);
  const [applications, setApplications] = useState();
  const [drivers, setDrivers] = useState();
  const [isOperating, setIsOperating] = useState(props.isLoaded);
  const [initialTab, setInitialTab] = React.useState(0);
  const processing = !props.isLoaded || isOperating;

  useEffect(() => {
    props.setIsLoaded(false);
    setApplications();
    setDrivers();
    handleGetApplications();
    handleGetDrivers();
  }, []);

  useEffect(() => {
    //console.log("USERS TO DELETE IDS ", driversToDelete, driversToDelete.length);
  }, [applicationsToDelete, driversToDelete, applicationsToValidate, drivers]);

  const setApplicationsToBeDeleted = (ids) => {
    setApplicationsToDelete((prevState) => [...prevState, ...ids]);
  };

  const setApplicationsToBeValidated = (ids) => {
    setApplicationsToValidate((prevState) => [...prevState, ...ids]);
  };

  const setDriversToBeDeleted = (ids) => {
    setDriversToDelete((prevState) => [...prevState, ...ids]);
  };

  const handleGetApplications = async () => {
    fetchDriversApplications().then((res) => {
      setApplications(res);
      props.setIsLoaded(true);
      setIsOperating(false);
    });
  };

  const handleGetDrivers = async () => {
    fetchDrivers().then((res) => {
      setDrivers(res);
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
          setDrivers();
          handleGetDrivers();
          setApplications();
          handleGetApplications();
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

  const handleDeleteApplications = async () => {
    setIsOperating(true);
    console.log(
      "APPLICATIONS TO DELETE PASSED ",
      applicationsToDelete,
      applicationsToDelete.length
    );
    deleteDriversApplications(applicationsToDelete)
      .then((result) => {
        if (result === true) {
          snackbar.success("La requête a bien ete supprimée.");
          setApplicationsSelected([]);
          setOpenConfirmApplicationDeleteDialog(false);
          setIsOperating(false);
          setApplicationsToDelete([]);
          setApplications();
          handleGetApplications();
          setDrivers();
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

  const handleValidateApplication = async () => {
    setIsOperating(true);
    console.log(
      "APPLICATIONS TO VALIDATE PASSED ",
      applicationsToValidate,
      applicationsToValidate.length
    );
    updateDriverRequest(applicationsToValidate)
      .then((result) => {
        if (result === true) {
          snackbar.success("La requête a bien ete validée.");
          setApplicationsSelected([]);
          setOpenConfirmApplicationValidateDialog(false);
          setIsOperating(false);
          setApplicationsToDelete([]);
          setApplications();
          handleGetApplications();
          setDrivers();
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
          setDrivers();
          handleGetDrivers();
          setApplications();
          handleGetApplications();
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

  const handleViewApplication = async (application) => {};

  const handleViewDriver = async (driver) => {};

  const handleCancelSelectedApplications = () => {
    setApplicationsSelected([]);
  };

  const handleCancelSelectedDriver = () => {
    setSelectedDrivers([]);
  };

  const handleCloseConfirmApplicationDeleteDialog = () => {
    setOpenConfirmApplicationDeleteDialog(false);
    setApplicationsSelected([]);
    setApplicationsToDelete([]);
  };

  const handleCloseConfirmApplicationValidateDialog = () => {
    setOpenConfirmApplicationValidateDialog(false);
    setApplicationsToValidate([]);
  };

  const handleCloseConfirmDriverDeleteDialog = () => {
    setOpenConfirmDriverDeleteDialog(false);
    setSelectedDrivers([]);
    setDriversToDelete([]);
  };

  const handleCloseApplicationDialog = () => {
    setApplicationUpdated(undefined);
    setOpenApplicationDialog(false);
  };

  const handleCloseDriverDialog = () => {
    setDriverUpdated(undefined);
    setOpenDriverDialog(false);
  };

  const handleOpenConfirmApplicationDeleteDialog = (applicationIds) => {
    setApplicationsToBeDeleted(applicationIds);
    setOpenConfirmApplicationDeleteDialog(true);
  };

  const handleOpenConfirmApplicationValidateDialog = (applicationIds) => {
    setApplicationsToBeValidated(applicationIds);
    setOpenConfirmApplicationValidateDialog(true);
  };

  const handleOpenConfirmDriverDeleteDialog = (driverIds) => {
    setDriversToBeDeleted(driverIds);
    // console.log("DRIVERS TO BE DELETED ", driverIds);
    setOpenConfirmDriverDeleteDialog(true);
  };

  const handleOpenApplicationDialog = (application) => {
    setApplicationUpdated(application);
    setOpenApplicationDialog(true);
  };

  const handleOpenDriverDialog = (driver) => {
    setDriverUpdated(driver);
    setOpenDriverDialog(true);
  };

  const handleSelectedApplicationsChange = (newSelected) => {
    setApplicationsSelected(newSelected);
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
              width: "50%",
            }}
          >
            <Tab
              icon={<MinorCrashIcon />}
              iconPosition="start"
              label="Nouvelles requêtes"
              wrapped={false}
              sx={{
                marginRight: "5%",
              }}
            />
            <Tab
              icon={<GarageIcon />}
              iconPosition="start"
              label="Chauffeurs TS+"
            />
          </Tabs>
        </div>
        {initialTab === 0 ? (
          !applicationsSelected.length ? (
            <AdminToolbar title={"Requêtes en attente"}></AdminToolbar>
          ) : (
            <SelectToolbar
              processing={processing}
              onCancel={handleCancelSelectedApplications}
              onDelete={handleOpenConfirmApplicationDeleteDialog}
              selected={applicationsSelected}
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
          <DriverRequestsTable
            processing={processing}
            onDelete={handleOpenConfirmApplicationDeleteDialog}
            onValidate={handleOpenConfirmApplicationValidateDialog}
            onView={handleOpenApplicationDialog}
            onSelectedChange={handleSelectedApplicationsChange}
            selected={applicationsSelected}
            applications={applications}
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
              onClose={handleCloseConfirmApplicationDeleteDialog}
              onConfirm={handleDeleteApplications}
              open={openConfirmApplicationDeleteDialog}
              title={"Supprimer la requête ?"}
            />
            <ConfirmValidateDriverDialog
              description={
                "Cet utilisateur aura désormais un status de chauffeur."
              }
              pending={processing}
              onClose={handleCloseConfirmApplicationValidateDialog}
              onConfirm={handleValidateApplication}
              open={openConfirmApplicationValidateDialog}
              title={"Voulez vous vraiment valider cette requête ?"}
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
          ? openApplicationDialog && (
              <DriverRequestDialog
                index={initialTab}
                onClose={handleCloseApplicationDialog}
                onView={handleViewApplication}
                open={openApplicationDialog}
                processing={processing}
                driver={applicationUpdated}
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

export default FleetManagement;
