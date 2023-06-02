import { Box, Container, Typography } from "@mui/material";
import loadingGif from "../assets/imgs/loading.gif";

const LoadingTableView = ({ message, title }) => {
  return (
    <Container maxWidth={"xs"}>
      <Box sx={{ textAlign: "center", px: 3, py: 8 }}>
        <Box
          marginBottom={1}
          display={"inline-flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <img src={loadingGif} alt="Loading..." />
        </Box>
        <Typography gutterBottom variant="h5">
          {title}
        </Typography>
        {message && <Typography variant="body2">{message}</Typography>}
      </Box>
    </Container>
  );
};

export default LoadingTableView;
