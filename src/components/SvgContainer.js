import { Box } from "@mui/system";
import { useTheme } from "@mui/system";

const SvgContainer = ({ children }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        svg: { height: "50%", width: "50%" },
        ".fill-primary": { fill: theme.palette.primary.light },
        ".fill-secondary": { fill: theme.palette.secondary.light },
        ".fill-error": { fill: theme.palette.error.light },
        ".fill-success": { fill: theme.palette.success.light },
        ".fill-warning": { fill: theme.palette.warning.light },
        ".fill-paper": { fill: theme.palette.background.paper },
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "green",
      }}
    >
      {children}
    </Box>
  );
};

export { SvgContainer };
