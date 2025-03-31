import { useGetSerialParametersByAnalyzerId } from "@/hooks/serialParametersHook";
import { useGetSerialAnalyzerById } from "@/hooks/serialAnalyzersHook";
import TableForm from "./table-form/TableForm";

import { ParameterType } from "@/types/parameters";


const ParametersTable = ({id}: {id:string}) => {

  const parameters = useGetSerialParametersByAnalyzerId(parseInt(id));
  const analyzer = useGetSerialAnalyzerById(parseInt(id), true);

  if(parameters.isFetched && analyzer.isFetched) {
    const analyzerData = analyzer.data[0];
    const parametersData: ParameterType[] = parameters.data;
    return (
      <TableForm parametersData={parametersData} analyzerData={analyzerData}/>
    )
  }

}

export default ParametersTable;