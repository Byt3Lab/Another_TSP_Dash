import { useFormik } from "formik";
import * as Yup from "yup";
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
import MultipleSelectChip from "./multiSelectChips";
import moment from "moment";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";

const SubscriptionDialog = ({
  onAdd,
  onClose,
  onView,
  open,
  processing,
  subscription,
  index,
}) => {
  const viewMode = Boolean(
    subscription &&
      subscription.state !== undefined &&
      subscription.state !== null
  );
  const [expanded, setExpanded] = useState(false);
  const [pickupDays, setPickupDays] = useState(
    subscription ? subscription.pickupDays : []
  );

  const handleExpand = () => (event, isExpanded) => {
    expanded ? setExpanded(false) : setExpanded(true);
  };

  const handleSubmit = (values) => {
    const subscription = {
      name: values.firstName,
      forename: values.lastName,
      phone: "+242" + values.phone,
      mail: values.mail,
      passengersNumber: parseInt(values.passengersNumber),
      paymentAmount: values.paymentAmount,
      paymentMode:
        values.paymentMode === "momo"
          ? "MoMo"
          : values.paymentMode === "airtel"
          ? "Airtel"
          : "Espèce",
      pickupDays: values.pickupDays,
      pickupPointAddress: values.pickupPointAddress,
      pickupTime: values.pickupTime,
      dropPointAddress: values.dropPointAddress,
      dropTime: values.dropTime,
      state: true,
      UID: "",
    };
    //console.log("AT SUBMISSION", subscription);
    onAdd(subscription);
  };

  const formik = useFormik({
    initialValues: {
      firstName: subscription ? subscription.name : "",
      lastName: subscription ? subscription.forename : "",
      passengersNumber: subscription ? subscription.passengersNumber : "",
      paymentAmount: subscription ? subscription.paymentAmount : "",
      paymentMode: subscription ? subscription.paymentMode : "",
      phone: subscription ? subscription.phone : "",
      mail: subscription ? subscription.mail && subscription.mail : "",
      pickupDays: pickupDays,
      pickupPointAddress: subscription ? subscription.pickupPointAddress : "",
      pickupTime: subscription
        ? subscription.pickupTime
        : new Date().toISOString(),
      dropPointAddress: subscription ? subscription.dropPointAddress : "",
      dropTime: subscription ? subscription.dropTime : new Date().toISOString(),
      state: subscription ? subscription.state : "",
      accountMail: subscription
        ? subscription.userCredsData &&
          subscription.userCredsData.mail &&
          subscription.userCredsData.mail
        : "",
      accountName: subscription
        ? subscription.userBaseData && subscription.userBaseData.name
        : "",
      accountForename: subscription
        ? subscription.userBaseData && subscription.userBaseData.forename
        : "",
      accountPhone: subscription
        ? subscription.userCredsData &&
          subscription.userCredsData.phone &&
          subscription.userCredsData.phone
        : "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(2, "2 caractères minimum")
        .max(15, "15 caractères maximum")
        .required("Le nom est requis"),
      lastName: Yup.string()
        .min(2, "2 caractères minimum")
        .max(10, "10 caractères maximum")
        .required("Le prénom est requis"),
      passengersNumber: Yup.number()
        .min(1, "1 passager minimum")
        .max(6, "6 passagers maximum")
        .required("Le nombre de passagers est requis"),
      paymentAmount: Yup.number()
        .min(500, "500 CDF minimum")
        .required("Le montant est requis"),
      paymentMode: Yup.string()
        .equals(["cash", "momo", "airtel"], "Le mode de paiement est requis")
        .required("Le mode de paiement est requis"),
      phone: Yup.string()
        .min(9, "Le numéro de téléphone est de 9 caractères minimum")
        .max(9, "Le numéro de téléphone est de 9 caractères maximum")
        .required("Le numéro de téléphone est requis"),
      mail: Yup.string().email("L'adresse semble incorrecte..."),
      pickupDays: Yup.array()
        .min(1, "Au moins un jour de ramassage")
        .max(5, "Au plus 5 jours de ramassage")
        .required(),
      pickupPointAddress: Yup.string().required(
        "L'adresse de ramassage est requise"
      ),
      // pickupTime: Yup.date().required("L'heure de ramassage est requise"),
      dropPointAddress: Yup.string().required("L'adresse de dépot est requise"),
      // dropTime: Yup.date().required("L'heure de dépot est requise"),
    }),
    onSubmit: handleSubmit,
  });

  const setPickupDaysFunc = (values) => {
    setPickupDays(values);
    formik.setFieldValue("pickupDays", values);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="subscription-dialog-title"
    >
      <form onSubmit={formik.handleSubmit} noValidate>
        <DialogTitle id="subscription-dialog-title">
          {!viewMode ? "Ajouter un abonnement" : "Consulter l'abonnement"}
        </DialogTitle>
        <DialogContent>
          <Box marginBottom={3}>
            {viewMode ? (
              <TextField
                margin="normal"
                required
                fullWidth
                id="firstName"
                label={"Nom de l'abonné"}
                name="firstName"
                disabled={true}
                value={formik.values.firstName}
              />
            ) : (
              <TextField
                margin="normal"
                required
                fullWidth
                id="firstName"
                label={"Nom de l'abonné"}
                name="firstName"
                autoComplete="given-name"
                disabled={processing}
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
                autoFocus
              />
            )}
            {viewMode ? (
              <TextField
                margin="normal"
                required
                fullWidth
                id="lastName"
                label={"Prénom de l'abonné"}
                name="lastName"
                disabled={true}
                value={formik.values.lastName}
              />
            ) : (
              <TextField
                margin="normal"
                required
                fullWidth
                id="lastName"
                label={"Prénom de l'abonné"}
                name="lastName"
                autoComplete="family-name"
                disabled={processing}
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            )}
            {viewMode ? (
              <TextField
                margin="normal"
                required
                fullWidth
                id="address"
                label={"Nombre de passagers"}
                name="passengersNumber"
                disabled={true}
                value={formik.values.passengersNumber}
              />
            ) : (
              <TextField
                margin="normal"
                required
                fullWidth
                id="passengersNumber"
                label={"Nombre de passagers"}
                name="passengersNumber"
                autoComplete="family-name"
                disabled={processing}
                value={formik.values.passengersNumber}
                onChange={formik.handleChange}
                error={
                  formik.touched.passengersNumber &&
                  Boolean(formik.errors.passengersNumber)
                }
                helperText={
                  formik.touched.passengersNumber &&
                  formik.errors.passengersNumber
                }
              />
            )}
            {viewMode ? (
              <TextField
                margin="normal"
                required
                fullWidth
                id={"paymentAmount"}
                label={"Montant journalier de l'abonnement"}
                name="paymentAmount"
                disabled={true}
                value={formik.values.paymentAmount + " CDF"}
              />
            ) : (
              <TextField
                margin="normal"
                required
                fullWidth
                id={"paymentAmount"}
                label={"Montant journalier de l'abonnement"}
                name="paymentAmount"
                autoComplete="family-name"
                disabled={processing}
                value={formik.values.paymentAmount}
                onChange={formik.handleChange}
                error={
                  formik.touched.paymentAmount &&
                  Boolean(formik.errors.paymentAmount)
                }
                helperText={
                  formik.touched.paymentAmount && formik.errors.paymentAmount
                }
              />
            )}
            {viewMode ? (
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
              <>
                <label
                  className="block text-md font-medium text-gray-500 mt-2"
                  htmlFor="paymentMode"
                >
                  {"Mode de paiement"}
                </label>
                <select
                  className="w-full h-16 rounded-xl px-4"
                  id="paymentMode"
                  name="paymentMode"
                  autoComplete="family-name"
                  disabled={processing}
                  value={formik.values.paymentMode}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.paymentMode &&
                    Boolean(formik.errors.paymentMode)
                  }
                  helperText={
                    formik.touched.paymentMode && formik.errors.paymentMode
                  }
                >
                  <option value="-">-</option>
                  <option value="cash">Cash</option>
                  <option value="momo">MTN Mobile Money</option>
                  <option value="airtel">Airtel Money</option>
                </select>
              </>
            )}
            {viewMode ? (
              <MultipleSelectChip
                label={"Jours de ramassage"}
                disabled={true}
                values={pickupDays}
                setValues={setPickupDaysFunc}
                options={[]}
              />
            ) : (
              <MultipleSelectChip
                label={"Jours de ramassage"}
                disabled={processing}
                values={pickupDays}
                setValues={setPickupDaysFunc}
                options={["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"]}
              />
            )}
            {viewMode ? (
              <TextField
                margin="normal"
                required
                fullWidth
                id="pickupPointAddress"
                label={"Adresse de ramassage"}
                name="pickupPointAddress"
                disabled={true}
                value={formik.values.pickupPointAddress}
              />
            ) : (
              <TextField
                margin="normal"
                required
                fullWidth
                id="pickupPointAddress"
                label={"Adresse de ramassage"}
                name="pickupPointAddress"
                autoComplete="family-name"
                disabled={processing}
                value={formik.values.pickupPointAddress}
                onChange={formik.handleChange}
                error={
                  formik.touched.pickupPointAddress &&
                  Boolean(formik.errors.pickupPointAddress)
                }
                helperText={
                  formik.touched.pickupPointAddress &&
                  formik.errors.pickupPointAddress
                }
              />
            )}
            {viewMode ? (
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <MobileTimePicker
                  label={"Horaire de ramassage"}
                  defaultValue={moment(`${formik.values.pickupTime}`)}
                  disabled={true}
                  sx={{ width: "100%", marginY: "15px" }}
                />
              </LocalizationProvider>
            ) : (
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <MobileTimePicker
                  label={"Horaire de ramassage"}
                  defaultValue={moment()}
                  disabled={processing}
                  sx={{ width: "100%", marginY: "15px" }}
                  onChange={(value) => {
                    formik.setFieldValue("pickupTime", moment(value).format());
                  }}
                />
              </LocalizationProvider>
            )}
            {viewMode ? (
              <TextField
                margin="normal"
                required
                fullWidth
                id="dropPointAddress"
                label={"Adresse de dépot"}
                name="dropPointAddress"
                disabled={true}
                value={formik.values.dropPointAddress}
              />
            ) : (
              <TextField
                margin="normal"
                required
                fullWidth
                id="dropPointAddress"
                label={"Adresse de dépot"}
                name="dropPointAddress"
                autoComplete="family-name"
                disabled={processing}
                value={formik.values.dropPointAddress}
                onChange={formik.handleChange}
                error={
                  formik.touched.dropPointAddress &&
                  Boolean(formik.errors.dropPointAddress)
                }
                helperText={
                  formik.touched.dropPointAddress &&
                  formik.errors.dropPointAddress
                }
              />
            )}
            {viewMode ? (
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <MobileTimePicker
                  label={"Horaire de dépot"}
                  defaultValue={moment(`${formik.values.dropTime}`)}
                  disabled={true}
                  sx={{ width: "100%", marginY: "15px" }}
                />
              </LocalizationProvider>
            ) : (
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <MobileTimePicker
                  label={"Horaire de dépot"}
                  defaultValue={moment()}
                  disabled={processing}
                  sx={{ width: "100%", marginY: "15px" }}
                  onChange={(value) => {
                    formik.setFieldValue("dropTime", moment(value).format());
                  }}
                />
              </LocalizationProvider>
            )}
            {viewMode ? (
              <TextField
                margin="normal"
                required
                fullWidth
                id="phone"
                label={"Numéro de téléphone associé à l'abonnement"}
                name="phone"
                disabled={true}
                value={formik.values.phone}
              />
            ) : (
              <TextField
                margin="normal"
                required
                fullWidth
                id="phone"
                label={
                  "Numéro de téléphone associé à l'abonnement (sans indicatif)"
                }
                name="phone"
                disabled={processing}
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />
            )}
            {viewMode ? (
              formik.values.mail ? (
                <TextField
                  margin="normal"
                  fullWidth
                  id="mail"
                  label={"Adresse mail associée à l'abonnement"}
                  name="mail"
                  disabled={true}
                  value={formik.values.mail}
                />
              ) : (
                ""
              )
            ) : (
              <TextField
                margin="normal"
                fullWidth
                id="mail"
                label={"Adresse mail associée à l'abonnement"}
                name="mail"
                disabled={processing}
                value={formik.values.mail}
                onChange={formik.handleChange}
                error={formik.touched.mail && Boolean(formik.errors.mail)}
                helperText={formik.touched.mail && formik.errors.mail}
              />
            )}
            {viewMode ? (
              <TextField
                margin="normal"
                required
                fullWidth
                id="created_at"
                label={"Date de création"}
                name="created_at"
                disabled={true}
                value={new Date(
                  subscription.created_at.seconds * 1000 +
                    subscription.created_at.nanoseconds / 1000000
                )
                  .toLocaleString("fr-CG")
                  .toString()}
              />
            ) : (
              ""
            )}
            {viewMode ? (
              <TextField
                margin="normal"
                required
                fullWidth
                id="updated_at"
                label={"Date de dernière modification"}
                name="updated_at"
                disabled={true}
                value={new Date(
                  subscription.updated_at.seconds * 1000 +
                    subscription.updated_at.nanoseconds / 1000000
                )
                  .toLocaleString("fr-CG")
                  .toString()}
              />
            ) : (
              ""
            )}
          </Box>
          {viewMode &&
          subscription.userBaseData !== null &&
          subscription.userCredsData !== null ? (
            <>
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
                    <Typography
                      sx={{ width: "100%", flexShrink: 0 }}
                      variant="h6"
                    >
                      {"Informations supplémentaires"}
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
                        {subscription.userBaseData.profilePic === "" ? (
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
                            {subscription.userBaseData.forename != null &&
                            subscription.userBaseData.name !== ""
                              ? subscription.userBaseData.name
                                  .toString()
                                  .charAt(0)
                                  .toUpperCase()
                              : subscription.userBaseData.forename
                                  .toString()
                                  .charAt(0)
                                  .toUpperCase()}
                          </Avatar>
                        ) : (
                          <Avatar
                            src={subscription.userBaseData.profilePic}
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
                    {formik.values.accountPhone && (
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
                    )}
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
            </>
          ) : (
            ""
          )}
        </DialogContent>
        <DialogActions>
          {viewMode ? "" : <Button onClick={onClose}>{"Annuler"}</Button>}
          {viewMode ? (
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

export default SubscriptionDialog;
