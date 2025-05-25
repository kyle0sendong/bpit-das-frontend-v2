import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Flex, Popover, Image } from "@mantine/core";
import DropdownLinks from "./components/popover/dropdown/DropdownLinks";
import DataTable from "./components/table/DataTable";
import { useGetAllTcpAnalyzers, useGetTcpAnalyzerById } from "@/hooks/tcpAnalyzersHook";
import { useGetAllSerialAnalyzers, useGetSerialAnalyzerById } from "@/hooks/serialAnalyzersHook";

import { TcpAnalyzerType } from "@/types/tcpAnalyzers";
import { SerialAnalyzerType } from "@/types/serialAnalyzers";

import { PrimaryButton } from "@/components/ui/button";

import classes from './DataMonitoringPage.module.css';

const DataMonitoringPage = () => {
  const [openFilter, setOpenFilter] = useState(false);
  const [searchParams] = useSearchParams();
  const monitorType = searchParams.get("type") ?? 'all';
  const id = searchParams.get("id") ?? '0';

  const allTcpAnalyzers = useGetAllTcpAnalyzers(monitorType == "all-analyzers" || monitorType == "all");
  const tcpAnalyzer = useGetTcpAnalyzerById(parseInt(id), monitorType == "tcp");
  const allSerialAnalyzers = useGetAllSerialAnalyzers(monitorType == "all-analyzers" || monitorType == "all");
  const serialAnalyzer = useGetSerialAnalyzerById(parseInt(id), monitorType=="serial");
  let dataTables: JSX.Element[] | JSX.Element = <></>;

  if(monitorType == 'all' && allTcpAnalyzers.isFetched && allSerialAnalyzers.isFetched) {
    dataTables = [
      ...allTcpAnalyzers.data.map((item: TcpAnalyzerType) => <DataTable key={`tcp-${item.id}`} id={item.id} title={`${item.name} (TCP)`} type='tcp'/>),
      ...allSerialAnalyzers.data.map((item: SerialAnalyzerType) => <DataTable key={`serial-${item.id}`} id={item.id} title={`${item.name} (Serial)`} type='serial'/>),
      <DataTable key="virtual-channels" title="Virtual Channels" type="vc"/>
    ]
  }
  
  if(monitorType == 'all-tcp-analyzers' && allTcpAnalyzers.isFetched) {
    dataTables = allTcpAnalyzers.data.map((item: TcpAnalyzerType) => <DataTable key={`tcp-${item.id}`} id={item.id} title={item.name} type='tcp'/>);
  }

  if(monitorType == 'tcp' && tcpAnalyzer.isFetched) {
    dataTables = <DataTable key={`tcp-${tcpAnalyzer.data[0].id}`} id={tcpAnalyzer.data[0].id} title={tcpAnalyzer.data[0].name} type='tcp'/>;
  }

  if(monitorType == 'all-serial-analyzers' && allSerialAnalyzers.isFetched) {
    dataTables = allSerialAnalyzers.data.map((item: SerialAnalyzerType) => <DataTable key={`serial-${item.id}`} id={item.id} title={item.name} type='serial'/>);
  }

  if(monitorType == 'serial' && serialAnalyzer.isFetched) {
    dataTables = <DataTable key={`serial-${serialAnalyzer.data[0].id}`} id={serialAnalyzer.data[0].id} title={serialAnalyzer.data[0].name} type='serial'/>;
  }

  if(monitorType == 'virtual-channels') {
    dataTables = <DataTable  key="virtual-channels" title="Virtual Channels" type="vc"/>;
  }

  return (
    <Flex w="100%" direction='column'>

      <Flex className={classes.header_container}>

        <p>
          OOOOVERVIEEEW
        </p>

        <Popover
          opened={openFilter} 
          onChange={setOpenFilter} 
          position="bottom"
        >
          <Popover.Target>
            <div className={classes.filter_btn}>
              <PrimaryButton
                onClick={() => setOpenFilter( (open) => !open)}
                icon={<Image src="/filter.png" alt="filter" w="1.3rem" />}
              />
            </div>
          </Popover.Target>
          <Popover.Dropdown p={0} ml='-6rem'>
            <DropdownLinks />
          </Popover.Dropdown>
        </Popover>
      </Flex>

      <Flex w="100%" direction="column" align="center" p="xs" gap="1rem">
        {dataTables}
      </Flex>
    </Flex>
  )

}

export default DataMonitoringPage;