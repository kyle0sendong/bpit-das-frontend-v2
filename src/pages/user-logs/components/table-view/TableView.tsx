import { useSearchParams } from 'react-router-dom';

import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef
} from 'mantine-react-table';

import { Text } from '@mantine/core';


import { useGetUserLogsByDate } from '@/hooks/userLogsHook';
import UserLogsTable from './table/UserLogsTable';
import { getCurrentDate } from '@/utils/dates';

import { UserLogsType } from '@/types/userLogs';

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
  const from = searchParams.get("from") ?? getCurrentDate();
  const to = searchParams.get("to") ?? getCurrentDate();

  const table = useMantineReactTable({
    columns,
    data, //should fallback to empty array while loading data
    state: { isLoading: true },
  });

  const userLogs = useGetUserLogsByDate(from, to);


  if(userLogs.isFetched) {
    const data: UserLogsType[] = userLogs.data;
    return (
      <UserLogsTable 
        data={data}
      />
    )
  }

  if(userLogs.isLoading) {
    return (
      <MantineReactTable table={table} />
    )
  }

  return (
    <Text>
      Please select a date from the sidebar menu
    </Text>
  )
}

export default TableView;