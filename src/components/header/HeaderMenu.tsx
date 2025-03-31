import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Burger,
  Button,
  Divider,
  Drawer,
  Group,
  ScrollArea,
  Title
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './HeaderMenu.module.css';
import {
  IconGauge,
  IconHome2,
} from '@tabler/icons-react';
import { Tooltip, UnstyledButton } from '@mantine/core';
import { useUser } from "@/contexts/UserContext";

import Login from '../login/Login';

const data = [
  { icon: IconHome2, label: 'Configurations', link: "configurations/stations" },
  { icon: IconGauge, label: 'Data Monitoring', link: "data-monitoring"},
  { icon: IconHome2, label: 'Data History', link: "data-history" },
  { icon: IconGauge, label: 'User Logs', link: "user-logs"},
];

export default function HeaderMenu() {
  const location = useLocation();

  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [active, setActive] = useState<string>();

  const { user } = useUser();

  useEffect( () => {
    setActive(location.pathname.substring(1))
  }, [])

  const navigate = useNavigate();

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
      <Tooltip label={item.label} position="bottom" key={item.label} >
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
      </Tooltip>
    )
  });


  return (
    <Box>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">

          <Title size="md">
            BPIT DAS
          </Title>

          <Group h="100%" gap={0} visibleFrom="sm">
            {links}
          </Group>

          <Group visibleFrom="sm">
            <Login />
          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h="calc(100vh - 80px" mx="-md">
          <Divider my="sm" />

          <a href="#" className={classes.link}>
            Home
          </a>
          <a href="#" className={classes.link}>
            Data Monitoring
          </a>
          <a href="#" className={classes.link}>
            Data History
          </a>

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <Button variant="default">Log in</Button>
            <Button>Sign up</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}