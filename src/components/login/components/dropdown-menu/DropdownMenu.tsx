import { useState } from "react";
import { Avatar, Popover, Flex, UnstyledButton, Tooltip } from "@mantine/core";
import classes from "./DropdownMenu.module.css";
import { useUserLogout } from '@/hooks/usersHook';
import { useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";

const DropdownMenu = () => {
  const [opened, setOpened] = useState(false);
  const {mutate: userLogout} = useUserLogout();
  const navigate = useNavigate();

  const logoutOnclick = () => {
    const token = localStorage.getItem("token") ?? null;
    return userLogout(token);
  }

  const { user } = useUser();

  return (
    <>
      <Popover opened={opened} onChange={setOpened}>
        <Popover.Target>
          <Tooltip label="Account">
            <UnstyledButton 
              className={classes.avatar}
              onClick={() => setOpened((o) => !o)}>
              <Avatar
                size="md"
                radius="md"
                color="blue"
              />
            </UnstyledButton>
          </Tooltip>
        </Popover.Target>

        <Popover.Dropdown>
          <Flex direction="column" gap="sm">
            {
              user?.role === "admin" && (
                <UnstyledButton
                  className={classes.link} 
                  onClick={() => {
                    navigate("user-dashboard")
                    setOpened((o) => !o)  
                  }}>
                  User Dashboard
                </UnstyledButton>
              )
            }

            <UnstyledButton className={classes.link}
              onClick={() => {
                navigate("settings")
                setOpened((o) => !o)  
              }}>
              Account Settings
            </UnstyledButton>
            <UnstyledButton className={classes.link} onClick={logoutOnclick}>Logout</UnstyledButton>
          </Flex>

        </Popover.Dropdown>
      </Popover>


    </>
  )

}

export default DropdownMenu;