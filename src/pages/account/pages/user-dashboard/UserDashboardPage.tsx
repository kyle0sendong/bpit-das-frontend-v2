import { Box, Flex, Loader, Button, Paper, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { useGetUserRoles } from "@/hooks/usersHook";

import RegisterUserForm from "./components/RegisterUserForm";

import UsersTable from "./components/Table/UsersTable";

const UserDashboardPage = () => {

  const [opened, {open, close}] = useDisclosure(false);

  const userRoles = useGetUserRoles();

  return (
    <Paper w="70%" m="auto" p="xs">
      <Flex direction="column" gap="xs">
        <Modal opened={opened} onClose={close} title="Create User" >
          {userRoles.isFetched ? <RegisterUserForm userRoles={userRoles.data}/> : <Loader />}
        </Modal>
        <Box>
          <Button onClick={open}>
            Create User
          </Button>
        </Box>

        <Box>
          <UsersTable />
        </Box>

      </Flex>
    </Paper>


  )
}

export default UserDashboardPage;