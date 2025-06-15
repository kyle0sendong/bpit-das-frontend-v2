import { useMemo } from 'react';
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
];

const data: any[] = [];

const TableView = () => {
  const [searchParams] = useSearchParams();

  const query = useMemo(() => ({
    timebase: searchParams.get("timebase") ?? '1',
    from: searchParams.get("from") ?? '',
    to: searchParams.get("to") ?? '',
    analyzerType: searchParams.get("analyzerType") ?? 'vc',
    analyzerId: searchParams.get("analyzerId") ?? '0',
    virtualChannel: searchParams.get("virtualChannel") ?? '0',
  }), [searchParams]);

  const table = useMantineReactTable({
    columns,
    data,
    state: { isLoading: true },
  });

  const analyzerData = useGetAnalyzerData({
    timebase: query.timebase,
    from: query.from,
    to: query.to,
    analyzer: query.analyzerId,
    analyzerType: query.analyzerType,
  });

  const virtualChannelsData = useGetVirtualChannelsData({
    timebase: query.timebase,
    from: query.from,
    to: query.to,
    analyzer: query.virtualChannel,
  });

  const tcpParameters = useGetTcpParametersByAnalyzerId(query.analyzerType === "tcp" ? parseInt(query.analyzerId) : 0);
  const serialParameters = useGetSerialParametersByAnalyzerId(query.analyzerType === "serial" ? parseInt(query.analyzerId) : 0);
  const virtualChannels = useGetAllVirtualChannels(query.virtualChannel === "all");

  if (
    (tcpParameters.isFetched || serialParameters.isFetched || virtualChannels.isFetched) &&
    (analyzerData.isFetched || virtualChannelsData.isFetched)
  ) {
    let parametersData: ParameterType[] | VirtualChannelsType[] = tcpParameters.data;
    let data: any[] = analyzerData.data;

    if (query.analyzerType === "serial") {
      parametersData = serialParameters.data;
    }

    if (query.virtualChannel === "all") {
      parametersData = virtualChannels.data;
      data = virtualChannelsData.data;
    }

    if (parametersData) {
      return (
        <Box w="100%" p="1rem">
          <ParametersTable 
            parameters={parametersData}
            data={data}
            analyzerType={query.analyzerType}
            analyzerId={query.analyzerId ?? ''}
          />
        </Box>
      );
    }

    return (
      <Box p="1rem" c="white">
        Please select an analyzer from the filter menu
      </Box>
    );
  }

  if (tcpParameters.isLoading && analyzerData.isLoading) {
    return (
      <Box w="100%" p="1rem">
        <MantineReactTable table={table} />
      </Box>
    );
  }

  return (
    <Box p="1rem" c="white">
      Please select an analyzer from the filter menu
    </Box>
  );
};

export default TableView;
