import { Flex } from "@mantine/core";
import SidebarMenu from "./components/sidebar-menu/SidebarMenu";
import TableView from "./components/table-view/TableView";

const DataHistoryPage = () => {
  return (
    <Flex w="100%" bd="1px solid red">
      <SidebarMenu />
      <TableView />
    </Flex>
  )
}

export default DataHistoryPage;