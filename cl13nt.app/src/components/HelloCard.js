/* eslint-disable no-unused-vars */
import { Card, CardContent, Typography } from "@mui/material";
import { ReactComponent as WelcomeSvg } from "../assets/welcome.svg";
import { SvgContainer } from "./SvgContainer";
import { useEffect, useState } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const HelloCard = () => {

  const [info, setInfo] = useState([])
  const [ids, setIds] = useState([])
  useEffect(() => {
    const getData = async () => {
      const data = await query(collection(firestore, "users_accnt"));
      console.log("data: " + JSON.stringify(data));

      onSnapshot(data, (QuerySnapshot) => {
        const databaseInfo = [];
        const dataIds = [];

        QuerySnapshot.forEach((doc) => {
          databaseInfo.push(doc.data().usersAccnt);
          dataIds.push(doc.id);
        });
        setIds(dataIds);
        setInfo(databaseInfo);
      });
    }
    getData()
  }, []);

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
