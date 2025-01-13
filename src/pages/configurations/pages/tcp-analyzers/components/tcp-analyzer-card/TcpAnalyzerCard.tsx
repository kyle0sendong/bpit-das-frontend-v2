import { Loader, Paper, Flex, Text } from "@mantine/core";
import { useGetTcpAnalyzerById } from "@/hooks/tcpAnalyzersHook";

import { TcpAnalyzerType } from "@/types/tcpAnalyzers";

import ModalForm from "./modal-form/ModalForm";

const TcpAnalyzerCard = ({id}: {id: string}) => {

  const tcpAnalyzer = useGetTcpAnalyzerById(parseInt(id));

  if(tcpAnalyzer.isFetched) {

    const tcpAnalyzerData: TcpAnalyzerType = tcpAnalyzer.data[0];

    return (

      <Flex gap={14} h="100%" p="md">
        <Paper shadow="md">
          <ModalForm tcpAnalyzerData={tcpAnalyzerData}/>
        </Paper>

        <Flex direction="column" gap="xs" my="auto">
          <Text size="0.9rem"> <b>IP Address:</b> {tcpAnalyzerData.host_address}</Text>
          <Text size="0.9rem"> <b>Port:</b> {tcpAnalyzerData.port}</Text>
        </Flex>

        <Flex direction="column" gap="xs" my="auto">
          <Text size="0.9rem"> <b>Device Address:</b> {tcpAnalyzerData.device_address}</Text>
          <Text size="0.9rem"> <b>Data Threshold:</b> {tcpAnalyzerData.sampling}%</Text>
        </Flex>
      </Flex>

    )
  }

  if(tcpAnalyzer.isLoading) {
    return (
      <Loader size="lg"/>
    )
  }

}

export default TcpAnalyzerCard;
