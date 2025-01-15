import { Outlet } from "react-router-dom";
import { Flex, Box } from "@mantine/core";
import HeaderMenu from "@/components/header/HeaderMenu";
import Footer from "@/components/footer/Footer";

const DefaultLayout = () => {
  return (
    <>
      <Flex mih="100vh" w="100%" bg="#F0F0F0" direction="column">
        <HeaderMenu />
        <Box>
          <Outlet />
        </Box>
        <Footer/>
      </Flex>
    </>
  )
}

export default DefaultLayout;