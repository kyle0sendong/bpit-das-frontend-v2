import {
  MantineReactTable,
  type MRT_ColumnDef,
  useMantineReactTable,
} from 'mantine-react-table';

import { UserType } from "@/types/users";

type UserTableProps = {
  data: UserType[]
}

const UserTable = (props: UserTableProps) => {
  const columns: MRT_ColumnDef<any>[] = [
    {
      accessorKey: 'username',
      header: 'Username',
    },
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'email',
      header: 'email',
    },
    {
      accessorKey: 'role',
      header: 'Role'
    }
  ]

  const table = useMantineReactTable({
    columns,
    data: props.data,
    enableColumnActions: false,
    enableColumnFilters: false,
    enablePagination: true,
    enableSorting: false,
    enableTopToolbar: false,
    initialState: {
      density:"xs"
    }
  });

  return <MantineReactTable table={table} />;
  
}

export default UserTable