import { Flex, Paper } from "@mantine/core";

import InsertTcpForm from "./components/insert-tcp/InsertTcpForm";

const AddAnalyzerPage = () => {

  return (
    <Flex m="xs" w="100%">
      <Paper w="30%" shadow="md" p="md">
        <InsertTcpForm />
      </Paper>
    </Flex>
  )
}

export default AddAnalyzerPage;