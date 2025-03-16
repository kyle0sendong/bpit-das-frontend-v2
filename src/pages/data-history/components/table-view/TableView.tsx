import { useSearchParams } from 'react-router-dom';

import { useGetTcpParametersByAnalyzerId } from "@/hooks/tcpParametersHook";
import { useGetAnalyzerData } from '@/hooks/analyzerDataHook';

import ParametersTable from './table/ParametersTable';
import { ParameterType } from '@/types/parameters';
import { Box } from '@mantine/core';

import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef
} from 'mantine-react-table';


const columns: MRT_ColumnDef<any>[] = [ 
  {
    accessorKey: 'datetime',
    header: 'Date & Time',
    size: 100
  }
]

const data: any[] = []

const TableView = () => {

  const [ searchParams ] = useSearchParams()
  const timebase = searchParams.get("timebase") ?? '1';
  const from = searchParams.get("from") ;
  const to = searchParams.get("to");
  const tcp_analyzer = searchParams.get("tcp_analyzer") ?? '0';
  const analyzer_type = searchParams.get("analyzer_type") ?? 'tcp';

  const table = useMantineReactTable({
    columns,
    data, //should fallback to empty array while loading data
    state: { isLoading: true },
  });

  const analyzerData = useGetAnalyzerData({
    timebase: timebase,
    from: from,
    to: to,
    analyzer: tcp_analyzer,
    analyzerType: analyzer_type
  })
  
  const tcpParameters = useGetTcpParametersByAnalyzerId(parseInt(tcp_analyzer));

  if(tcpParameters.isFetched && analyzerData.isFetched) {
    const tcpParametersData: ParameterType[] = tcpParameters.data;
    const data: any[] = analyzerData.data;

    return (
      <Box w="100%" p="1rem">
        <ParametersTable 
          parameters={tcpParametersData}
          data={data}
          analyzerType={analyzer_type}
          tcpAnalyzerId={tcp_analyzer}
        />
      </Box>
    )
  }

  if(tcpParameters.isLoading && analyzerData.isLoading) {
    return (
      <Box w="100%" p="1rem">
        <MantineReactTable table={table} />
      </Box>
    )
  }

  return (
    <Box p="1rem">
      Please select from the sidebar menu
    </Box>
  )
}

export default TableView;