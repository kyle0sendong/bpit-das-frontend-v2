import { Paper, Flex } from "@mantine/core";
import { useGetParametersByAnalyzerId } from "@/hooks/parametersHook";
import TableForm from "./table-form/TableForm";

import { ParametersType } from "@/types/parameters";

const TcpParametersCard = ({id}: {id:string}) => {

  const parameters = useGetParametersByAnalyzerId(parseInt(id));

  if(parameters.isFetched) {
    const parametersData: ParametersType[] = parameters.data;
    return (
      <Flex w="100%" mx="xs">
        <Paper shadow="md">
          <TableForm parametersData={parametersData} />
        </Paper>
      </Flex>
    )
  }

}

export default TcpParametersCard;