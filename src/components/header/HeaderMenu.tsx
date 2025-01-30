import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';

import {
  Box,
  Burger,
  Button,
  Divider,
  Drawer,
  Group,
  ScrollArea,
  Modal
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './HeaderMenu.module.css';
import {
  IconGauge,
  IconHome2,
} from '@tabler/icons-react';
import { Tooltip, UnstyledButton } from '@mantine/core';

import Login from './login/Login';
import { useUserLogout } from '@/hooks/usersHook';

interface NavbarLinkProps {
  icon: typeof IconHome2;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const NavbarLink = ({ icon: Icon, label, active, onClick }: NavbarLinkProps) => {
  return (
    <Tooltip label={label} position="bottom" >
      <UnstyledButton onClick={onClick} className={classes.link} data-active={active || undefined}>
        <Icon size={20} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}
const data = [
  { icon: IconHome2, label: 'Configurations', link: "configurations" },
  { icon: IconGauge, label: 'Data Monitoring', link: "data-monitoring"},
  { icon: IconHome2, label: 'Data History', link: "data-history" },
  { icon: IconGauge, label: 'User Logs', link: "user-logs"},
];

export default function HeaderMenu() {

  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [loginOpened, { toggle: toggleLogin, close: closeLogin }] = useDisclosure(false);

  const [active, setActive] = useState(10);
  const { user } = useUser();
  const {mutate: userLogout} = useUserLogout();

  const navigate = useNavigate();

  const links = data.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => {
        setActive(index)
        navigate(link?.link)
      }}
    />
  ));

  const helloMessage = user ? `Hello, ${user?.firstName} ${user?.lastName}!` : `Hello, Guest!`;
  const loginOroutButton = user ? (
    <Button onClick={ () => {
      const token = localStorage.getItem("token") ?? null;
      userLogout(token);
    }}>
      Log out
    </Button>
  ) : (
    <Button onClick={toggleLogin}>
      Log in
    </Button>
  );

  return (
    <Box>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">

          {helloMessage}

          <Group h="100%" gap={0} visibleFrom="sm">
            {links}
          </Group>

          <Group visibleFrom="sm">
            <Modal opened={loginOpened} onClose={closeLogin} title="Login">
              <Login />
            </Modal>
            {loginOroutButton}
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