import { Flex, Paper } from "@mantine/core";

import InsertTcpForm from "./components/insert-tcp/InsertTcpForm";

const AddAnalyzerPage = () => {

  return (
    <Flex mx="xs" mt="xs" w="100%" bd="1px solid red" justify="center">
      <Paper w="50%" shadow="md" p="md" mt="xs">
        <InsertTcpForm />
      </Paper>
    </Flex>
  )
}

export default AddAnalyzerPage;