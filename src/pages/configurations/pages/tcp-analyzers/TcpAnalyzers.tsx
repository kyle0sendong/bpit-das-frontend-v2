import { Box, Flex } from "@mantine/core";
import { useSearchParams } from "react-router-dom";

import TcpAnalyzerCard from "./components/tcp-analyzer-card/TcpAnalyzerCard"
import TcpParametersCard from "./components/tcp-parameter-card/TcpParametersCard";
const TcpAnalyzers = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id") ?? '0';

  return (
    <Box w="100%">
      <Flex>
        <TcpAnalyzerCard id={id}/>
      </Flex>
      <Flex w="100%">
        <TcpParametersCard id={id}/>
      </Flex>
    </Box>
  )
}

export default TcpAnalyzers;