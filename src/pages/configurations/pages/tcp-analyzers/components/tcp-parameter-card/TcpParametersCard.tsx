import { useGetParametersByAnalyzerId } from "@/hooks/parametersHook";
import TableForm from "./table-form/TableForm";

import { ParametersType } from "@/types/parameters";

const TcpParametersCard = ({id}: {id:string}) => {

  const parameters = useGetParametersByAnalyzerId(parseInt(id));

  if(parameters.isFetched) {
    const parametersData: ParametersType[] = parameters.data;
    return (
      <TableForm parametersData={parametersData} />
    )
  }

}

export default TcpParametersCard;