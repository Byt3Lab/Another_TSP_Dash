import { Card, CardContent, CardHeader } from "@mui/material";
import { useTheme } from "@mui/system";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";


const CommandsActivityWidget = (props) => {
  let b = props.books;
  let curr_date = new Date();
  // loop for converting dates :
  b.forEach((e) => {
    e.created_at = new Date(e.created_at.seconds * 1000 + e.created_at.nanoseconds / 1000000)
  });
  console.log("books:");
  console.log(b);
  // function to get number of users for a specific month
  function specificMonthBooks(month) {
    let amount = 0;
    for (let k in b ) {
      if(b[k].created_at.getMonth() === month)
      {
        console.log("curr_date.getMonth : " , curr_date.getMonth().toString());
        console.log("data month : " , b[k].created_at.getMonth());
        console.log("month "+month+" : "+amount+"books");
        amount += 1;
      }
    }
    return amount;
  }
  const data = [
    {
      name: "Jan",
      pv: specificMonthBooks(0),
    },
    {
      name: "Feb",
      pv: specificMonthBooks(1),
    },
    {
      name: "Mar",
      pv: specificMonthBooks(2),
    },
    {
      name: "Apr",
      pv: specificMonthBooks(3),
    },
    {
      name: "May",
      pv: specificMonthBooks(4),
    },
    {
      name: "Jun",
      pv: specificMonthBooks(5),
    },
    {
      name: "Jul",
      pv: specificMonthBooks(6),
    },
    {
      name: "Aug",
      pv: specificMonthBooks(7),
    },
    {
      name: "Sep",
      pv: specificMonthBooks(8),
    },
    {
      name: "Oct",
      pv: specificMonthBooks(9),
    },
    {
      name: "Nov",
      pv: specificMonthBooks(10),
    },
    {
      name: "Dec",
      pv: specificMonthBooks(11),
    },
  ];
  const theme = useTheme();

  return (
    <Card>
      <CardHeader
        title={
          "Activite annuelle des commandes" + ` [${new Date().getFullYear()}]`
        }
      />
      <CardContent>
        <ResponsiveContainer width="99%" height={244}>
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 16,
              left: 16,
              bottom: 5,
            }}
          >
            <XAxis
              axisLine={false}
              tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
              tickLine={false}
              dataKey="name"
            />
            <Tooltip
              contentStyle={{
                borderRadius: 16,
                boxShadow: theme.shadows[3],
                backgroundColor: theme.palette.background.paper,
                borderColor: theme.palette.background.paper,
              }}
            />
            <Line
              name="Value"
              type="monotone"
              dataKey="pv"
              stroke={theme.palette.primary.main}
              strokeWidth={6}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export { CommandsActivityWidget };
