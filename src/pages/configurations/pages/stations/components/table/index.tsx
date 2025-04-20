import { Table, Loader } from '@mantine/core';
import classes from '../../Stations.module.css';
import { useGetAllTcpAnalyzers } from '@/hooks/tcpAnalyzersHook';
import { useGetAllSerialAnalyzers } from '@/hooks/serialAnalyzersHook';
import RenderRows from './Rows';

import { TcpAnalyzerType } from '@/types/tcpAnalyzers';
import { SerialAnalyzerType } from '@/types/serialAnalyzers';

export default function SummaryTable() {
  
  const allTcpAnalyzers = useGetAllTcpAnalyzers(true);
  const allSerialAnalyzers = useGetAllSerialAnalyzers(true);

  if(allTcpAnalyzers.isLoading && allSerialAnalyzers.isLoading) {
    return <Loader></Loader>
  }

  const renderRows = [
    ...allTcpAnalyzers.data.map((item: TcpAnalyzerType) => <RenderRows key={`tcp-${item.id}`} title={item.name} id={item.id} type='tcp'/>),
    ...allSerialAnalyzers.data.map((item: SerialAnalyzerType) => <RenderRows key={`serial-${item.id}`} title={item.name} id={item.id} type='serial'/>),
    <RenderRows key="virtual-channels" title='Virtual Channel' type="vc"/>
  ]


  return (
    <div className={classes.table_container}>
      <Table>
        <Table.Thead className={classes.header}>
          <Table.Tr>
            <Table.Th>Latest Data Transmission</Table.Th>
            <Table.Th>Analyzer</Table.Th>
            <Table.Th>Parameter Name</Table.Th>
            <Table.Th>Current Data</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody className={classes.rows}>
          {renderRows}
        </Table.Tbody>
      </Table>
    </div>
  );
}

