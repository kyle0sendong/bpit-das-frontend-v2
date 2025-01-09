import { Outlet } from "react-router-dom";
import { Flex } from "@mantine/core";
import NavbarNested from "./components/navbar/NavbarNested";
const ConfigurationsLayout = () => {
  return (
    <Flex mih="75vh" w="100%">
      <NavbarNested />
      <Outlet />
    </Flex>
  )
}

export default ConfigurationsLayout;