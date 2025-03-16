import { Box, Flex, Paper } from "@mantine/core";
import { useSearchParams } from "react-router-dom";

import TcpAnalyzerCard from "./components/tcp-analyzer-card/TcpAnalyzerCard"
import AddParameterCard from "./components/add-parameter-card/AddParameterCard";
import TcpParametersTable from "./components/tcp-parameter-table/TcpParametersTable";
const TcpAnalyzers = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id") ?? '0';

  return (
    <Box w="100%">
      <Flex m="xs" justify="space-between" >
        <Paper shadow="md"> <TcpAnalyzerCard id={id}/> </Paper>
        <Paper shadow="md"> <AddParameterCard id={id} /></Paper>
      </Flex>
      <Flex mx="xs">
        <Paper shadow="md" w="100%"> <TcpParametersTable id={id}/> </Paper>
      </Flex>
    </Box>
  )
}

export default TcpAnalyzers;