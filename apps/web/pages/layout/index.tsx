import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Navbar from "./navbar";

const Layout = () => (
  <>
    <Box p={{ base: "2rem 1rem 4rem", md: "3rem 2rem 5rem", lg: "3rem 4rem 5rem" }}>
      <Outlet />
    </Box>
    <Navbar />
  </>
);

export default Layout;
