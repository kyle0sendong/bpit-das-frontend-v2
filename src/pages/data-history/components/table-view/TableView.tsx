import { useSearchParams } from 'react-router-dom';

import { useGetTcpParametersByAnalyzerId } from "@/hooks/tcpParametersHook";
import { useGetSerialParametersByAnalyzerId } from '@/hooks/serialParametersHook';
import { useGetAllVirtualChannels } from '@/hooks/virtualChannelsHook';
import { useGetAnalyzerData, useGetVirtualChannelsData } from '@/hooks/analyzerDataHook';

import ParametersTable from './table/ParametersTable';
import { ParameterType } from '@/types/parameters';
import { VirtualChannelsType } from '@/types/virtualChannels';
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
  const queryTimebase = searchParams.get("timebase") ?? '1';
  const queryFrom = searchParams.get("from") ;
  const queryTo = searchParams.get("to");
  const queryAnalyzerType = searchParams.get("analyzerType") ?? 'vc';
  const queryAnalyzerId = searchParams.get("analyzerId") ?? '0';
  const queryVirtualChannel = searchParams.get("virtualChannel") ?? '0';

  const table = useMantineReactTable({
    columns,
    data, //should fallback to empty array while loading data
    state: { isLoading: true },
  });

  const analyzerData = useGetAnalyzerData({
    timebase: queryTimebase,
    from: queryFrom,
    to: queryTo,
    analyzer: queryAnalyzerId,
    analyzerType: queryAnalyzerType
  })

  const virtualChannelsData = useGetVirtualChannelsData({
    timebase: queryTimebase,
    from: queryFrom,
    to: queryTo,
    analyzer: queryVirtualChannel
  })

  const tcpParameters = useGetTcpParametersByAnalyzerId(queryAnalyzerType === "tcp" ? parseInt(queryAnalyzerId) : 0);
  const serialParameters = useGetSerialParametersByAnalyzerId(queryAnalyzerType === "serial" ? parseInt(queryAnalyzerId) : 0);
  const virtualChannels = useGetAllVirtualChannels(queryVirtualChannel === "all");

  if((tcpParameters.isFetched || serialParameters.isFetched || virtualChannels.isFetched)
    && (analyzerData.isFetched || virtualChannelsData.isFetched)) {

    let parametersData: ParameterType[] | VirtualChannelsType[] = tcpParameters.data;
    let data: any[] = analyzerData.data;

    if(queryAnalyzerType === "serial") {
      parametersData = serialParameters.data;
    }

    if(queryVirtualChannel === "all") {
      parametersData = virtualChannels.data;
      data = virtualChannelsData.data;
    }

    if(parametersData) {
      return (
        <Box w="100%" p="1rem">
          <ParametersTable 
            parameters={parametersData}
            data={data}
            analyzerType={queryAnalyzerType}
            analyzerId={queryAnalyzerId ?? ''}
          />
        </Box>
      )
    }
    
    return (
      <Box p="1rem" c="white">
        Please select an analyzer from the filter menu
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
    <Box p="1rem" c="white">
      Please select an analyzer from the filter menu
    </Box>
  )
}

export default TableView;