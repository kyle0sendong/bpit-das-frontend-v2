import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

import LoginForm from './login-form/LoginForm';

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

  return (
    <Box>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          BPIT DAS

          <Group h="100%" gap={0} visibleFrom="sm">
            {links}
          </Group>

          <Group visibleFrom="sm">
            <Modal opened={loginOpened} onClose={closeLogin} title="Login">
              <LoginForm />
            </Modal>
            <Button onClick={toggleLogin}>
              Log in
            </Button>
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