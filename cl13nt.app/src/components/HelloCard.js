/* eslint-disable no-unused-vars */
import { Card, CardContent, Typography } from "@mui/material";
import { ReactComponent as WelcomeSvg } from "../assets/welcome.svg";
import { SvgContainer } from "./SvgContainer";
/*import { useEffect, useState } from "react";
import { collection, query, onSnapshot, getDocs, getDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";*/

const HelloCard = () => {

  /*const [drivers, setDrivers] = useState([])
  const fetchDrivers = async () => {
    await getDocs(collection(firestore, "users_accnt"))
      .then((querySnapshot) => {
        const newDrivers = querySnapshot.docs
          .map((doc) => ({...doc.data(), id:doc.id}))
        setDrivers(newDrivers)
        console.log(drivers, newDrivers)
      })
  }
  useEffect(() => {
    fetchDrivers()
  }, []);*/

  return (
    <Card elevation={0} sx={{ backgroundColor: "transparent", mb: 2 }}>
      <CardContent>
        <Typography component="div" gutterBottom variant="h1">
          {"Hello XXX,"}
        </Typography>
        <Typography
          component="div"
          sx={{ fontWeight: 300, mb: 3 }}
          variant="h1"
        >
          {"Bienvenu(e) !"}
        </Typography>
        <SvgContainer>
          <WelcomeSvg />
        </SvgContainer>
      </CardContent>
    </Card>
  );
};

export { HelloCard };
