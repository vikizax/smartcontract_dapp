import React from "react";
import Box from "@mui/material/Box";
import Navbar from "../../component/NavBar/index";
interface ILayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
  return (
    <Box
      sx={{
        height: "100vh",
        widht: "100vh",
        margin: 0,
        padding: 0,
        overflow: "hidden",
      }}
    >
      <Navbar />
      {children}
    </Box>
  );
};

export default Layout;
