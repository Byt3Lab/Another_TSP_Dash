import { Card, CardContent, Typography } from "@mui/material";
import { ReactComponent as WelcomeSvg } from "../assets/welcome.svg";
import { SvgContainer } from "./SvgContainer";

const HelloCard = () => {
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
