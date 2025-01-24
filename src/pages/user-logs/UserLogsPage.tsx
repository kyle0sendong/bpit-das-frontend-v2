import { Box, Flex} from "@mantine/core";
import TableView from "./components/table-view/TableView";
import ToolboxMenu from "./components/toolbox/ToolboxMenu";

const UserLogsPage = () => {
  return (
    <Box w="100%" p="xs">
      <Flex mb="xs">
        <ToolboxMenu />
      </Flex>
      
      <Box>
        <TableView />
      </Box>
    </Box>
  )
}

export default UserLogsPage;