import { Flex, Box } from "@mantine/core";
import NavbarNested from "./components/sidebar/navbar/NavbarNested";
import DataTable from "./components/table/DataTable";

const DataMonitoringPage = () => {

  return (
    <Flex w="100%">
      <NavbarNested />
      <Box>
        <Flex direction="column" w="100%" justify="center" m="xs">
          <DataTable title="testing"/>
        </Flex>
      </Box>


    </Flex>
  )

  

}

export default DataMonitoringPage;