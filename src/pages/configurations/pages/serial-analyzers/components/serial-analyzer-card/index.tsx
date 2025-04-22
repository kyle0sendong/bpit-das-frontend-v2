import { Loader } from '@mantine/core';

import { useGetSerialAnalyzerById } from '@/hooks/serialAnalyzersHook';
import { SerialAnalyzerType } from '@/types/serialAnalyzers';

import classes from './SerialAnalyzerCard.module.css';

const AnalyzerCard = ({id}: {id: string}) => {

  const serialAnalyzer = useGetSerialAnalyzerById(parseInt(id), true);

  if(serialAnalyzer.isFetched) {

    const analyzerData: SerialAnalyzerType = serialAnalyzer.data[0];

    return (

      <div className={classes.container}>

        <p className={classes.title}>
          {analyzerData.name}
        </p>

        <div className={classes.text_container}>
          <p> <b>Port Name:</b> {analyzerData.port_name}</p>
          <p> <b>Mode:</b> {analyzerData.mode}</p>
          {analyzerData.mode === 'ascii' && <p> <b>ASCII Command:</b> {analyzerData.ascii_command}</p>}


          <p> <b>Device Address</b> {analyzerData.device_address}</p>
          <p> <b>Sampling</b> {analyzerData.sampling}%</p>


          <p><b>Baud Rate</b> {analyzerData.baud_rate}</p>
          <p><b>Parity</b> {analyzerData.parity}</p>


          <p><b>Data Bits</b> {analyzerData.data_bits}</p>
          <p><b>Stop Bits</b> {analyzerData.stop_bits}</p>
        </div>

      </div>

    )
  }

  if(serialAnalyzer.isLoading) {
    return (
      <Loader size='lg'/>
    )
  }

}

export default AnalyzerCard;
