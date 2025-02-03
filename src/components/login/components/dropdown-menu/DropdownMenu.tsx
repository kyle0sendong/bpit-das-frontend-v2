import { Avatar, Popover, Flex, UnstyledButton } from "@mantine/core";
import classes from "./DropdownMenu.module.css";
import { useUserLogout } from '@/hooks/usersHook';

const DropdownMenu = () => {
  const {mutate: userLogout} = useUserLogout();

  const logoutOnclick = () => {
    const token = localStorage.getItem("token") ?? null;
    return userLogout(token);
  }

  return (
    <>
      <Popover>
        <Popover.Target>
          <Avatar 
            size="md"
            radius="md"
          />
        </Popover.Target>

        <Popover.Dropdown>
          <Flex direction="column" gap="sm">
            <UnstyledButton className={classes.link}>User Dashboard</UnstyledButton>
            <UnstyledButton className={classes.link}>Account Settings</UnstyledButton>
            <UnstyledButton className={classes.link} onClick={logoutOnclick}>Logout</UnstyledButton>
          </Flex>

        </Popover.Dropdown>
      </Popover>


    </>
  )

}

export default DropdownMenu;