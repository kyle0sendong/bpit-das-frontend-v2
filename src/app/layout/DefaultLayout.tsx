import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Flex, Text } from '@mantine/core';
import HeaderMenu from '@/components/header';
import Footer from '@/components/footer/Footer';
import { useUser } from '@/contexts/UserContext';
import SidebarMenu from '@/components/sidebar/SidebarMenu';
import classes from './Layout.module.css';

const DefaultLayout = () => {
  const { user, isLoading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !isLoading) {
      navigate('/data-monitoring');
    }
  }, [user, navigate, isLoading]);

  if (!user) {
    return (
      <Flex className={classes.section}>
        <HeaderMenu />
        <div className={classes.content_container}>
          <SidebarMenu />
          <Text m='lg'>Please login to continue.</Text>
        </div>
      </Flex>
    );
  }

  return (
    <Flex className={classes.section}>
      <HeaderMenu />
      <div className={classes.content_container}>
        <SidebarMenu />
        <Outlet />
      </div>
      <Footer />
    </Flex>
  );
};

export default DefaultLayout;
