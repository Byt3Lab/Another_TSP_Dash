import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
  IconButton,
  Avatar,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import GoogleIcon from "@mui/icons-material/Google";
import { Android12Switch } from "./iconSwitch";
import { useState } from "react";
import { randomColor } from "../utils/randColorCode";

const UserDialog = ({ onAdd, onClose, onView, open, processing, user }) => {
  const viewMode = Boolean(user && user.id);
  const [profilePic, setProfilePic] = useState(user ? user.profilePic : "");
  const [userType, setUserType] = useState(user ? user.isDriver : false);
  const [userState, setUserState] = useState(user ? user.state : true);
  const [userGoogleAuthState, setUserGoogleAuthState] = useState(
    user ? user.isGoogleAuthEnabled : false
  );
  const profilePicCaption = viewMode
    ? "Photo de profil\n"
    : "Photo de profil\n (optionnelle)";
  const dateOptions = {
    day: "2-digit",
    year: "2-digit",
    month: "short",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
  };

  const handleSubmit = (values) => {
    const user = {
      name: values.firstName,
      forename: values.lastName,
      profilePic: profilePic,
      isDriver: userType,
      deviceToken: "",
      phone: "+242" + values.phone,
      mail: values.mail,
      password: values.password,
      isGoogleAuthEnabled: false,
      state: userState,
      UID: "",
      created_at: "",
      updated_at: "",
    };
    onAdd(user);
    //console.log("AT SUBMISSION", user);
  };

  const handleImageChange = () => (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.addEventListener("load", function () {
        setProfilePic(this.result);
      });
    }
  };

  const handleUserStateChange = () => (event) => {
    setUserState(event.target.checked);
  };

  const handleUserTypeChange = () => (event) => {
    setUserType(event.target.checked);
  };

  const formik = useFormik({
    initialValues: {
      firstName: user ? user.name : "",
      lastName: user ? user.forename : "",
      phone: user ? user.phone : "",
      mail: user ? user.mail : "",
      password: user ? user.password : "",
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
      phone: Yup.string()
        .min(9, "Le numéro de téléphone est de 9 caractères minimum")
        .max(9, "Le numéro de téléphone est de 9 caractères maximum")
        .required("Le numéro de téléphone est requis"),
      mail: Yup.string().email("L'adresse semble incorrecte..."),
      password: Yup.string()
        .min(8, "Le mot de passe est de 8 caractères minimum")
        .max(20, "Le mot de passe est de 20 caractères maximum")
        .required("Le mot de passe est requis"),
    }),
    onSubmit: handleSubmit,
  });

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="user-dialog-title">
      <form onSubmit={formik.handleSubmit} noValidate>
        <DialogTitle id="user-dialog-title">
          {viewMode ? "Consulter" : "Ajouter un utilisateur"}
        </DialogTitle>
        <DialogContent>
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
              {viewMode ? (
                profilePic === "" ? (
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
                    {user.name != null && user.name !== ""
                      ? user.name.toString().charAt(0).toUpperCase()
                      : user.forename.toString().charAt(0).toUpperCase()}
                  </Avatar>
                ) : (
                  <Avatar
                    src={profilePic}
                    alt="User picture"
                    style={{
                      margin: "10px",
                      width: "120px",
                      height: "120px",
                    }}
                  />
                )
              ) : (
                <>
                  <input
                    accept="image/*"
                    className={""}
                    id="profile-pic-upload"
                    type="file"
                    onChange={handleImageChange()}
                    hidden
                    disabled={processing}
                  />
                  <label htmlFor="profile-pic-upload">
                    <IconButton component="span" disabled={processing}>
                      <Avatar
                        src={profilePic}
                        style={{
                          margin: "10px",
                          width: "120px",
                          height: "120px",
                        }}
                      />
                    </IconButton>
                  </label>
                </>
              )}
              <Typography
                align="center"
                component="div"
                marginBottom={0}
                variant="body2"
              >
                {profilePicCaption}
              </Typography>
            </Grid>
            <Grid
              item
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              xs={12}
              md={6}
              lg={4}
              display={"flex"}
              flexDirection={"column"}
              flexWrap={"wrap"}
              justifyContent={"space-between"}
            >
              <Grid
                item
                xs={12}
                width={"250px"}
                display={"inline-flex"}
                flexDirection={"row"}
                flexWrap={"wrap"}
                alignItems={"center"}
                borderRadius={"20px"}
                padding={"5px 10px 5px 10px"}
                justifyContent={"space-between"}
                bgcolor={"lightgrey"}
                marginBottom={1}
              >
                <Typography
                  align="center"
                  component="div"
                  marginBottom={0}
                  fontWeight={"bold"}
                  fontSize={"17px"}
                >
                  {"Chauffeur ?"}
                </Typography>
                {viewMode ? (
                  <Android12Switch defaultChecked={userType} disabled={true} />
                ) : (
                  <Android12Switch
                    defaultChecked={userType}
                    onChange={handleUserTypeChange()}
                    disabled={processing}
                  />
                )}
              </Grid>
              <Grid
                item
                xs={12}
                display={"flex"}
                flexDirection={"row"}
                flexWrap={"wrap"}
                alignItems={"center"}
                width={"250px"}
                justifyContent={"space-between"}
                borderRadius={"20px"}
                padding={"5px 10px 5px 10px"}
                bgcolor={"lightgrey"}
                marginBottom={1}
              >
                <Typography
                  align="center"
                  component="div"
                  marginBottom={0}
                  fontWeight={"bold"}
                  fontSize={"17px"}
                >
                  {"Actif ?"}
                </Typography>
                {viewMode ? (
                  <Android12Switch defaultChecked={userState} disabled={true} />
                ) : (
                  <Android12Switch
                    defaultChecked={userState}
                    onChange={handleUserStateChange()}
                    disabled={processing}
                  />
                )}
              </Grid>
              {viewMode ? (
                <Grid
                  item
                  xs={12}
                  display={"flex"}
                  flexDirection={"row"}
                  flexWrap={"wrap"}
                  alignItems={"center"}
                  width={"250px"}
                  justifyContent={"space-between"}
                  borderRadius={"20px"}
                  padding={"5px 10px 5px 10px"}
                  bgcolor={"lightgrey"}
                >
                  <Typography
                    align="center"
                    component="div"
                    marginBottom={0}
                    fontWeight={"bold"}
                    fontSize={"17px"}
                  >
                    <GoogleIcon />
                    {" ?"}
                  </Typography>
                  <Android12Switch
                    defaultChecked={userGoogleAuthState}
                    disabled={true}
                  />
                </Grid>
              ) : (
                ""
              )}
            </Grid>
          </Grid>
          {viewMode ? (
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstName"
              label={"Nom (de famille)"}
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
              label={"Nom (de famille)"}
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
              label={"Prénom"}
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
              label={"Prénom"}
              name="lastName"
              autoComplete="family-name"
              disabled={processing}
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
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
            ""
          ) : (
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label={"Mot de passe"}
              name="password"
              type={"password"}
              disabled={processing}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              onSubmit={formik.handleSubmit}
            />
          )}
          {viewMode ? (
            <TextField
              margin="normal"
              required
              fullWidth
              id="created_at"
              label={"Date d'inscription"}
              name="created_at"
              disabled={true}
              value={new Date(
                user.created_at.seconds * 1000 +
                  user.created_at.nanoseconds / 1000000
              )
                .toLocaleString("fr-CG")
                .toString()}
            />
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

export default UserDialog;
