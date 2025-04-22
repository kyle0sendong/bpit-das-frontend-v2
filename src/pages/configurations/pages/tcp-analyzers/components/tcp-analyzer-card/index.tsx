import { Loader } from "@mantine/core";
import { useGetTcpAnalyzerById } from "@/hooks/tcpAnalyzersHook";

import { TcpAnalyzerType } from "@/types/tcpAnalyzers";
import classes from './TcpAnalyzerCard.module.css'

const TcpAnalyzerCard = ({id}: {id: string}) => {

  const tcpAnalyzer = useGetTcpAnalyzerById(parseInt(id), true);

  if(tcpAnalyzer.isFetched) {

    const analyzerData: TcpAnalyzerType = tcpAnalyzer.data[0];

    return (

      <div className={classes.container}>

        <p className={classes.title}>
          {analyzerData.name}
        </p>
        
        <div className={classes.text_container}>
          <p> <b>IP Address:</b> {analyzerData.host_address}</p>
          <p> <b>Port:</b> {analyzerData.port}</p>

          <p> <b>Device Address:</b> {analyzerData.device_address}</p>
          <p> <b>Sampling:</b> {analyzerData.sampling}%</p>
        </div>
      </div>
    )
  }

  if(tcpAnalyzer.isLoading) {
    return (
      <Loader size="lg"/>
    )
  }

}

export default TcpAnalyzerCard;
