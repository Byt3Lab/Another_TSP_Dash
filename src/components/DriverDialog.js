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

const DriverDialog = ({
  onAdd,
  onClose,
  onView,
  open,
  processing,
  driver,
  index,
}) => {
  const viewMode = Boolean(driver && driver.state === true);
  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => (event, isExpanded) => {
    expanded ? setExpanded(false) : setExpanded(true);
  };

  const handleSubmit = (values) => {
    const driver = {
      address: values.address,
      driverPermitNumber: values.driverPermitNumber,
      name: values.firstName,
      forename: values.lastName,
      phone: "+242" + values.phone,
      state: true,
      supplementBrand: values.supplementBrand,
      supplementCommission: values.supplementCommission,
      supplementDriverStatus: values.supplementDriverStatus,
      supplementLicencePlate: values.supplementLicencePlate,
      supplementModel: values.supplementModel,
      supplementWorkTime: values.supplementWorkTime,
      mail: values.mail,
      UID: "",
    };
    // console.log("AT SUBMISSION", driver);
    onAdd(driver);
  };

  const formik = useFormik({
    initialValues: {
      firstName: driver ? driver.name : "",
      lastName: driver ? driver.forename : "",
      address: driver ? driver.address : "",
      driverPermitNumber: driver ? driver.driverPermitNumber : "",
      supplementBrand: driver ? driver.supplementBrand : "",
      supplementModel: driver ? driver.supplementModel : "",
      supplementCommission: driver ? driver.supplementCommission : "",
      supplementDriverStatus: driver ? driver.supplementDriverStatus : "",
      supplementLicencePlate: driver ? driver.supplementLicencePlate : "",
      supplementWorkTime: driver ? driver.supplementWorkTime : "",
      phone: driver ? driver.phone : "",
      mail: driver ? driver.mail : "",
      accountName: driver
        ? driver.userBaseData && driver.userBaseData.name
        : "",
      accountForename: driver
        ? driver.userBaseData && driver.userBaseData.forename
        : "",
      accountPhone: driver
        ? driver.userCredsData && driver.userCredsData.phone
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
      driverPermitNumber: Yup.string()
        .min(11, "11 caractères minimum")
        .max(11, "11 caractères maximum")
        .required("Le numéro de permis est requis"),
      supplementBrand: Yup.string()
        .min(2, "2 caractères minimum")
        .max(15, "15 caractères maximum")
        .required("La marque du véhicule est requise"),
      supplementModel: Yup.string()
        .min(2, "2 caractères minimum")
        .max(15, "15 caractères maximum")
        .required("Le modèle du véhicule est requis"),
      supplementCommission: Yup.string()
        .min(2, "La somme semble invalide...")
        .max(10, "10 chiffres maximum")
        .required("La commission est requise"),
      supplementDriverStatus: Yup.string()
        .equals(["Taxi", "Personal"], "Le statut du chauffeur est requis")
        .required("Le statut du chauffeur est requis"),
      supplementLicencePlate: Yup.string()
        .min(7, "7 caractères minimum")
        .max(7, "7 caractères maximum")
        .required("Le numéro de plaque est requis"),
      supplementWorkTime: Yup.string()
        .equals(
          ["Morning / Day", "Evening / Night"],
          "L'horaire de travail est requise"
        )
        .required("Le cadrant de travail est requis"),
      phone: Yup.string()
        .min(9, "Le numéro de téléphone est de 9 caractères minimum")
        .max(9, "Le numéro de téléphone est de 9 caractères maximum")
        .required("Le numéro de téléphone est requis"),
      mail: Yup.string().email("L'adresse semble incorrecte..."),
    }),
    onSubmit: handleSubmit,
  });

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="driver-dialog-title">
      <form onSubmit={formik.handleSubmit} noValidate>
        <DialogTitle id="driver-dialog-title">
          {!viewMode
            ? "Ajouter un chauffeur"
            : index === 0
            ? "Consulter la requête"
            : "Consulter le profil du chauffeur"}
        </DialogTitle>
        <DialogContent>
          <Box marginBottom={3}>
            {viewMode ? (
              <TextField
                margin="normal"
                required
                fullWidth
                id="firstName"
                label={"Nom du chauffeur (prétendu)"}
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
                label={"Nom du chauffeur"}
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
                label={"Prénom du chauffeur (prétendu)"}
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
                label={"Prénom du chauffeur"}
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
                label={"Adresse du chauffeur (prétendu)"}
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
                label={"Adresse du chauffeur"}
                name="address"
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
                id="driverPermitNumber"
                label={"Numéro de permis de conduire (prétendu)"}
                name="driverPermitNumber"
                disabled={true}
                value={formik.values.driverPermitNumber}
              />
            ) : (
              <TextField
                margin="normal"
                required
                fullWidth
                id="driverPermitNumber"
                label={"Numéro de permis de conduire"}
                name="driverPermitNumber"
                autoComplete="family-name"
                disabled={processing}
                value={formik.values.driverPermitNumber}
                onChange={formik.handleChange}
                error={
                  formik.touched.driverPermitNumber &&
                  Boolean(formik.errors.driverPermitNumber)
                }
                helperText={
                  formik.touched.driverPermitNumber &&
                  formik.errors.driverPermitNumber
                }
              />
            )}
            {viewMode ? (
              <TextField
                margin="normal"
                required
                fullWidth
                id="supplementBrand"
                label={"Marque du véhicule (prétendu)"}
                name="supplementBrand"
                disabled={true}
                value={formik.values.supplementBrand}
              />
            ) : (
              <TextField
                margin="normal"
                required
                fullWidth
                id="supplementBrand"
                label={"Marque du véhicule"}
                name="supplementBrand"
                autoComplete="family-name"
                disabled={processing}
                value={formik.values.supplementBrand}
                onChange={formik.handleChange}
                error={
                  formik.touched.supplementBrand &&
                  Boolean(formik.errors.supplementBrand)
                }
                helperText={
                  formik.touched.supplementBrand &&
                  formik.errors.supplementBrand
                }
              />
            )}
            {viewMode ? (
              <TextField
                margin="normal"
                required
                fullWidth
                id="supplementModel"
                label={"Modèle du véhicule (prétendu)"}
                name="supplementModel"
                disabled={true}
                value={formik.values.supplementModel}
              />
            ) : (
              <TextField
                margin="normal"
                required
                fullWidth
                id="supplementModel"
                label={"Modèle du véhicule"}
                name="supplementModel"
                autoComplete="family-name"
                disabled={processing}
                value={formik.values.supplementModel}
                onChange={formik.handleChange}
                error={
                  formik.touched.supplementModel &&
                  Boolean(formik.errors.supplementModel)
                }
                helperText={
                  formik.touched.supplementModel &&
                  formik.errors.supplementModel
                }
              />
            )}
            {viewMode ? (
              <TextField
                margin="normal"
                required
                fullWidth
                id="supplementCommission"
                label={"Commission journalière"}
                name="supplementCommission"
                disabled={true}
                value={formik.values.supplementCommission + " CDF"}
              />
            ) : (
              <TextField
                margin="normal"
                required
                fullWidth
                id="supplementCommission"
                label={"Commission journalière"}
                name="supplementCommission"
                autoComplete="family-name"
                disabled={processing}
                value={formik.values.supplementCommission}
                onChange={formik.handleChange}
                error={
                  formik.touched.supplementCommission &&
                  Boolean(formik.errors.supplementCommission)
                }
                helperText={
                  formik.touched.supplementCommission &&
                  formik.errors.supplementCommission
                }
              />
            )}
            {viewMode ? (
              <TextField
                margin="normal"
                required
                fullWidth
                id="supplementDriverStatus"
                label={"Statut du chauffeur (prétendu)"}
                name="supplementDriverStatus"
                disabled={true}
                value={formik.values.supplementDriverStatus}
              />
            ) : (
              <>
                <label
                  className="block text-md font-medium text-gray-500 mt-2"
                  htmlFor="supplementDriverStatus"
                >
                  Statut du chauffeur
                </label>
                <select
                  className="w-full h-16 rounded-xl px-4"
                  id="supplementDriverStatus"
                  name="supplementDriverStatus"
                  autoComplete="family-name"
                  disabled={processing}
                  value={formik.values.supplementDriverStatus}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.supplementDriverStatus &&
                    Boolean(formik.errors.supplementDriverStatus)
                  }
                  helperText={
                    formik.touched.supplementDriverStatus &&
                    formik.errors.supplementDriverStatus
                  }
                >
                  <option value="-">-</option>
                  <option value="Taxi">Taxi</option>
                  <option value="Personal">Personnel</option>
                </select>
              </>
            )}
            {viewMode ? (
              <TextField
                margin="normal"
                required
                fullWidth
                id="supplementLicensePlate"
                label={"Plaque d'immatriculation (prétendue)"}
                name="supplementLicensePlate"
                disabled={true}
                value={formik.values.supplementLicencePlate}
              />
            ) : (
              <TextField
                margin="normal"
                required
                fullWidth
                id="supplementLicensePlate"
                label={"Plaque d'immatriculation"}
                name="supplementLicencePlate"
                autoComplete="family-name"
                disabled={processing}
                value={formik.values.supplementLicensePlate}
                onChange={formik.handleChange}
                error={
                  formik.touched.supplementLicencePlate &&
                  Boolean(formik.errors.supplementLicencePlate)
                }
                helperText={
                  formik.touched.supplementLicencePlate &&
                  formik.errors.supplementLicencePlate
                }
              />
            )}
            {viewMode ? (
              <TextField
                margin="normal"
                required
                fullWidth
                id="supplementWorkTime"
                label={"Quadrant de travail (prétendu)"}
                name="supplementWorkTime"
                disabled={true}
                value={formik.values.supplementWorkTime}
              />
            ) : (
              <>
                <label
                  className="block text-md font-medium text-gray-500 mt-2"
                  htmlFor="supplementWorkTime"
                >
                  Quadrant de travail
                </label>
                <select
                  className="w-full h-16 rounded-xl px-4"
                  id="supplementWorkTime"
                  name="supplementWorkTime"
                  autoComplete="family-name"
                  disabled={processing}
                  value={formik.values.supplementWorkTime}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.supplementWorkTime &&
                    Boolean(formik.errors.supplementWorkTime)
                  }
                  helperText={
                    formik.touched.supplementWorkTime &&
                    formik.errors.supplementWorkTime
                  }
                >
                  <option value="-">-</option>
                  <option value="Morning / Day">Matin / Jour</option>
                  <option value="Evening / Night">Soir / Nuit</option>
                </select>
              </>
            )}
            {viewMode ? (
              <TextField
                margin="normal"
                required
                fullWidth
                id="phone"
                label={"Numéro de téléphone"}
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
                label={"Numéro de téléphone"}
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
                  label={"Adresse mail"}
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
                label={"Adresse mail"}
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
                label={"Date de requête"}
                name="created_at"
                disabled={true}
                value={new Date(
                  driver.created_at.seconds * 1000 +
                    driver.created_at.nanoseconds / 1000000
                )
                  .toLocaleString("fr-CG")
                  .toString()}
              />
            ) : (
              ""
            )}
            {viewMode && index === 1 ? (
              <TextField
                margin="normal"
                required
                fullWidth
                id="updated_at"
                label={"Date de validation"}
                name="updated_at"
                disabled={true}
                value={new Date(
                  driver.updated_at.seconds * 1000 +
                    driver.updated_at.nanoseconds / 1000000
                )
                  .toLocaleString("fr-CG")
                  .toString()}
              />
            ) : (
              ""
            )}
          </Box>
          {viewMode &&
          driver.userBaseData !== null &&
          driver.userCredsData !== null ? (
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
                        {driver.userBaseData.profilePic === "" ? (
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
                            {driver.userBaseData.forename != null &&
                            driver.userBaseData.name !== ""
                              ? driver.userBaseData.name
                                  .toString()
                                  .charAt(0)
                                  .toUpperCase()
                              : driver.userBaseData.forename
                                  .toString()
                                  .charAt(0)
                                  .toUpperCase()}
                          </Avatar>
                        ) : (
                          <Avatar
                            src={driver.userBaseData.profilePic}
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

export default DriverDialog;
