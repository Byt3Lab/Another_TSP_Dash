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
import { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { randomColor } from "../utils/randColorCode";

const FuelingsDialog = ({
  onAdd,
  onClose,
  onView,
  open,
  processing,
  fueling,
  index,
}) => {
  const viewMode = Boolean(fueling);
  const [expanded, setExpanded] = useState(false);
  const [subDurationType, setSubDurationType] = useState("M");
  const [subCost, setSubCost] = useState(0);

  const handleExpand = () => (event, isExpanded) => {
    expanded ? setExpanded(false) : setExpanded(true);
  };

  const handleUpdateSubDurationType = () => (event) => {
    setSubDurationType(event.target.value);
  };

  const handleSubmit = (values) => {
    const data = {
      name: values.firstName,
      forename: values.lastName,
      address: values.address,
      phone: "+242" + values.phone,
      accountType:
        values.accountType === "enterprise" ? "Corporate" : "Personnel",
      cni: values.cni,
      fuelProvider:
        values.fuelProvider === "total-energies"
          ? "TOTAL ENERGIES"
          : values.fuelProvider === "afric"
          ? "AFRIC"
          : values.fuelProvider === "x-oil"
          ? "X-OIL"
          : values.fuelProvider === "puma-energy"
          ? "PUMA ENERGY"
          : values.fuelProvider === "snat"
          ? "SNAT"
          : "SNPC-D",
      fuelType:
        values.fuelType === "super"
          ? "Super"
          : values.fuelType === "gasoil"
          ? "Gasoil"
          : "Diesel",
      paymentAmount: subCost.toString(),
      paymentMode:
        values.paymentMode === "momo"
          ? "MoMo"
          : values.paymentMode === "airtel"
          ? "Airtel"
          : values.paymentMode === "bank"
          ? "BankDeposit"
          : "Espèce",
      quantity: parseInt(values.quantity),
      subDuration: values.subDuration + subDurationType,
      UID: "",
    };
    //console.log("AT SUBMISSION", data);
    onAdd(data);
  };

  const formik = useFormik({
    initialValues: {
      firstName: fueling ? fueling.name : "",
      lastName: fueling ? fueling.forename : "",
      address: fueling ? fueling.address : "",
      phone: fueling ? fueling.phone : "",
      accountType: fueling ? fueling.accountType : "",
      cni: fueling ? fueling.cni : "",
      fuelProvider: fueling ? fueling.fuelProvider : "",
      fuelType: fueling ? fueling.fuelType : "super",
      paymentMode: fueling ? fueling.paymentMode : "",
      quantity: fueling ? fueling.quantity : 0,
      subDuration: fueling ? fueling.subDuration : "",
      accountName: fueling
        ? fueling.userBaseData &&
          fueling.userBaseData.name &&
          fueling.userBaseData.name
        : "",
      accountForename: fueling
        ? fueling.userBaseData &&
          fueling.userBaseData.forename &&
          fueling.userBaseData.forename
        : "",
      accountPhone: fueling
        ? fueling.userCredsData &&
          fueling.userCredsData.phone &&
          fueling.userCredsData.phone
        : "",
      accountMail: fueling
        ? fueling.userCredsData &&
          fueling.userCredsData.mail &&
          fueling.userCredsData.mail
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
      address: Yup.string()
        .min(5, "5 caractères minimum")
        .max(50, "50 caractères maximum")
        .required("L'adresse est requise"),
      phone: Yup.string()
        .min(9, "Le numéro de téléphone est de 9 caractères minimum")
        .max(9, "Le numéro de téléphone est de 9 caractères maximum")
        .required("Le numéro de téléphone est requis"),
      accountType: Yup.string()
        .equals(["enterprise", "individual"])
        .required("Le type de compte est requis"),
      cni: Yup.string()
        .min(16, "16 caractères minimum")
        .max(16, "16 caractères maximum")
        .required("Le numéro de CNI est requis"),
      fuelProvider: Yup.string()
        .equals([
          "total-energies",
          "afric",
          "x-oil",
          "puma-energy",
          "snat",
          "snpc-d",
        ])
        .required("Le fournisseur de carburant est requis"),
      fuelType: Yup.string()
        .equals(["super", "gasoil", "diesel"])
        .required("Le type de carburant est requis"),
      paymentMode: Yup.string()
        .equals(
          ["cash", "momo", "airtel", "bank"],
          "Le mode de paiement est requis"
        )
        .required("Le mode de paiement est requis"),
      quantity: Yup.number().min(1, "1 litre minimum").required("Requis"),
      subDuration: Yup.number().min(1, "1 jour minimum").required("Requis"),
    }),
    onSubmit: handleSubmit,
  });

  const handleFuelPriceCalculation = () => {
    if (
      formik.values.quantity !== "" &&
      typeof parseInt(formik.values.quantity) === "number"
    ) {
      if (formik.values.fuelType === "super") {
        return parseInt(formik.values.quantity) * 625;
      } else if (formik.values.fuelType === "gasoil") {
        return parseInt(formik.values.quantity) * 500;
      } else {
        return parseInt(formik.values.quantity) * 500;
      }
    } else {
      return 0;
    }
  };

  useEffect(() => {
    setSubCost(handleFuelPriceCalculation());
  }, [subCost, formik.values.quantity]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="fueling-dialog-title"
    >
      <form onSubmit={formik.handleSubmit} noValidate>
        <DialogTitle id="fueling-dialog-title">
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
                label={"Adresse de l'abonné"}
                name="address"
                disabled={true}
                value={formik.values.address}
              />
            ) : (
              <TextField
                margin="normal"
                required
                fullWidth
                id="address"
                label={"Adresse de l'abonné"}
                autoComplete="family-name"
                disabled={processing}
                value={formik.values.address}
                onChange={formik.handleChange}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
              />
            )}
            {viewMode ? (
              <TextField
                margin="normal"
                required
                fullWidth
                id="accountType"
                label={"Type de compte"}
                name="accountType"
                disabled={true}
                value={formik.values.accountType}
              />
            ) : (
              <>
                <label
                  className="block text-md font-medium text-gray-500 mt-2"
                  htmlFor="accountType"
                >
                  {"Type de compte"}
                </label>
                <select
                  className="w-full h-16 rounded-xl px-4"
                  id="accountType"
                  name="accountType"
                  autoComplete="family-name"
                  disabled={processing}
                  value={formik.values.accountType}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.accountType &&
                    Boolean(formik.errors.accountType)
                  }
                  helperText={
                    formik.touched.accountType && formik.errors.accountType
                  }
                >
                  <option value="-">-</option>
                  <option value="enterprise">Entreprise</option>
                  <option value="individual">Particulier</option>
                </select>
              </>
            )}
            {viewMode ? (
              <TextField
                margin="normal"
                required
                fullWidth
                id={"cni"}
                label={"Numéro de CNI"}
                name="cni"
                disabled={true}
                value={formik.values.cni}
              />
            ) : (
              <TextField
                margin="normal"
                required
                fullWidth
                id={"cni"}
                label={"Numéro de CNI"}
                name="cni"
                autoComplete="family-name"
                disabled={processing}
                value={formik.values.cni}
                onChange={formik.handleChange}
                error={formik.touched.cni && Boolean(formik.errors.cni)}
                helperText={formik.touched.cni && formik.errors.cni}
              />
            )}
            {viewMode ? (
              <TextField
                margin="normal"
                required
                fullWidth
                id="fuelProvider"
                label={"Fournisseur de carburant"}
                name="fuelProvider"
                disabled={true}
                value={formik.values.fuelProvider}
              />
            ) : (
              <>
                <label
                  className="block text-md font-medium text-gray-500 mt-2"
                  htmlFor="fuelProvider"
                >
                  {"Fournisseur de carburant"}
                </label>
                <select
                  className="w-full h-16 rounded-xl px-4"
                  id="fuelProvider"
                  name="fuelProvider"
                  autoComplete="family-name"
                  disabled={processing}
                  value={formik.values.fuelProvider}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.fuelProvider &&
                    Boolean(formik.errors.fuelProvider)
                  }
                  helperText={
                    formik.touched.fuelProvider && formik.errors.fuelProvider
                  }
                >
                  <option value="-">-</option>
                  <option value="total-energies">Total Energies</option>
                  <option value="afric">Afric</option>
                  <option value="x-oil">X-Oil</option>
                  <option value="puma-energy">Puma Energy</option>
                  <option value="snat">SNAT</option>
                  <option value="snpc-d">SNPC-D</option>
                </select>
              </>
            )}
            {viewMode ? (
              <TextField
                margin="normal"
                required
                fullWidth
                id="fuelType"
                label={"Type de carburant"}
                name="fuelType"
                disabled={true}
                value={formik.values.fuelType}
              />
            ) : (
              <>
                <label
                  className="block text-md font-medium text-gray-500 mt-2"
                  htmlFor="fuelType"
                >
                  {"Type de carburant"}
                </label>
                <select
                  className="w-full h-16 rounded-xl px-4"
                  id="fuelType"
                  name="fuelType"
                  autoComplete="family-name"
                  disabled={processing}
                  value={formik.values.fuelType}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.fuelType && Boolean(formik.errors.fuelType)
                  }
                  helperText={formik.touched.fuelType && formik.errors.fuelType}
                >
                  <option value="super">Super</option>
                  <option value="gasoil">Gasoil</option>
                  <option value="diesel">Diesel</option>
                </select>
              </>
            )}
            {viewMode ? (
              <TextField
                margin="normal"
                required
                fullWidth
                id={"paymentAmount"}
                label={"Coût de l'abonnement"}
                name="paymentAmount"
                disabled={true}
                value={subCost + " CDF"}
              />
            ) : (
              <TextField
                margin="normal"
                required
                fullWidth
                disabled={true}
                id={"paymentAmount"}
                label={"Coût de l'abonnement"}
                name="paymentAmount"
                autoComplete="family-name"
                value={handleFuelPriceCalculation() + " CDF"}
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
                value={
                  formik.values.paymentMode === "Cash"
                    ? "Espèce"
                    : formik.values.paymentMode === "BankDeposit"
                    ? "Dépôt bancaire"
                    : formik.values.paymentMode === "MoMo"
                    ? "MTN Mobile Money"
                    : "Airtel Money"
                }
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
                  <option value="bank">Dépôt bancaire</option>
                  <option value="momo">MTN Mobile Money</option>
                  <option value="airtel">Airtel Money</option>
                </select>
              </>
            )}
            {viewMode ? (
              <TextField
                margin="normal"
                required
                fullWidth
                id={"quantity"}
                label={"Quantité de carburant (en litres)"}
                name="quantity"
                disabled={true}
                value={formik.values.quantity + "L"}
              />
            ) : (
              <TextField
                margin="normal"
                required
                fullWidth
                id={"quantity"}
                label={"Quantité de carburant (en litres)"}
                name="quantity"
                autoComplete="family-name"
                disabled={processing}
                value={formik.values.quantity}
                onChange={formik.handleChange}
                error={
                  formik.touched.quantity && Boolean(formik.errors.quantity)
                }
                helperText={formik.touched.quantity && formik.errors.quantity}
              />
            )}
            {viewMode ? (
              <TextField
                margin="normal"
                required
                fullWidth
                id={"subDuration"}
                label={"Durée de l'abonnement"}
                name="subDuration"
                disabled={true}
                value={
                  fueling.subDuration.toString().split("")[1] === "M"
                    ? `${fueling.subDuration.toString().split("")[0]} Mois`
                    : `${fueling.subDuration.toString().split("")[0]} An(s)`
                }
              />
            ) : (
              <div className="flex flex-row justify-between items-center">
                <TextField
                  margin="normal"
                  required
                  id={"subDuration"}
                  label={"Durée de l'abonnement"}
                  name="subDuration"
                  autoComplete="family-name"
                  disabled={processing}
                  value={formik.values.subDuration}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.subDuration &&
                    Boolean(formik.errors.subDuration)
                  }
                  helperText={
                    formik.touched.subDuration && formik.errors.subDuration
                  }
                  sx={{ width: "45%" }}
                />
                <select
                  className="w-1/2 h-14 rounded-xl px-4"
                  id="subDurationType"
                  name="subDurationType"
                  autoComplete="family-name"
                  disabled={processing}
                  onChange={handleUpdateSubDurationType()}
                >
                  <option value="M">Mois</option>
                  <option value="Y">An(s)</option>
                </select>
              </div>
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
              <TextField
                margin="normal"
                required
                fullWidth
                id="created_at"
                label={"Date de création"}
                name="created_at"
                disabled={true}
                value={new Date(
                  fueling.created_at.seconds * 1000 +
                    fueling.created_at.nanoseconds / 1000000
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
                  fueling.updated_at.seconds * 1000 +
                    fueling.updated_at.nanoseconds / 1000000
                )
                  .toLocaleString("fr-CG")
                  .toString()}
              />
            ) : (
              ""
            )}
          </Box>
          {viewMode &&
          fueling.userBaseData !== null &&
          fueling.userCredsData !== null ? (
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
                        {fueling.userBaseData.profilePic === "" ? (
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
                            {fueling.userBaseData.forename != null &&
                            fueling.userBaseData.name !== ""
                              ? fueling.userBaseData.name
                                  .toString()
                                  .charAt(0)
                                  .toUpperCase()
                              : fueling.userBaseData.forename
                                  .toString()
                                  .charAt(0)
                                  .toUpperCase()}
                          </Avatar>
                        ) : (
                          <Avatar
                            src={fueling.userBaseData.profilePic}
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

export default FuelingsDialog;
