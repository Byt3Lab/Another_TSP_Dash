import { CardContent, Card, Box, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { useState } from "react";

const UsersRegistrationActivityWidget = (props) => {

  const totalNewUsers = props.users.length;
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
    {
      name: "May",
      amount: 0,
    },
    {
      name: "Jun",
      amount: 0,
    },
    {
      name: "July",
      amount: 0,
    },
    {
      name: "Aug",
      amount: 0,
    },
    {
      name: "Sep",
      amount: 0,
    },
    {
      name: "Oct",
      amount: 0,
    },
    {
      name: "Nov",
      amount: 0,
    },
    {
      name: "Dec",
      amount: 0,
    },
  ]);
  const d = props.users
  let curr_date = new Date()
  curr_date = curr_date.getMonth() + "/" + curr_date.getDate() + "/" + curr_date.getFullYear()
  console.log("current date : " + curr_date)
  //d[0].created_at = new Date(d[0].created_at.seconds * 1000 + d[0].created_at.nanoseconds / 1000000).toLocaleString()
  //console.log(d[0].created_at)

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
