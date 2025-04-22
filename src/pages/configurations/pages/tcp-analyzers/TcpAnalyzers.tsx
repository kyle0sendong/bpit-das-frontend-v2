import { Box, Flex } from "@mantine/core";
import { useSearchParams } from "react-router-dom";

import TcpAnalyzerCard from "./components/tcp-analyzer-card"
import TcpParametersTable from "./components/tcp-parameter-table/TcpParametersTable";
const TcpAnalyzers = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id") ?? '0';

  return (
    <Box w="100%">
      <Flex ml="xs" justify="space-between" >
        <TcpAnalyzerCard id={id}/> 
      </Flex>
      <Flex w="100%">
        <TcpParametersTable id={id}/>
      </Flex>
    </Box>
  )
}

export default TcpAnalyzers;