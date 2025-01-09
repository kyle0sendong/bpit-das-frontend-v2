import { Outlet } from "react-router-dom";
import { Box } from "@mantine/core";
import NavbarNested from "./components/navbar/NavbarNested";
const ConfigurationsLayout = () => {
  return (
    <Box h="100%" w="100%" bd="1px solid red">
      <NavbarNested />
      <Outlet />
    </Box>
  )
}

export default ConfigurationsLayout;