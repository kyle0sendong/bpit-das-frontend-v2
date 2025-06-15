import { ParameterType } from '@/types/parameters';
import { VirtualChannelsType } from '@/types/virtualChannels';
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
  type MRT_Row,
} from 'mantine-react-table';

import { Flex, Button } from '@mantine/core';
import { IconDownload } from '@tabler/icons-react';
import { jsPDF } from 'jspdf'; //or use your library of choice here
import autoTable from 'jspdf-autotable';

import { toSnakeCase } from '@/utils/strings';
import classes from './ParametersTable.module.css';

type ParametersTableProps = {
  parameters: ParameterType[] | VirtualChannelsType[],
  data: any[],
  analyzerType: string,
  analyzerId: string
}

type Testing = {
  datetime: string
}

const ParametersTable = (props: ParametersTableProps) => {

  const columns: MRT_ColumnDef<any>[] = [ 
    {
      accessorKey: 'formatted_date',
      header: 'Date & Time',
      size: 150
    },
    ...props.parameters.map((parameter) => {
      let accessorKey = `${props.analyzerType}${props.analyzerId}_${toSnakeCase(parameter.name)}`;
      if(props.analyzerType === 'vc') accessorKey = `${props.analyzerType}_${toSnakeCase(parameter.name)}`

      return {
        accessorKey: accessorKey,
        header: parameter.name,
        size: 100
      }
    })
  ]

  const handleExportRows = (rows: MRT_Row<Testing>[]) => {
    const doc = new jsPDF();
    const tableData = rows.map((row) => Object.values(row.original));
    const tableHeaders = columns.map((c) => c.header);
    autoTable(doc, {
      head: [tableHeaders],
      body: tableData,
    });
    doc.save('data-history.pdf');
  };

  const table = useMantineReactTable({
    columns,
    data: props.data,
    enableRowSelection: true,
    columnFilterDisplayMode: 'popover',
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
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

    renderTopToolbarCustomActions: ({ table }) => (
      <Flex
        gap="xs"
        wrap='wrap'
        className={classes.btn_container}
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
      </Flex>
    ),
  });
  return (
    <MantineReactTable table={table}/>
  )
    
}

export default ParametersTable;