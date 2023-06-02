import { Box, Container, Typography } from "@mui/material";
import { ReactComponent as ErrorSvg } from "../assets/error.svg";
import { ReactComponent as SuccessSvg } from "../assets/success.svg";
import { SvgContainer } from "./SvgContainer";

const ResultImage = ({ customImage, status }) => {
  let image = customImage;

  if (!image) {
    if (status === "error") {
      image = <ErrorSvg />;
    } else if (status === "success") {
      image = <SuccessSvg />;
    }
  }

  return image ? <Box marginBottom={3}>{image}</Box> : null;
};

const Result = ({ extra, image, maxWidth = "xs", status, subTitle, title }) => {
  return (
    <Container maxWidth={maxWidth}>
      <Box sx={{ textAlign: "center", px: 3, py: 2, backgroundColor: "red" }}>
        <SvgContainer>
          <ResultImage customImage={image} status={status} />
        </SvgContainer>
        <Typography gutterBottom variant="h5">
          {title}
        </Typography>
        {subTitle && <Typography variant="body2">{subTitle}</Typography>}
        {extra && <Box sx={{ mt: 4, textAlign: "center" }}>{extra}</Box>}
      </Box>
    </Container>
  );
};

export default Result;
