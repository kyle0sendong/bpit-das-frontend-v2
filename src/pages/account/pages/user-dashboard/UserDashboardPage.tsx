import { Box, Flex, Loader, Paper } from "@mantine/core";

import { useGetUserRoles } from "@/hooks/usersHook";

import RegisterUserForm from "./components/RegisterUserForm";

import UsersTable from "./components/Table/UsersTable";

const UserDashboardPage = () => {

  const userRoles = useGetUserRoles();

  return (
    <Paper w="70%" m="auto" p="xs">
      <Flex direction="column" gap="xs">

        {userRoles.isFetched ? <RegisterUserForm userRoles={userRoles.data}/> : <Loader />}

        <Box>
          <UsersTable />
        </Box>

      </Flex>
    </Paper>


  )
}

export default UserDashboardPage;