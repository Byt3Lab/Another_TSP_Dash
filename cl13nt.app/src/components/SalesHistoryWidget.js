import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { Bar, BarChart, ResponsiveContainer } from "recharts";

const SalesWidget = ({ value }) => {
  const theme = useTheme();

  const data = [
    {
      name: "Mon",
      uv: 2,
    },
    {
      name: "Tue",
      uv: 3,
    },
    {
      name: "Wed",
      uv: 1,
    },
    {
      name: "Thu",
      uv: 3,
    },
    {
      name: "Fri",
      uv: 8,
    },
    {
      name: "Sat",
      uv: 4,
    },
    {
      name: "Sun",
      uv: 1,
    },
  ];

  return (
    <Card>
      <CardHeader title={"Historique des ventes (Hebdomadaire)"} />
      <CardContent>
        <ResponsiveContainer width="99%" height={124}>
          <BarChart
            width={150}
            height={40}
            data={data}
            margin={{
              right: 0,
              left: 0,
            }}
          >
            <Bar
              dataKey="uv"
              fill={theme.palette.primary.main}
              radius={[50, 50, 50, 50]}
            />
          </BarChart>
        </ResponsiveContainer>
        <Box sx={{ display: "flex", alignItems: "center", mt: 3 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h2" component="div" marginBottom={1}>
              {value}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="div">
              {"CDF Aujourd'hui"}
            </Typography>
          </Box>
          <TrendingUpIcon sx={{ color: "text.secondary" }} />
        </Box>
      </CardContent>
    </Card>
  );
};

export { SalesWidget };
