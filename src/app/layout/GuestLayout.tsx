import { Outlet } from "react-router-dom";

import HeaderMenu from "@/components/header";
import Footer from "@/components/footer/Footer";
import SidebarMenu from "@/components/sidebar/SidebarMenu";
import classes from "./Layout.module.css"

const GuestLayout = () => {

  return (
    <>
      <div className={classes.section}>
        <HeaderMenu />
        <div className={classes.content_container}>
          <SidebarMenu />
          <Outlet />
        </div>
        <Footer/>
      </div>
    </>
  )
}

export default GuestLayout;