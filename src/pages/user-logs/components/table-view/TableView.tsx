import { useSearchParams } from 'react-router-dom';

import { Text, Loader } from '@mantine/core';


import { useGetUserLogsByDate } from '@/hooks/userLogsHook';
import UserLogsTable from './table/UserLogsTable';
import { getCurrentDate } from '@/utils/dates';

import { UserLogsType } from '@/types/userLogs';

const TableView = () => {

  const [ searchParams ] = useSearchParams()
  const from = searchParams.get("from") ?? getCurrentDate();
  const to = searchParams.get("to") ?? getCurrentDate();

  const userLogs = useGetUserLogsByDate(from, to);

  if(userLogs.isFetched) {
    const data: UserLogsType[] = userLogs.data;

    return (
      <div>
        <UserLogsTable 
          data={data}
        />
      </div>
    )
  }

  if(userLogs.isLoading) {
    return (
      <Loader />
    )
  }

  return (
    <Text>
      Please select a date from the sidebar menu
    </Text>
  )
}

export default TableView;