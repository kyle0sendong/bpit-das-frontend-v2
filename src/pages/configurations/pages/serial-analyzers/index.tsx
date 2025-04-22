import { Box, Flex } from "@mantine/core";
import { useSearchParams } from "react-router-dom";

import AnalyzerCard from "./components/serial-analyzer-card"
import ParametersTable from "./components/serial-parameter-table";

const SerialAnalyzers = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id") ?? '0';

  return (
    <Box w="100%">
      <Flex ml="xs" justify="space-between" >
        <AnalyzerCard id={id}/>
      </Flex>
      <Flex>
        <ParametersTable id={id}/>
      </Flex>
    </Box>
  )
}

export default SerialAnalyzers;