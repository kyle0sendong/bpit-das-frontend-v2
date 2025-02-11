import { useSearchParams } from "react-router-dom";
import { Flex } from "@mantine/core";
import NavbarNested from "./components/sidebar/navbar/NavbarNested";
import DataTable from "./components/table/DataTable";
import { useGetAllTcpAnalyzers, useGetTcpAnalyzerById } from "@/hooks/tcpAnalyzersHook";
import { useGetAllVirtualChannels } from "@/hooks/virtualChannelsHook";

const DataMonitoringPage = () => {

  const [searchParams] = useSearchParams();
  const monitorType = searchParams.get("type") ?? 'all-analyzers';
  const id = searchParams.get("id") ?? '0';

  const allTcpAnalyzers = useGetAllTcpAnalyzers(monitorType == "all-analyzers");
  const tcpAnalyzer = useGetTcpAnalyzerById(parseInt(id), monitorType=="tcp");
  const virtualChannels = useGetAllVirtualChannels(monitorType=="virtual-channels");

  const dataTables = 
    (monitorType == 'all-analyzers' && allTcpAnalyzers.isFetched) ? 
      allTcpAnalyzers.data.map((item: any) => <DataTable id={item.id} title={item.name} type={monitorType}/>) :
    (monitorType == 'all-tcp-analyzers' && allTcpAnalyzers.isFetched) ? 
      allTcpAnalyzers.data.map((item: any) => <DataTable id={item.id} title={item.name} type={monitorType}/>) :
    (monitorType == 'virtual-channels' && virtualChannels.isFetched) ? 
      <DataTable parameters={virtualChannels.data}/> :
    (monitorType == 'tcp' && tcpAnalyzer.isFetched) ? 
      <DataTable id={tcpAnalyzer.data[0].id} title={tcpAnalyzer.data[0].name} type={monitorType}/> : <></>

  return (
    <Flex w="100%">
      <NavbarNested />
      <Flex w="100%" direction="column" align="center" p="xs">
        {dataTables}
      </Flex>
    </Flex>
  )

}

export default DataMonitoringPage;