import { CardContent, Card, Box, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { useState } from "react";

const UsersRegistrationActivityWidget = (props) => {

  const theme = useTheme();
  var totalNewUsers = 0;
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
  ]);
  const d = props.users
  let curr_date = new Date()
  // loop for converting dates :
  /*d.forEach((e) => {
    // parse all dates :
    e.created_at = new Date(e.created_at).toString()//
    //e.created_at = new Date(e.created_at);
    //e.created_at = new Date(e.created_at.seconds * 1000 + e.created_at.nanoseconds / 1000000)
    //total current month users :
    /*if(e.created_at.getMonth() === (curr_date.getMonth() +1) && e.created_at.getDate() <= curr_date.getDate()) {
      //console.log(e.created_at);
    }
  });*/
  console.log("datas:");
  //d[0].created_at = new Date(d[0].created_at);
  console.log(d)/*[0]).created_at.getDate());*/
  //console.log("data month :");
  //console.log(d[0]);//.created_at);
  //curr_date = curr_date.getDate() + "/" + (curr_date.getMonth() + 1) + "/" + curr_date.getFullYear()
  //console.log("current date : " + curr_date)
  //console.log("total Month Users : " + totalNewUsers)

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
              data={data.slice(0,4)}
              //data={props.users}
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
