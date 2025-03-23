import { useSearchParams } from "react-router-dom";
import { Flex } from "@mantine/core";
import NavbarNested from "./components/sidebar/navbar/NavbarNested";
import DataTable from "./components/table/DataTable";
import { useGetAllTcpAnalyzers, useGetTcpAnalyzerById } from "@/hooks/tcpAnalyzersHook";
import { useGetAllSerialAnalyzers, useGetSerialAnalyzerById } from "@/hooks/serialAnalyzersHook";

import { TcpAnalyzerType } from "@/types/tcpAnalyzers";
import { SerialAnalyzerType } from "@/types/serialAnalyzers";

const DataMonitoringPage = () => {

  const [searchParams] = useSearchParams();
  const monitorType = searchParams.get("type") ?? 'all-analyzers';
  const id = searchParams.get("id") ?? '0';

  const allTcpAnalyzers = useGetAllTcpAnalyzers(monitorType == "all-analyzers");
  const tcpAnalyzer = useGetTcpAnalyzerById(parseInt(id), monitorType=="tcp");
  const allSerialAnalyzers = useGetAllSerialAnalyzers(monitorType == "all-analyzers");
  const serialAnalyzer = useGetSerialAnalyzerById(parseInt(id), monitorType=="serial");
  let dataTables = <></>;

  if(monitorType == 'all-tcp-analyzers' && allTcpAnalyzers.isFetched) {
    dataTables = allTcpAnalyzers.data.map((item: TcpAnalyzerType) => <DataTable id={item.id} title={item.name} type='tcp'/>);
  }

  if(monitorType == 'tcp' && tcpAnalyzer.isFetched) {
    dataTables = <DataTable id={tcpAnalyzer.data[0].id} title={tcpAnalyzer.data[0].name} type='tcp'/>;
  }

  if(monitorType == 'all-serial-analyzers' && allSerialAnalyzers.isFetched) {
    dataTables = allSerialAnalyzers.data.map((item: SerialAnalyzerType) => <DataTable id={item.id} title={item.name} type='serial'/>);
  }

  if(monitorType == 'serial' && serialAnalyzer.isFetched) {
    dataTables = <DataTable id={serialAnalyzer.data[0].id} title={serialAnalyzer.data[0].name} type='serial'/>;
  }

  if(monitorType == 'virtual-channels') {
    dataTables = <DataTable title="Virtual Channels" type="vc"/>;
  }

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