import { CardContent, Card, Box, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { useState } from "react";

const UsersRegistrationActivityWidget = (props) => {

  const theme = useTheme();
  var totalNewUsers = 0;
  let d = props.users
  let curr_date = new Date()
  // loop for converting dates :
  d.forEach((e) => {
    e.created_at = new Date(e.created_at.seconds * 1000 + e.created_at.nanoseconds / 1000000)
  });
  for (let k in d ) {
    if(d[k].created_at.getMonth() === curr_date.getMonth())
    {
      console.log("curr_date.getMonth : " , curr_date.getMonth().toString())
      console.log("data month : " , d[k].created_at.getMonth())
      totalNewUsers += 1
    }
  }
  // function to get number of users for a specific month
  function specificMonthUsers(month) {
    let amount = 0;
    for (let k in d ) {
      if(d[k].created_at.getMonth() === month)
      {
        amount += 1;
      }
    }
    return amount;
  }
  let data = [
    {
      name: "Jan",
      amount: specificMonthUsers(0),
    },
    {
      name: "Feb",
      amount: specificMonthUsers(1),
    },
    {
      name: "Mar",
      amount: specificMonthUsers(2),
    },
    {
      name: "Avr",
      amount: specificMonthUsers(3),
    },
    {
      name: "May",
      amount: specificMonthUsers(4),
    },
    {
      name: "Jun",
      amount: specificMonthUsers(5),
    },
  ];

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
              data={data.slice(1,(curr_date.getMonth()+1))}
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
