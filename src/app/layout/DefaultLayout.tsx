import { Outlet } from "react-router-dom";
import { Flex, Text } from "@mantine/core";
import HeaderMenu from "@/components/header";
import Footer from "@/components/footer/Footer";
import { useUser } from "@/contexts/UserContext";
import { useNavigate } from "react-router-dom";
import SidebarMenu from "@/components/sidebar/SidebarMenu";
import classes from "./Layout.module.css"
const DefaultLayout = () => {

  const { user } = useUser();
  const navigate = useNavigate();
  
  if(!user) {
    navigate('/data-monitoring');
    return (
      <Flex className={classes.section}>
        <HeaderMenu />
          <div className={classes.content_container}>
          <SidebarMenu />
          <Text m="lg">
            Please login to continue.
          </Text>
        </div>
      </Flex>
    )
  }
  else {
    return (
      <>
      <Flex className={classes.section}>
          
          <HeaderMenu />
          <div className={classes.content_container}>
            <SidebarMenu />
            <Outlet />
          </div>
          <Footer/>
        </Flex>
      </>
    )
  }

}

export default DefaultLayout;