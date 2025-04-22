import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  IconLogout
} from '@tabler/icons-react';

import { useUser } from '@/contexts/UserContext';
import classes from './SidebarMenu.module.css';

import { UnstyledButton, Image } from '@mantine/core';

const data = [
  { icon: IconLogout, label: 'Configurations', link: "configurations/stations" },
  { icon: IconLogout, label: 'Data Monitoring', link: "data-monitoring"},
  { icon: IconLogout, label: 'Data History', link: "data-history" },
  { icon: IconLogout, label: 'User Logs', link: "user-logs"},
];

export default function SidebarMenu() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUser();
  const [active, setActive] = useState('');

  useEffect( () => {
    setActive(location.pathname.substring(1))
  }, [])


  const filteredLinks = data.filter((item) => {
    // Always allow 'data-monitoring' and 'data-history'
    if (item.link === "data-monitoring" || item.link === "data-history") {
      return true;
    }
  
    if (!user) return false;

    if ((user.role === "admin" || user.role === "standard" || user.role === "integrator") && 
        item.link === "configurations/stations") {
      return true;
    }

    if (user.role === "admin" && item.link === "user-logs") {
      return true;
    }
    return false;
  });

  const links = filteredLinks.map((item) => {
    return (
      <UnstyledButton
        key={item.label}
        onClick={
          () => {
            setActive(item.link)
            navigate(item?.link)
        }}
        className={classes.link}
        data-active={item.link === active || undefined}
      >
        {/* <item.icon size={20} stroke={1.5}/> */}
        {item.label}
      </UnstyledButton>
    )
  });

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Image src="/logo.png" alt="Company Logo"  pb="0.5rem" />
        {links}
      </div>
    </nav>
  );
}