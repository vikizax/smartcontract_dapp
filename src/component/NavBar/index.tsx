import React, { useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate, useLocation } from "react-router-dom";
function a11yProps(index: number) {
  return {
    id: `navbar-tab-${index}`,
    "aria-controls": `navbar-tabpanel-${index}`,
  };
}

const NavBar = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if (newValue === 0) navigate("/home");
    if (newValue === 1) navigate("/data");
    if (newValue === 2) navigate("/smart-contract");

    setValue(newValue);
  };

  useEffect(() => {
    navigate("/home");
  }, []);

  useEffect(() => {
    if (location.pathname === "/home") setValue(0);
    if (location.pathname === "/data") setValue(1);
    if (location.pathname === "/smart-contract") setValue(2);
  }, [location]);
  
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered={matches}
        >
          <Tab label="File Upload" {...a11yProps(0)} />
          <Tab label="Data" {...a11yProps(1)} />
          <Tab label="Interact" {...a11yProps(2)} />
        </Tabs>
      </Box>
    </Box>
  );
};

export default NavBar;
