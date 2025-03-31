import { Flex } from "@mantine/core";
import SidebarMenu from "./components/sidebar-menu/SidebarMenu";
import TableView from "./components/table-view/TableView";
import GraphView from "./components/graph-view/GraphView";

import { useSearchParams } from "react-router-dom";


const DataHistoryPage = () => {
  const [searchParams] = useSearchParams();
  const view = searchParams.get("view");
  return (
    <Flex w="100%">
      <SidebarMenu />

      {
        view === "table" ? <TableView /> : view === "graph" ? <GraphView /> : <>Please use the sidebar menu</>
      }
      
    </Flex>
  )
}

export default DataHistoryPage;