import { useEffect } from "react";
import { GetDashboardData } from "../services/GetDashboardData.Service.ts";
import { Grid } from "@mui/material";
import { EntitiesSummaryWidget } from "./EntitiesSummaryWidget";
import { HelloCard } from "./HelloCard";
import { UsersRegistrationActivityWidget } from "./UsersRegistrationActivityWidget";
import { NewlyJoinedUsersWidgets } from "./NewlyJoinedUsersWidgets";
import { SalesWidget } from "./SalesHistoryWidget";
import { CommandsActivityWidget } from "./ActivityWidget";

const DashboardGrid = (props) => {
  useEffect(() => {
    props.setIsLoaded(false);
    GetDashboardData().then((response) => {
      if (response.worked && response.worked === true) {
        props.setIsLoaded(true);
        console.log(response);
      } else {
        console.log("Failed : ", response);
      }
    });
  }, []);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <HelloCard />
          <SalesWidget value={120} />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <EntitiesSummaryWidget />
          <UsersRegistrationActivityWidget />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <NewlyJoinedUsersWidgets />
        </Grid>
        <Grid item xs={12} md={12}>
          <CommandsActivityWidget />
        </Grid>
      </Grid>
    </>
  );
};

export { DashboardGrid };
