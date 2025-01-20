import { useGetParametersByAnalyzerId } from "@/hooks/tcpParametersHook";
import TableForm from "./table-form/TableForm";

import { TcpParametersType } from "@/types/tcpParameters";

const TcpParametersCard = ({id}: {id:string}) => {

  const parameters = useGetParametersByAnalyzerId(parseInt(id));

  if(parameters.isFetched) {
    const parametersData: TcpParametersType[] = parameters.data;
    return (
      <TableForm parametersData={parametersData} />
    )
  }

}

export default TcpParametersCard;