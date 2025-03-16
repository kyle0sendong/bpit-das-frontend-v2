import { Box, Flex, Paper } from "@mantine/core";
import { useSearchParams } from "react-router-dom";

import AnalyzerCard from "./components/serial-analyzer-card"
import AddParameterCard from "./components/add-parameter-card";
import ParametersTable from "./components/serial-parameter-table";

const SerialAnalyzers = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id") ?? '0';

  return (
    <Box w="100%">
      <Flex m="xs" justify="space-between" >
        <Paper shadow="md"> <AnalyzerCard id={id}/> </Paper>
        <Paper shadow="md"> <AddParameterCard id={id} /></Paper>
      </Flex>
      <Flex mx="xs">
        <Paper shadow="md" w="100%"> <ParametersTable id={id}/> </Paper>
      </Flex>
    </Box>
  )
}

export default SerialAnalyzers;