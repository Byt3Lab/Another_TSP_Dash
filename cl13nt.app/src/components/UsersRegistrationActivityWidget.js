import { CardContent, Card, Box, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { useState } from "react";

/*const data = [
  {
    name: "Jan",
    amount: 2,
  },
  {
    name: "Feb",
    amount: 10,
  },
  {
    name: "Mar",
    amount: 30,
  },
  {
    name: "Avr",
    amount: 0,
  },
];*/

const UsersRegistrationActivityWidget = (props) => {

  const totalNewUsers = "37";
  const todayDate = new Date();
  const theme = useTheme();
  const [data, setDatas] = useState([
    {
      name: "Jan",
      amount: 2,
    },
    {
      name: "Feb",
      amount: 10,
    },
    {
      name: "Mar",
      amount: 30,
    },
    {
      name: "Avr",
      amount: 0,
    },
  ]);
  //props.users
  /*{props.users.map((meeting) => (
  ))};*/
  return (
    <Card>
      <CardContent>
        <Typography
          align="center"
          component="div"
          marginBottom={0}
          variant="body2"
        >
          {"Nouveaux utilisateurs"}
        </Typography>
        <Typography
          align="center"
          component="div"
          variant="h2"
          color={theme.palette.text.primary}
          marginBottom={3}
        >
          {totalNewUsers}
        </Typography>
        <Box sx={{ height: 224 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              width={500}
              height={400}
              data={data}
              margin={{
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
              }}
            >
              <XAxis
                axisLine={false}
                dataKey="name"
                interval="preserveStartEnd"
                tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 16,
                  boxShadow: theme.shadows[3],
                  backgroundColor: theme.palette.background.paper,
                  borderColor: theme.palette.background.paper,
                }}
              />
              <Area
                type="monotone"
                dataKey="amount"
                fill={theme.palette.primary.main}
                fillOpacity={0.3}
                stroke={theme.palette.primary.main}
                strokeWidth={6}
                activeDot={{ r: 8 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export { UsersRegistrationActivityWidget };
