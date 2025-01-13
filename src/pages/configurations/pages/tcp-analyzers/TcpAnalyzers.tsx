import { Box, Flex, Paper } from "@mantine/core";
import { useSearchParams } from "react-router-dom";

import TcpAnalyzerCard from "./components/tcp-analyzer-card/TcpAnalyzerCard"
import AddParameterCard from "./components/add-parameter-card/AddParameterCard";
import TcpParametersCard from "./components/tcp-parameter-card/TcpParametersCard";
const TcpAnalyzers = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id") ?? '0';

  return (
    <Box w="100%">
      <Flex m="xs" justify="space-between" >
        <Flex> <Paper shadow="md"> <TcpAnalyzerCard id={id}/> </Paper> </Flex>
        <Flex> <Paper shadow="md"> <AddParameterCard id={id} /></Paper> </Flex>
      </Flex>
      <Flex mx="xs">
        <Flex> <TcpParametersCard id={id}/> </Flex>
      </Flex>
    </Box>
  )
}

export default TcpAnalyzers;