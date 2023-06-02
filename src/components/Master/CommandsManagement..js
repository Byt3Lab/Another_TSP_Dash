import { Fab, Tab, Tabs } from "@mui/material";
import React, { useState, useEffect } from "react";
import AdminToolbar from "../AdminToolbar";
import ConfirmDialog from "../ConfirmDialog";
import SelectToolbar from "../SelectToolbar";
import { useSnackbar } from "../../contexts/SnackbarProvider";
import { fetchFuelings } from "../../hooks/getFuelings";
import { deleteFuelings } from "../../hooks/deleteFuelings";
import AddIcon from "@mui/icons-material/Add";
import { addFueling } from "../../hooks/addFueling";
import HailIcon from "@mui/icons-material/Hail";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import PoolingRequestsTable from "../PoolingRequestsTable";
import { fetchPoolingRequests } from "../../hooks/getPoolingRequests";
import UpdateRequestStatusDialog from "../UpdateRequestStatusDialog";
import { updateBookingRequestStatus } from "../../hooks/updateBookingRequestStatus";
import PoolingRequestDialog from "../PoolingRequestDialog";
import { deletePoolingRequests } from "../../hooks/deletePoolingRequests";
import SubscriptionsTable from "../SubscriptionsTable";
import { fetchSubscriptions } from "../../hooks/getCarSubscriptions";
import SubscriptionDialog from "../SubscriptionDialog";
import ConfirmValidateSubscriptionDialog from "../ConfirmValidateSubscriptionDialog";
import { updateSubscription } from "../../hooks/updateSubscription";
import { addSubscription } from "../../hooks/addSubscription";
import { deleteSubscriptions } from "../../hooks/deleteSubscriptions";
import FuelingsTable from "../FuelingsTable";
import FuelingsDialog from "../FuelingsDialog";
import { FuelingPdf } from "../FuelingPdf";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import FuelingExportDialog from "../FuelingsExportDialog";

const CommandsManagement = (props) => {
  const snackbar = useSnackbar();

  const [
    openConfirmPoolingRequestDeleteDialog,
    setOpenConfirmPoolingRequestDeleteDialog,
  ] = useState(false);
  const [
    openConfirmSubscriptionDeleteDialog,
    setOpenConfirmSubscriptionDeleteDialog,
  ] = useState(false);
  const [openConfirmFuelingDeleteDialog, setOpenConfirmFuelingDeleteDialog] =
    useState(false);
  const [openRequestStatusUpdateDialog, setOpenRequestStatusUpdateDialog] =
    useState(false);
  const [openPoolingRequestDialog, setOpenPoolingRequestDialog] =
    useState(false);
  const [
    openConfirmSubscriptionValidateDialog,
    setOpenConfirmSubscriptionValidateDialog,
  ] = useState(false);
  const [openSubscriptionDialog, setOpenSubscriptionDialog] = useState(false);
  const [openFuelingDialog, setOpenFuelingDialog] = useState(false);
  const [openFuelingExportDialog, setOpenFuelingExportDialog] = useState(false);
  const [poolingsSelected, setPoolingsSelected] = useState([]);
  const [subscriptionsSelected, setSubscriptionsSelected] = useState([]);
  const [selectedFuelings, setSelectedFuelings] = useState([]);
  const [requestsToUpdate, setRequestsToUpdate] = useState([]);
  const [poolingRequestsToDelete, setPoolingRequestsToDelete] = useState([]);
  const [subscriptionsToDelete, setSubscriptionsToDelete] = useState([]);
  const [fuelingsToDelete, setFuelingsToDelete] = useState([]);
  const [subscriptionsToValidate, setSubscriptionsToValidate] = useState([]);
  const [poolingUpdated, setPoolingUpdated] = useState(undefined);
  const [subscriptionUpdated, setSubscriptionUpdated] = useState(undefined);
  const [fuelingUpdated, setFuelingUpdated] = useState(undefined);
  const [fuelingExportUpdated, setFuelingExportUpdated] = useState(undefined);
  const [poolings, setPoolings] = useState();
  const [subscriptions, setSubscriptions] = useState();
  const [fuelings, setFuelings] = useState();
  const [isOperating, setIsOperating] = useState(props.isLoaded);
  const [initialTab, setInitialTab] = React.useState(0);
  const processing = !props.isLoaded || isOperating;
  const [statusChoice, setStatusChoice] = useState(``);

  useEffect(() => {
    props.setIsLoaded(false);
    setPoolings();
    setSubscriptions();
    setFuelings();
    handleGetPoolings();
    handleGetSubscriptions();
    handleGetFuelings();
  }, []);

  useEffect(() => {
    //console.log("USERS TO DELETE IDS ", fuelingsToDelete, fuelingsToDelete.length);
  }, [
    poolingRequestsToDelete,
    subscriptionsToDelete,
    fuelingsToDelete,
    requestsToUpdate,
    poolings,
    subscriptions,
    fuelings,
  ]);

  const setSubscriptionsToBeValidated = (ids) => {
    setSubscriptionsToValidate((prevState) => [...prevState, ...ids]);
  };

  const setPoolingRequestsToBeDeleted = (ids) => {
    setPoolingRequestsToDelete((prevState) => [...prevState, ...ids]);
  };

  const setSubscriptionsToBeDeleted = (ids) => {
    setSubscriptionsToDelete((prevState) => [...prevState, ...ids]);
  };

  const setFuelingsToBeDeleted = (ids) => {
    setFuelingsToDelete((prevState) => [...prevState, ...ids]);
  };

  const setRequestsToBeUpdated = (ids) => {
    setRequestsToUpdate((prevState) => [...prevState, ...ids]);
  };

  const handleGetPoolings = async () => {
    fetchPoolingRequests().then((res) => {
      setPoolings(res);
      props.setIsLoaded(true);
      setIsOperating(false);
    });
  };

  const handleGetSubscriptions = async () => {
    fetchSubscriptions().then((res) => {
      setSubscriptions(res);
      props.setIsLoaded(true);
      setIsOperating(false);
    });
  };

  const handleGetFuelings = async () => {
    fetchFuelings().then((res) => {
      setFuelings(res);
      props.setIsLoaded(true);
      setIsOperating(false);
    });
  };

  const handleAddSubscription = async (subscription) => {
    setIsOperating(true);
    addSubscription(subscription)
      .then((response) => {
        if (response === true) {
          snackbar.success("L'abonnement' a bien ete ajouté.");
          setOpenSubscriptionDialog(false);
          setIsOperating(false);
          setSubscriptions();
          handleGetSubscriptions();
          setFuelings();
          handleGetFuelings();
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

  const handleAddFueling = async (fueling) => {
    setIsOperating(true);
    addFueling(fueling)
      .then((response) => {
        if (response === true) {
          snackbar.success("L'abonnement' a bien ete ajouté.");
          setOpenFuelingDialog(false);
          setIsOperating(false);
          setFuelings();
          handleGetFuelings();
          setPoolings();
          handleGetPoolings();
          setSubscriptions();
          handleGetSubscriptions();
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
          setFuelings();
          handleGetFuelings();
          setSubscriptions();
          handleGetSubscriptions();
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

  const handleDeleteSubscriptions = async () => {
    setIsOperating(true);
    console.log(
      "SUBS TO DELETE PASSED ",
      subscriptionsToDelete,
      subscriptionsToDelete.length
    );
    deleteSubscriptions(subscriptionsToDelete)
      .then((result) => {
        if (result === true) {
          snackbar.success("La souscription a bien ete supprimé !");
          setSubscriptionsSelected([]);
          setSubscriptionsToDelete([]);
          setOpenConfirmSubscriptionDeleteDialog(false);
          setIsOperating(false);
          setSubscriptions();
          handleGetSubscriptions();
          setFuelings();
          handleGetFuelings();
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

  const handleDeleteFuelings = async () => {
    setIsOperating(true);
    // console.log(
    //   "FUELINGS TO DELETE PASSED ",
    //   fuelingsToDelete,
    //   fuelingsToDelete.length
    // );
    deleteFuelings(fuelingsToDelete)
      .then((result) => {
        if (result === true) {
          snackbar.success("Abonnement(s) supprimé(s) !");
          setSelectedFuelings([]);
          setOpenConfirmFuelingDeleteDialog(false);
          setIsOperating(false);
          setFuelingsToDelete([]);
          setFuelings();
          handleGetFuelings();
          setPoolings();
          handleGetPoolings();
          setSubscriptions();
          handleGetSubscriptions();
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
          setSubscriptions();
          handleGetSubscriptions();
          setFuelings();
          handleGetFuelings();
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

  const handleValidateSubscription = async () => {
    setIsOperating(true);
    console.log(
      "SUBSCRIPTIONS TO VALIDATE PASSED ",
      subscriptionsToValidate,
      subscriptionsToValidate.length
    );
    updateSubscription(subscriptionsToValidate)
      .then((result) => {
        if (result === true) {
          snackbar.success("La souscription a bien ete validée.");
          setSubscriptionsSelected([]);
          setOpenConfirmSubscriptionValidateDialog(false);
          setIsOperating(false);
          setSubscriptionsToDelete([]);
          setPoolings();
          handleGetPoolings();
          setSubscriptions();
          handleGetSubscriptions();
          setFuelings();
          handleGetFuelings();
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

  const handleCloseFuelingExportDialog = () => {
    setFuelingExportUpdated(undefined);
    setOpenFuelingExportDialog(false);
  };
  const handleOpenFuelingExportDialog = (fueling) => {
    setFuelingExportUpdated(fueling);
    setOpenFuelingExportDialog(true);
  };

  const handleViewPoolingRequest = async (application) => {};

  const handleViewSubscription = async (sub) => {};

  const handleViewFueling = async (fueling) => {};

  const handleCancelSelectedPoolingRequests = () => {
    setPoolingsSelected([]);
  };

  const handleCancelSelectedSubscription = () => {
    setSubscriptionsSelected([]);
  };

  const handleCancelSelectedFueling = () => {
    setSelectedFuelings([]);
  };

  const handleCloseConfirmPoolingRequestDeleteDialog = () => {
    setOpenConfirmPoolingRequestDeleteDialog(false);
    setPoolingsSelected([]);
    setPoolingRequestsToDelete([]);
  };

  const handleCloseConfirmSubscriptionDeleteDialog = () => {
    setOpenConfirmSubscriptionDeleteDialog(false);
    setSubscriptionsSelected([]);
    setSubscriptionsToDelete([]);
  };

  const handleCloseConfirmFuelingDeleteDialog = () => {
    setOpenConfirmFuelingDeleteDialog(false);
    setSelectedFuelings([]);
    setFuelingsToDelete([]);
  };

  const handleCloseRequestUpdateDialog = () => {
    setOpenRequestStatusUpdateDialog(false);
    setRequestsToUpdate([]);
  };

  const handleClosePoolingRequestDialog = () => {
    setPoolingUpdated(undefined);
    setOpenPoolingRequestDialog(false);
  };

  const handleCloseSubscriptionDialog = () => {
    setSubscriptionUpdated(undefined);
    setOpenSubscriptionDialog(false);
  };

  const handleCloseFuelingDialog = () => {
    setFuelingUpdated(undefined);
    setOpenFuelingDialog(false);
  };

  const handleOpenConfirmPoolingRequestDeleteDialog = (applicationIds) => {
    setPoolingRequestsToBeDeleted(applicationIds);
    setOpenConfirmPoolingRequestDeleteDialog(true);
  };

  const handleOpenConfirmSubscriptionDeleteDialog = (subIds) => {
    setSubscriptionsToBeDeleted(subIds);
    // console.log("FUELINGS TO BE DELETED ", fuelingIds);
    setOpenConfirmSubscriptionDeleteDialog(true);
  };

  const handleOpenConfirmFuelingDeleteDialog = (fuelingIds) => {
    setFuelingsToBeDeleted(fuelingIds);
    // console.log("FUELINGS TO BE DELETED ", fuelingIds);
    setOpenConfirmFuelingDeleteDialog(true);
  };

  const handleOpenRequestStatusDialog = (requestsIds, status) => {
    setRequestsToBeUpdated(requestsIds);
    setStatusChoice(status);
    setOpenRequestStatusUpdateDialog(true);
  };

  const handleOpenPoolingRequestDialog = (application) => {
    setPoolingUpdated(application);
    setOpenPoolingRequestDialog(true);
  };

  const handleOpenSubscriptionDialog = (fueling) => {
    setSubscriptionUpdated(fueling);
    setOpenSubscriptionDialog(true);
  };

  const handleOpenFuelingDialog = (fueling) => {
    setFuelingUpdated(fueling);
    setOpenFuelingDialog(true);
  };

  const handleOpenConfirmSubscriptionValidateDialog = (applicationIds) => {
    setSubscriptionsToBeValidated(applicationIds);
    setOpenConfirmSubscriptionValidateDialog(true);
  };

  const handleCloseConfirmSubscriptionValidateDialog = () => {
    setOpenConfirmSubscriptionValidateDialog(false);
    setSubscriptionsToValidate([]);
  };

  const handleSelectedPoolingsChange = (newSelected) => {
    setPoolingsSelected(newSelected);
  };

  const handleSelectedSubscriptionsChange = (newSelected) => {
    setSubscriptionsSelected(newSelected);
  };

  const handleSelectedFuelingsChange = (newSelected) => {
    setSelectedFuelings(newSelected);
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
        ) : initialTab === 1 ? (
          !subscriptionsSelected.length ? (
            <AdminToolbar title={"Abonnements au service"}>
              <Fab
                aria-label="logout"
                color="primary"
                disabled={processing}
                onClick={() => handleOpenSubscriptionDialog()}
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
              onCancel={handleCancelSelectedSubscription}
              onDelete={handleOpenConfirmSubscriptionDeleteDialog}
              selected={subscriptionsSelected}
              onUpdateSubscriptionsStatus={
                handleOpenConfirmSubscriptionValidateDialog
              }
            />
          )
        ) : !selectedFuelings.length ? (
          <AdminToolbar title={"Abonnements carburant"}>
            <Fab
              aria-label="logout"
              color="primary"
              disabled={processing}
              onClick={() => handleOpenFuelingDialog()}
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
            onCancel={handleCancelSelectedFueling}
            onDelete={handleOpenConfirmFuelingDeleteDialog}
            selected={selectedFuelings}
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
        ) : initialTab === 1 ? (
          <SubscriptionsTable
            processing={processing}
            onDelete={handleOpenConfirmSubscriptionDeleteDialog}
            onValidate={handleOpenConfirmSubscriptionValidateDialog}
            onView={handleOpenSubscriptionDialog}
            onSelectedChange={handleSelectedSubscriptionsChange}
            selected={subscriptionsSelected}
            subs={subscriptions}
          />
        ) : (
          <FuelingsTable
            processing={processing}
            onDelete={handleOpenConfirmFuelingDeleteDialog}
            onView={handleOpenFuelingDialog}
            onExport={handleOpenFuelingExportDialog}
            onSelectedChange={handleSelectedFuelingsChange}
            selected={selectedFuelings}
            fuelings={fuelings}
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
        ) : initialTab === 1 ? (
          <>
            <ConfirmDialog
              description={"Cette action sera irreversible !"}
              pending={processing}
              onClose={handleCloseConfirmSubscriptionDeleteDialog}
              onConfirm={handleDeleteSubscriptions}
              open={openConfirmSubscriptionDeleteDialog}
              title={"Supprimer l' / les abonnement(s) ?"}
            />
            <ConfirmValidateSubscriptionDialog
              description={
                "Par ce faire, Vous confirmez avoir effectué les opérations nécessaires pour la validation de(s) (l')abonnement(s)."
              }
              pending={processing}
              onClose={handleCloseConfirmSubscriptionValidateDialog}
              onConfirm={handleValidateSubscription}
              open={openConfirmSubscriptionValidateDialog}
              title={"Voulez vous vraiment valider cet abonnement ?"}
            />
          </>
        ) : (
          <ConfirmDialog
            description={"Cette action sera irreversible !"}
            pending={processing}
            onClose={handleCloseConfirmFuelingDeleteDialog}
            onConfirm={handleDeleteFuelings}
            open={openConfirmFuelingDeleteDialog}
            title={"Supprimer la requête de carburant ?"}
          />
        )}
        {initialTab === 0 ? (
          openPoolingRequestDialog && (
            <PoolingRequestDialog
              index={initialTab}
              onClose={handleClosePoolingRequestDialog}
              onView={handleViewPoolingRequest}
              open={openPoolingRequestDialog}
              processing={processing}
              pooling={poolingUpdated}
            />
          )
        ) : initialTab === 1 ? (
          openSubscriptionDialog && (
            <SubscriptionDialog
              index={initialTab}
              onAdd={handleAddSubscription}
              onClose={handleCloseSubscriptionDialog}
              onView={handleViewSubscription}
              open={openSubscriptionDialog}
              processing={processing}
              subscription={subscriptionUpdated}
            />
          )
        ) : openFuelingDialog && !openFuelingExportDialog ? (
          <FuelingsDialog
            index={initialTab}
            onAdd={handleAddFueling}
            onClose={handleCloseFuelingDialog}
            onView={handleViewFueling}
            open={openFuelingDialog}
            processing={processing}
            fueling={fuelingUpdated}
          />
        ) : openFuelingExportDialog && !openFuelingDialog ? (
          <FuelingExportDialog
            onClose={handleCloseFuelingExportDialog}
            open={openFuelingExportDialog}
            processing={processing}
            fueling={fuelingExportUpdated}
          />
        ) : (
          ""
        )}
      </div>
    </React.Fragment>
  );
};

export default CommandsManagement;
