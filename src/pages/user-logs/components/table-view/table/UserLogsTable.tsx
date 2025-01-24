import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
  type MRT_Row,
} from 'mantine-react-table';

import { Box, Button } from '@mantine/core';
import { IconDownload } from '@tabler/icons-react';
import { jsPDF } from 'jspdf'; //or use your library of choice here
import autoTable from 'jspdf-autotable';

import { UserLogsType } from '@/types/userLogs';

type UserLogsTableProps = {
  data: UserLogsType[]
}

type Testing = {
  datetime: string
}

const columns: MRT_ColumnDef<any>[] = [ 
  {
    accessorKey: 'username',
    header: 'Username',
    size: 50
  },
  {
    accessorKey: 'formatted_date',
    header: 'Date & Time',
    size: 50
  },
  {
    accessorKey: 'tags',
    header: 'Tags',
    size: 50
  },
  {
    accessorKey: 'changes',
    header: 'Changes',
    size: 50
  },
]

const UserLogsTable = (props: UserLogsTableProps) => {

  const handleExportRows = (rows: MRT_Row<Testing>[]) => {
    const doc = new jsPDF();
    const tableData = rows.map((row) => Object.values(row.original));
    const tableHeaders = columns.map((c) => c.header);
    autoTable(doc, {
      head: [tableHeaders],
      body: tableData,
    });
    doc.save('mrt-pdf-example.pdf');
  };

  const table = useMantineReactTable({
    columns,
    data: props.data,
    enableRowSelection: true,
    columnFilterDisplayMode: 'popover',
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
    enableTopToolbar: false,
    enableColumnFilters:false,
    initialState: { density: "xs"},
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        style={{
          display: 'flex',
          gap: '16px',
          padding: '8px',
          flexWrap: 'wrap',
        }}
      >
        <Button
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          //export all rows, including from the next page, (still respects filtering and sorting)
          onClick={() =>
            handleExportRows(table.getPrePaginationRowModel().rows)
          }
          leftSection={<IconDownload />}
          variant="filled"
        >
          Export All Rows
        </Button>
        <Button
          disabled={table.getRowModel().rows.length === 0}
          //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
          onClick={() => handleExportRows(table.getRowModel().rows)}
          leftSection={<IconDownload />}
          variant="filled"
        >
          Export Page Rows
        </Button>
        <Button
          disabled={
            !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
          }
          //only export selected rows
          onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
          leftSection={<IconDownload />}
          variant="filled"
        >
          Export Selected Rows
        </Button>
      </Box>
    ),
  });
  return (
    <MantineReactTable table={table}/>
  )
    
  

}

export default UserLogsTable;