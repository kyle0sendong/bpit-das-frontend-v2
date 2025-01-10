import { useGetParametersByAnalyzerId } from "@/hooks/parametersHook";

const TcpParametersCard = ({id}: {id:string}) => {

  const parameters = useGetParametersByAnalyzerId(parseInt(id));

  if(parameters.isFetched) {
    console.log(parameters.data)
  }

}

export default TcpParametersCard;