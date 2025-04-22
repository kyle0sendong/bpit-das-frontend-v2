import { useEffect, useState } from 'react';

import {
  Box,
  Group,
  Title,
  Flex,
  Text
} from '@mantine/core';

import classes from './HeaderMenu.module.css';
import { useUser } from '@/contexts/UserContext';
import Login from '../login/Login';

export default function HeaderMenu() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60_000); // Update every minute

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const dateString = currentTime.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const timeString = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).replace(/^0/, ''); // Remove leading zero

  const { user } = useUser();
  return (
    <Box>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">

          <Flex direction='column' ml="3.7rem" mt="1rem">
            <Title size="2rem" fw="500" c="white">
              {dateString}
            </Title>
            <Title size="md" fw="500" c="white">
              {timeString}
            </Title>
          </Flex>

          <Group visibleFrom="sm" c="white" mr="3rem">

            <Text size="1.5rem" fw="200" c="white">
              Welcome, {user?.firstName ?? 'Guest'}!
            </Text>
            
            <Login />
          </Group>

        </Group>
      </header>


    </Box>
  );
}