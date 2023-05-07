import {
  Typography,
  Avatar,
  Box,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link } from "react-router-dom";
import React from "react";
import { useTheme } from "@emotion/react";

const joindedArr = [
  {
    id: "1",
    person: "Whatever Whatever",
    date: "17/03/2023",
    image: "",
  },
  {
    id: "2",
    person: "Noumecha",
    date: "10/03/2023",
    image: "",
  },
  {
    id: "3",
    person: "Milo",
    date: "08/03/2023",
    image: "",
  },
  {
    id: "4",
    person: "Tester Testing",
    date: "08/03/2023",
    image: "",
  },
  {
    id: "5",
    person: "Tester Testing",
    date: "08/03/2023",
    image: "",
  },
  {
    id: "6",
    person: "Tester Testing",
    date: "08/03/2023",
    image: "",
  },
];

const NewlyJoinedUsersWidgets = () => {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Typography component="h2" marginBottom={3} variant="h4">
        {"Quelques Nouveaux Utilisateurs"}
      </Typography>
      {joindedArr.map((meeting) => (
        <Card key={meeting.id} sx={{ mb: 2 }}>
          <CardContent sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              alt={`${meeting.person} avatar`}
              src={meeting.image}
              sx={{ mr: 2 }}
            />
            <Box sx={{ flexGrow: 1 }}>
              <Typography component="div" variant="h6">
                {meeting.person}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="div">
                {meeting.date}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ))}
      <Link to={`/${process.env.PUBLIC_URL}/users`}>
        <Card sx={{ bgcolor: theme.palette.divider, mt: 1 }}>
          <CardContent sx={{ display: "flex", alignItems: "center" }}>
            <Avatar sx={{ bgcolor: "background.paper", mr: 2 }}>
              <ListIcon />
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography component="div" variant="h6">
                {"Consulter les utilisateurs"}
              </Typography>
            </Box>
            <Button aria-label="Check users">
              <ChevronRightIcon />
            </Button>
          </CardContent>
        </Card>
      </Link>
    </React.Fragment>
  );
};

export { NewlyJoinedUsersWidgets };
