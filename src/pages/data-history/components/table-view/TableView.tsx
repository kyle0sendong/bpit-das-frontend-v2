import { useSearchParams } from 'react-router-dom';
import { useGetTcpParametersByAnalyzerId } from "@/hooks/tcpParametersHook";

const TableView = () => {

  const [ searchParams ] = useSearchParams()
  const timebase = searchParams.get("timebase") ?? 1;
  const from = searchParams.get("from") ?? 'none';
  const to = searchParams.get("to") ?? 'none';
  const tcp_analyzer = searchParams.get("tcp_analyzer") ?? '0';

  const tcpParameters = useGetTcpParametersByAnalyzerId(parseInt(tcp_analyzer));
  
  if(tcpParameters.isFetched) {
    return (
      <>
        asdasd
      </>
    )
  }

  return (
    <>
      Please select from the sidebar menu
    </>
  )
}

export default TableView;