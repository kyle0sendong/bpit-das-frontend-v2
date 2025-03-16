import { useGetTcpParametersByAnalyzerId } from "@/hooks/tcpParametersHook";
import TableForm from "./table-form/TableForm";

import { ParameterType } from "@/types/parameters";

const TcpParametersTable = ({id}: {id:string}) => {

  const parameters = useGetTcpParametersByAnalyzerId(parseInt(id));

  if(parameters.isFetched) {
    const parametersData: ParameterType[] = parameters.data;
    return (
      <TableForm parametersData={parametersData} />
    )
  }

}

export default TcpParametersTable;