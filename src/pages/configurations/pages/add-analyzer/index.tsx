import { Flex, Paper } from "@mantine/core";
import { useSearchParams } from "react-router-dom";

import InsertTcpForm from "./components/insert-tcp";
import InsertSerialForm from "./components/insert-serial";

const AddAnalyzerPage = () => {

  const [searchParams] = useSearchParams();
  return (
    <Flex mx="xs" mt="xs" w="100%">
      <Paper w="50%" shadow="md" p="md">
        {
          searchParams.get("type") === "tcp" ?
            <InsertTcpForm /> :
            <InsertSerialForm />
        }
        
      </Paper>
    </Flex>
  )
}

export default AddAnalyzerPage;