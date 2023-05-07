import MenuIcon from "@mui/icons-material/Menu";
import { useSettings } from "../contexts/SettingsProvider";
import { IconButton, Toolbar, Typography } from "@mui/material";

const AdminToolbar = ({ children, title }) => {
  const { toggleDrawer } = useSettings();

  return (
    <Toolbar sx={{ px: { xs: 3, sm: 6 } }}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={toggleDrawer}
        sx={{
          display: { lg: "none" },
          marginRight: 2,
        }}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="h2" component="h1" sx={{ flexGrow: 1 }}>
        {title}
      </Typography>
      {children}
    </Toolbar>
  );
};

export default AdminToolbar;
