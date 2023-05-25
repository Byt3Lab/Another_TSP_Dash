import { useFormik } from "formik";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
  Box,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Grid,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { randomColor } from "../utils/randColorCode";

const PoolingRequestDialog = ({
  onAdd,
  onClose,
  onView,
  open,
  processing,
  pooling,
  index,
}) => {
  const viewMode = Boolean(onAdd != null);
  const [expanded, setExpanded] = useState(false);
  const [expandedTwo, setExpandedTwo] = useState(false);

  const handleExpand = () => (event, isExpanded) => {
    expanded ? setExpanded(false) : setExpanded(true);
  };
  const handleExpandTwo = () => (event, isExpanded) => {
    expandedTwo ? setExpandedTwo(false) : setExpandedTwo(true);
  };

  const formik = useFormik({
    initialValues: {
      approverName:
        pooling && pooling.approvedByBaseData
          ? pooling.approvedByBaseData.name
          : "",
      approverForename:
        pooling && pooling.approvedByBaseData
          ? pooling.approvedByBaseData.forename
          : "",
      approverPhone:
        pooling && pooling.approvedByCredsData
          ? pooling.approvedByCredsData.phone
          : "",
      approverMail:
        pooling && pooling.approvedByCredsData
          ? pooling.approvedByCredsData.mail
          : "",
      accountName: pooling ? pooling.userBaseData.name : "",
      accountForename: pooling ? pooling.userBaseData.forename : "",
      accountPhone: pooling ? pooling.userCredsData.phone : "",
      accountMail: pooling ? pooling.userCredsData.mail : "",
      arrivalAddress: pooling ? pooling.arrivalAddress : "",
      arrivalDistrict: pooling ? pooling.arrivalDistrict : "",
      arrivalReferencePoint: pooling ? pooling.arrivalReferencePoint : "",
      arrivalTime: pooling ? pooling.arrivalTime : "",
      departureAddress: pooling ? pooling.departureAddress : "",
      departureDistrict: pooling ? pooling.departureDistrict : "",
      departureReferencePoint: pooling ? pooling.departureReferencePoint : "",
      departureTime: pooling ? pooling.departureTime : "",
      paymentAmount: pooling ? pooling.paymentAmount : "",
      paymentMode: pooling ? pooling.paymentMode : "",
      phone: pooling ? pooling.phone : "",
      state: pooling ? pooling.state : "",
    },
  });

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="pooling-dialog-title"
    >
      <form onSubmit={formik.handleSubmit} noValidate>
        <DialogTitle id="pooling-dialog-title">
          {viewMode
            ? "Ajouter un chauffeur"
            : index === 0
            ? "Consulter la requête de co-voiturage"
            : "Consulter le profil du chauffeur"}
        </DialogTitle>
        <DialogContent>
          <Box marginBottom={3}>
            {!viewMode ? (
              <TextField
                margin="normal"
                required
                fullWidth
                id="state"
                label={"Etat de la requête"}
                name="state"
                disabled={true}
                value={
                  formik.values.state === "pending"
                    ? "En attente"
                    : formik.values.state === "ongoing"
                    ? "En cours"
                    : formik.values.state === "approved"
                    ? "Approuvée"
                    : formik.values.state === "canceled"
                    ? "Annulée"
                    : formik.values.state === "expired"
                    ? "Requête Expirée"
                    : formik.values.state === "done"
                    ? "Terminée"
                    : " - "
                }
              />
            ) : (
              ""
            )}
            {!viewMode ? (
              <TextField
                margin="normal"
                required
                fullWidth
                id="phone"
                label={"Numéro de téléphone (à contacter)"}
                name="phone"
                disabled={true}
                value={formik.values.phone}
              />
            ) : (
              ""
            )}
            {!viewMode ? (
              <TextField
                margin="normal"
                required
                fullWidth
                id="paymentMode"
                label={"Mode de paiement"}
                name="paymentMode"
                disabled={true}
                value={formik.values.paymentMode}
              />
            ) : (
              ""
            )}
            {!viewMode ? (
              <TextField
                margin="normal"
                required
                fullWidth
                id="paymentAmount"
                label={"Montant du paiement"}
                name="paymentAmount"
                disabled={true}
                value={`CDF ${formik.values.paymentAmount}`}
              />
            ) : (
              ""
            )}
            {!viewMode ? (
              <TextField
                margin="normal"
                required
                fullWidth
                id="departureTime"
                label={"Date et heure de départ (prévues pour le trajet)"}
                name="departureTime"
                disabled={true}
                value={new Date(pooling.departureTime)
                  .toLocaleString("fr-CG")
                  .toString()}
              />
            ) : (
              ""
            )}
            {!viewMode ? (
              <TextField
                margin="normal"
                required
                fullWidth
                id="departureReferencePoint"
                label={"Point de repère de départ"}
                name="departureReferencePoint"
                disabled={true}
                value={formik.values.departureReferencePoint}
              />
            ) : (
              ""
            )}
            {!viewMode ? (
              <TextField
                margin="normal"
                required
                fullWidth
                id="departureDistrict"
                label={"Commune de départ"}
                name="departureDistrict"
                disabled={true}
                value={formik.values.departureDistrict}
              />
            ) : (
              ""
            )}
            {!viewMode ? (
              <TextField
                margin="normal"
                required
                fullWidth
                id="departureAddress"
                label={"Adresse de départ"}
                name="departureAddress"
                disabled={true}
                value={formik.values.departureAddress}
              />
            ) : (
              ""
            )}
            {!viewMode ? (
              <TextField
                margin="normal"
                required
                fullWidth
                id="arrivalTime"
                label={"Date et heure d'arrivée (prévues pour le trajet)"}
                name="arrivalTime"
                disabled={true}
                value={new Date(pooling.arrivalTime)
                  .toLocaleString("fr-CG")
                  .toString()}
              />
            ) : (
              ""
            )}
            {!viewMode ? (
              <TextField
                margin="normal"
                required
                fullWidth
                id="arrivalReferencePoint"
                label={"Point de repère d'arrivée"}
                name="arrivalReferencePoint"
                disabled={true}
                value={formik.values.arrivalReferencePoint}
              />
            ) : (
              ""
            )}
            {!viewMode ? (
              <TextField
                margin="normal"
                required
                fullWidth
                id="arrivalDistrict"
                label={"Commune d'arrivée"}
                name="arrivalDistrict"
                disabled={true}
                value={formik.values.arrivalDistrict}
              />
            ) : (
              ""
            )}
            {!viewMode ? (
              <TextField
                margin="normal"
                required
                fullWidth
                id="arrivalAddress"
                label={"Adresse d'arrivée"}
                name="arrivalAddress"
                disabled={true}
                value={formik.values.arrivalAddress}
              />
            ) : (
              ""
            )}

            {!viewMode ? (
              <TextField
                margin="normal"
                required
                fullWidth
                id="created_at"
                label={"Date de création"}
                name="created_at"
                disabled={true}
                value={new Date(
                  pooling.created_at.seconds * 1000 +
                    pooling.created_at.nanoseconds / 1000000
                )
                  .toLocaleString("fr-CG")
                  .toString()}
              />
            ) : (
              ""
            )}
            {!viewMode && index === 0 ? (
              <TextField
                margin="normal"
                required
                fullWidth
                id="updated_at"
                label={"Date de la dernière mise à jour"}
                name="updated_at"
                disabled={true}
                value={new Date(
                  pooling.updated_at.seconds * 1000 +
                    pooling.updated_at.nanoseconds / 1000000
                )
                  .toLocaleString("fr-CG")
                  .toString()}
              />
            ) : (
              ""
            )}
          </Box>
          <Divider variant="middle" />
          <Box marginTop={3}>
            <Accordion
              expanded={expanded}
              onChange={handleExpand()}
              sx={{ backgroundColor: "#e8fff5" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel-content"
                id="panel-header"
              >
                <Typography sx={{ width: "100%", flexShrink: 0 }} variant="h6">
                  {"Informations supplémentaires sur le client"}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid
                  container
                  padding={2}
                  display={"inline-flex"}
                  alignItems={"center"}
                  justifyContent={"space-evenly"}
                >
                  <Grid
                    item
                    xs={12}
                    md={6}
                    lg={4}
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                  >
                    {pooling.userBaseData.profilePic === "" ? (
                      <Avatar
                        sx={{
                          backgroundColor: randomColor(),
                          fontSize: 50,
                          fontWeight: "bold",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "white",
                        }}
                        style={{
                          margin: "10px",
                          width: "120px",
                          height: "120px",
                        }}
                      >
                        {pooling.userBaseData.forename != null &&
                        pooling.userBaseData.name !== ""
                          ? pooling.userBaseData.name
                              .toString()
                              .charAt(0)
                              .toUpperCase()
                          : pooling.userBaseData.forename
                              .toString()
                              .charAt(0)
                              .toUpperCase()}
                      </Avatar>
                    ) : (
                      <Avatar
                        src={pooling.userBaseData.profilePic}
                        alt="User picture"
                        style={{
                          margin: "10px",
                          width: "120px",
                          height: "120px",
                        }}
                      />
                    )}
                    <Typography
                      align="center"
                      component="div"
                      marginBottom={0}
                      variant="body2"
                    >
                      {"Photo de profil"}
                    </Typography>
                  </Grid>
                </Grid>
                {
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="accountName"
                    label={"Nom (de compte)"}
                    name="accountName"
                    disabled={true}
                    value={formik.values.accountName}
                  />
                }
                {
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="accountForename"
                    label={"Prénom (de compte)"}
                    name="accountForename"
                    disabled={true}
                    value={formik.values.accountForename}
                  />
                }
                {
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="accountPhone"
                    label={"Numéro de téléphone (de compte)"}
                    name="accountPhone"
                    disabled={true}
                    value={formik.values.accountPhone}
                  />
                }
                {formik.values.accountMail && (
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="accountMail"
                    label={"Adresse mail (de compte)"}
                    name="accountMail"
                    disabled={true}
                    value={formik.values.accountMail}
                  />
                )}
              </AccordionDetails>
            </Accordion>
          </Box>
          {pooling.approvedByBaseData && pooling.approvedByCredsData ? (
            <Box marginTop={3}>
              <Accordion
                expanded={expandedTwo}
                onChange={handleExpandTwo()}
                sx={{ backgroundColor: "#e8fff5" }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel-content"
                  id="panel-header"
                >
                  <Typography
                    sx={{ width: "100%", flexShrink: 0 }}
                    variant="h6"
                  >
                    {"Informations supplémentaires sur l'approbateur"}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid
                    container
                    padding={2}
                    display={"inline-flex"}
                    alignItems={"center"}
                    justifyContent={"space-evenly"}
                  >
                    <Grid
                      item
                      xs={12}
                      md={6}
                      lg={4}
                      display={"flex"}
                      flexDirection={"column"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      {pooling.approvedByBaseData.profilePic === "" ? (
                        <Avatar
                          sx={{
                            backgroundColor: randomColor(),
                            fontSize: 50,
                            fontWeight: "bold",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                          }}
                          style={{
                            margin: "10px",
                            width: "120px",
                            height: "120px",
                          }}
                        >
                          {pooling.approvedByBaseData.forename != null &&
                          pooling.userBaseData.name !== ""
                            ? pooling.approvedByBaseData.name
                                .toString()
                                .charAt(0)
                                .toUpperCase()
                            : pooling.approvedByBaseData.forename
                                .toString()
                                .charAt(0)
                                .toUpperCase()}
                        </Avatar>
                      ) : (
                        <Avatar
                          src={pooling.approvedByBaseData.profilePic}
                          alt="User picture"
                          style={{
                            margin: "10px",
                            width: "120px",
                            height: "120px",
                          }}
                        />
                      )}
                      <Typography
                        align="center"
                        component="div"
                        marginBottom={0}
                        variant="body2"
                      >
                        {"Photo de profil"}
                      </Typography>
                    </Grid>
                  </Grid>
                  {
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="accountName"
                      label={"Nom (de compte)"}
                      name="accountName"
                      disabled={true}
                      value={formik.values.approverName}
                    />
                  }
                  {
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="accountForename"
                      label={"Prénom (de compte)"}
                      name="accountForename"
                      disabled={true}
                      value={formik.values.approverForename}
                    />
                  }
                  {
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="accountPhone"
                      label={"Numéro de téléphone (de compte)"}
                      name="accountPhone"
                      disabled={true}
                      value={formik.values.approverPhone}
                    />
                  }
                  {formik.values.approverMail && (
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="accountMail"
                      label={"Adresse mail (de compte)"}
                      name="accountMail"
                      disabled={true}
                      value={formik.values.approverMail}
                    />
                  )}
                </AccordionDetails>
              </Accordion>
            </Box>
          ) : null}
        </DialogContent>
        <DialogActions>
          {!viewMode ? "" : <Button onClick={onClose}>{"Annuler"}</Button>}
          {!viewMode ? (
            <Button onClick={onClose}>{"OK"}</Button>
          ) : (
            <LoadingButton
              loading={processing}
              type="submit"
              variant="contained"
            >
              {"Ajouter"}
            </LoadingButton>
          )}
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default PoolingRequestDialog;
