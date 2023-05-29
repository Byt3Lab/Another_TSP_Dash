import { useEffect, useState } from "react";
import { GetDashboardData } from "../services/GetDashboardData.Service.ts";
import { Grid } from "@mui/material";
import { EntitiesSummaryWidget } from "./EntitiesSummaryWidget";
import { HelloCard } from "./HelloCard";
import { UsersRegistrationActivityWidget } from "./UsersRegistrationActivityWidget";
import { NewlyJoinedUsersWidgets } from "./NewlyJoinedUsersWidgets";
import { SalesWidget } from "./SalesHistoryWidget";
import { CommandsActivityWidget } from "./ActivityWidget";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const DashboardGrid = (props) => {

  const [drivers, setDrivers] = useState([])
  const [users, setUsers] = useState([])
  const [monthUsers, setMonthUsers] = useState([])
  const [books, setBooks] = useState([])
  const date = new Date().toString()

  useEffect(() => {
    props.setIsLoaded(false);
    // get all the books : users_car_booking
    const fetchBooks = async () => {
      await getDocs(collection(firestore, "users_car_booking"))
        .then((querySnapshot) => {
          const newBooks = querySnapshot.docs
            .map((doc) => ({...doc.data(), id:doc.id}))
          setBooks(newBooks)
          console.log("booking list : ")
          console.log(books, newBooks)
        })
    }
    // get all the users .collection("users_accnt").orderBy("created_at", "asc")
    const fetchUsers = async () => {
      await getDocs(query(collection(firestore, "users_accnt"), orderBy("created_at", "asc")))
        .then((querySnapshot) => {
          const newUsers = querySnapshot.docs
            .map((doc) => ({...doc.data(), id:doc.id}))
          setUsers(newUsers)
          console.log("app users : ")
          console.log(users, newUsers)
        })
    }
    // get all the users .collection("users_accnt").orderBy("current month")
    /**
     *  .where('myDate', isGreaterThanOrEqualTo: new DateTime(date.year, date.month, 1))
        .orderBy('myDate', descending: true)
     */
    const fetchMonthUsers = async () => {
      await getDocs(query(collection(firestore, "users_accnt"), where("created_at", ">=",date)), orderBy("created_at", "asc"))
        .then((querySnapshot) => {
          const newUsers = querySnapshot.docs
            .map((doc) => ({...doc.data(), id:doc.id}))
          setMonthUsers(newUsers)
          console.log("month users : ")
          console.log(monthUsers, newUsers)
        })
    }
    // get all the drivers
    const fetchDrivers = async () => {
      await getDocs(collection(firestore, "drivers_applications"))
        .then((querySnapshot) => {
          const newDrivers = querySnapshot.docs
            .map((doc) => ({...doc.data(), id:doc.id}))
          setDrivers(newDrivers)
          console.log("app drivers")
          console.log(drivers, newDrivers)
        })
    }
    GetDashboardData().then((response) => {
      if (response.worked && response.worked === true) {
        props.setIsLoaded(true);
        console.log(response);
      } else {
        console.log("Failed : ", response);
      }
    });
    fetchBooks();
    fetchDrivers();
    fetchUsers();
    fetchMonthUsers();
  }, []);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <HelloCard />
          <SalesWidget value={120} />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <EntitiesSummaryWidget drivers={drivers} users={users} books={books}/>
          <UsersRegistrationActivityWidget users={users}/>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <NewlyJoinedUsersWidgets users={users}/>
        </Grid>
        <Grid item xs={12} md={12}>
          <CommandsActivityWidget />
        </Grid>
      </Grid>
    </>
  );
};

export { DashboardGrid };
