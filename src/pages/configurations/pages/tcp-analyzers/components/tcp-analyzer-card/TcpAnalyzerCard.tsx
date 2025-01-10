import { Loader, Paper, Button, Flex, Box, Text } from "@mantine/core";
import { useGetTcpAnalyzerById } from "@/hooks/tcpAnalyzersHook";

import { TcpAnalyzerType } from "@/types/tcpAnalyzers";

const TcpAnalyzerCard = ({id}: {id: string}) => {

  const tcpAnalyzer = useGetTcpAnalyzerById(parseInt(id));

  if(tcpAnalyzer.isFetched) {

    const tcpAnalyzerData: TcpAnalyzerType = tcpAnalyzer.data[0];

    return (
      <Flex w="100%" m="xs">

        <Paper shadow="md" my="auto" p="xs">
          <Flex gap={14} align="center">
            <Paper shadow="md">
              <Button h="100%" p="sm" variant="default" style={{fontSize:"1.3rem"}}>
                {tcpAnalyzerData.name}
              </Button>
            </Paper>

            <Box px="sm">
              <Text my="xs" size="0.9rem"> <b>IP Address:</b> {tcpAnalyzerData.host_address}</Text>
              <Text my="xs" size="0.9rem"> <b>Port:</b> {tcpAnalyzerData.port}</Text>
            </Box>

            <Box px="sm">
              <Text my="xs" size="0.9rem"> <b>Device Address:</b> {tcpAnalyzerData.device_address}</Text>
              <Text my="xs" size="0.9rem"> <b>Data Threshold:</b> {tcpAnalyzerData.sampling}%</Text>
            </Box>
          </Flex>

        </Paper>
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
