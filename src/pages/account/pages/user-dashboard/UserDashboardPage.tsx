import { Box, Flex, Loader, Button, Paper } from "@mantine/core";
import UserTable from "./components/UserTable";
import { useGetAllUsers } from "@/hooks/usersHook";

const UserDashboardPage = () => {

  const users = useGetAllUsers();

  const table = users.isFetched ? 
    <UserTable data={users.data} /> : 
    <Loader />;

  return (
    <Paper w="70%" m="auto" p="xs">
      <Flex direction="column" gap="xs">
        <Box>
          <Button>
            Register a User
          </Button>
        </Box>

        <Box>
          {table}
        </Box>

      </Flex>
    </Paper>


  )
}

export default UserDashboardPage;