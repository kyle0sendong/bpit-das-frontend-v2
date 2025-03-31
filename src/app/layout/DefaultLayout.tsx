import { Outlet } from "react-router-dom";
import { Flex, Box, Text } from "@mantine/core";
import HeaderMenu from "@/components/header/HeaderMenu";
import Footer from "@/components/footer/Footer";
import { useUser } from "@/contexts/UserContext";
import { useNavigate } from "react-router-dom";

const DefaultLayout = () => {

  const { user } = useUser();
  const navigate = useNavigate();
  
  if(!user) {
    navigate('/data-monitoring');
    return (
      <Flex mih="100vh" w="100%" bg="#F0F0F0" direction="column">
        <HeaderMenu />
        <Text m="lg">
          Please login to continue.
        </Text>
        
      </Flex>
    )
  }
  else {
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

}

export default DefaultLayout;