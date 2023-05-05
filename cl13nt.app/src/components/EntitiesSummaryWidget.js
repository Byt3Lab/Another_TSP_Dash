import { Typography, Avatar, Box, Card, CardContent } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import React from "react";
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PersonIcon from "@mui/icons-material/Person";
import TaxiAlertIcon from "@mui/icons-material/TaxiAlert";

const summary = [
  {
    bgcolor: "primary.main",
    icon: <PersonIcon sx={{ color: "#fff" }} />,
    name: "Utilisateurs",
    trend: <ArrowDropUpIcon sx={{ color: "success.main" }} />,
    unitKey: "utilisateurs",
    value: "0",
  },
  {
    bgcolor: "info.main",
    icon: <TaxiAlertIcon style={{ color: "#fff" }} />,
    name: "Commandes",
    trend: <ArrowRightIcon sx={{ color: "action.disabled" }} />,
    unitKey: "commandes",
    value: "0",
  },
  {
    bgcolor: "warning.main",
    icon: <LocalTaxiIcon style={{ color: "#fff" }} />,
    name: "Vehicules",
    trend: <ArrowDropDownIcon sx={{ color: "error.main" }} />,
    unitKey: "vehicules",
    value: "0",
  },
  {
    bgcolor: "error.main",
    icon: <MonetizationOnIcon style={{ color: "#fff" }} />,
    name: "Ventes",
    trend: <ArrowDropDownIcon sx={{ color: "error.main" }} />,
    unitKey: "cdf",
    value: "0",
  },
];

const EntitiesSummaryWidget = (props) => {
  return (
    <React.Fragment>
      {summary.map((item) => (
        <Card key={item.name} sx={{ mb: 2 }}>
          <CardContent sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              aria-label={`${item.name} avatar`}
              sx={{ bgcolor: item.bgcolor, mr: 2 }}
            >
              {item.icon}
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography component="div" variant="h6">
                { item.name === "Utilisateurs" ? item.value = props.users.length : ""}
                { item.name === "Commandes" ? item.value = props.books.length : ""}
                { item.name === "Vehicules" ? item.value = props.drivers.length : ""}
                { item.name === "Ventes" ? item.value = "15" : ""}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="div">
                {item.unitKey}
              </Typography>
            </Box>
            {item.trend}
          </CardContent>
        </Card>
      ))}
    </React.Fragment>
  );
};

export { EntitiesSummaryWidget };
