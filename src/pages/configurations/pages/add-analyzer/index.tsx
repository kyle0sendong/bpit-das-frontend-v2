import { Flex, Paper } from "@mantine/core";
import { useSearchParams } from "react-router-dom";

import InsertTcpForm from "./components/insert-tcp";
import InsertSerialForm from "./components/insert-serial";

const AddAnalyzerPage = () => {

  const [searchParams] = useSearchParams();
  return (
    <Flex w="100%" align={'center'} justify={'center'}>
      <Paper w="80%" shadow="md" p="md" c="var(--color1)">
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