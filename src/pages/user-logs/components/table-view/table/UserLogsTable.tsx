import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from 'mantine-react-table';

import classes from '@/pages/data-history/components/table-view/table/ParametersTable.module.css';

import { UserLogsType } from '@/types/userLogs';

type UserLogsTableProps = {
  data: UserLogsType[]
}

const columns: MRT_ColumnDef<any>[] = [ 
  {
    accessorKey: 'username',
    header: 'Username',
    size: 25
  },
  {
    accessorKey: 'formatted_date',
    header: 'Date & Time',
    size: 50
  },
  {
    accessorKey: 'tags',
    header: 'Tags',
    size: 40
  },
  {
    accessorKey: 'changes',
    header: 'Changes',
    size: 200
  },
]

const UserLogsTable = (props: UserLogsTableProps) => {

  const table = useMantineReactTable({
    columns,
    data: props.data,
    enableRowSelection: false,
    columnFilterDisplayMode: 'popover',
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
    enableTopToolbar: false,
    enableColumnFilters:false,
    initialState: { density: "xs"},

    mantineTableContainerProps: {
      className: classes.table_container
    },
    mantineTableProps: {
      className: classes.table
    },
    mantineTableHeadCellProps: {
      className: classes.header_cell
    },
    mantineTopToolbarProps: {
      className: classes.toolbar
    },
    mantinePaperProps: {
      className: classes.paper,
    },
    mantineSelectAllCheckboxProps: {
      className: classes.customCheckbox
    },
    mantineFilterCheckboxProps: {
      className: classes.customCheckbox
    },
    mantineSelectCheckboxProps: {
      className: classes.customCheckbox
    },
    mantinePaginationProps: {
      classNames: {
        control: classes.paginationControl, // Applies to ALL pagination buttons
      },
    },
    mantineBottomToolbarProps: {
      className: classes.rowsPerPageSelect, // this is just to scope your style
    },
  });
  return (
    <MantineReactTable table={table}/>
  )
    
  

}

export default UserLogsTable;