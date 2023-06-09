import { ReactComponent as EmptySvg } from "../assets/empty_box.svg";
import { Box, Typography, Container } from "@mui/material";

const Empty = ({ message, title, extra }) => {
  return (
    <Container maxWidth={"xs"}>
      <Box sx={{ textAlign: "center", px: 3, py: 8 }}>
        <Box
          marginBottom={5}
          display={"inline-flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <EmptySvg width={"50%"} />
        </Box>
        <Typography gutterBottom variant="h5">
          {title}
        </Typography>
        {message && <Typography variant="body2">{message}</Typography>}
      </Box>
    </Container>
  );
};

export default Empty;
