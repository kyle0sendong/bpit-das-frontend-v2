import { Box, Flex } from "@mantine/core";
import { useSearchParams } from "react-router-dom";

import { useGetParametersByAnalyzerId } from "@/hooks/parametersHook";

import TcpAnalyzerCard from "./components/TcpAnalyzerCard"

const TcpAnalyzers = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id") ?? '0';

  const parameters = useGetParametersByAnalyzerId(parseInt(id));


  if(parameters.isFetched) {
    console.log(parameters.data)
  }

  return (
    <Box w="100%">
      <Flex h="10%">
        <TcpAnalyzerCard id={id}/>
      </Flex>
      <Flex h="90%" w="100%"></Flex>
    </Box>
  )
}

export default TcpAnalyzers;