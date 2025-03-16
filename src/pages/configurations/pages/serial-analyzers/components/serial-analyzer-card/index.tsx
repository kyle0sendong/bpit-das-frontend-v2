import { Loader, Paper, Flex, Text } from '@mantine/core';

import { useGetSerialAnalyzerById } from '@/hooks/serialAnalyzersHook';
import { SerialAnalyzerType } from '@/types/serialAnalyzers';
import ModalForm from './modal-form/ModalForm';

const AnalyzerCard = ({id}: {id: string}) => {

  const serialAnalyzer = useGetSerialAnalyzerById(parseInt(id), true);

  if(serialAnalyzer.isFetched) {

    const analyzerData: SerialAnalyzerType = serialAnalyzer.data[0];

    return (

      <Flex gap="lg" h='100%' p='md'>
        <Paper shadow='md'>
          <ModalForm analyzerData={analyzerData}/>
        </Paper>

        <Flex direction='column' gap='xs' my='auto' justify="flex-start" h="100%">
          <Text size='0.9rem'> <b>Port Name:</b> {analyzerData.port_name}</Text>
          <Text size='0.9rem'> <b>Mode:</b> {analyzerData.mode}</Text>
          {analyzerData.mode === 'ascii' && <Text size='0.9rem'> <b>ASCII Command:</b> {analyzerData.ascii_command}</Text>}
        </Flex>

        <Flex direction='column' gap='xs' my='auto' justify="flex-start" h="100%">
          <Text size='0.9rem'> <b>Device Address</b> {analyzerData.device_address}</Text>
          <Text size='0.9rem'> <b>Sampling</b> {analyzerData.sampling}</Text>
        </Flex>

        <Flex direction='column' gap='xs' my='auto' justify="flex-start" h="100%">
          <Text size='0.9rem'><b>Baud Rate</b> {analyzerData.baud_rate}</Text>
          <Text size='0.9rem'><b>Parity</b> {analyzerData.parity}</Text>
        </Flex>

        <Flex direction='column' gap='xs' my='auto' justify="flex-start" h="100%">
          <Text size='0.9rem'><b>Data Bits</b> {analyzerData.data_bits}</Text>
          <Text size='0.9rem'><b>Stop Bits</b> {analyzerData.stop_bits}</Text>
        </Flex>

      </Flex>

    )
  }

  if(serialAnalyzer.isLoading) {
    return (
      <Loader size='lg'/>
    )
  }

}

export default AnalyzerCard;
