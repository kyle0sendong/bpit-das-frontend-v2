import { Table } from "@mantine/core";

const testData = [
  {
     dateTime: "02/02/2025",
     currentData: 1,
     oneMinute: 2
  },
  {
    dateTime: "02/03/2025",
    currentData: 1,
    oneMinute: 2
  },
  {
    dateTime: "02/04/2025",
    currentData: 1,
    oneMinute: 2
  }
]

const DataTable = () => {
  
  const columns = (
    <Table.Thead>
      <Table.Tr>
        <Table.Th>Date & Time</Table.Th>
        <Table.Th>Current Data</Table.Th>
        <Table.Th>1 minute</Table.Th>
      </Table.Tr>
    </Table.Thead>

  )

  const rows = testData.map( (data) => (
    <Table.Tbody>
      <Table.Tr key={`${data.dateTime}-${data.oneMinute}`}>
        <Table.Td>{data.dateTime}</Table.Td>
        <Table.Td>{data.oneMinute}</Table.Td>
      </Table.Tr>
    </Table.Tbody>
  ));

  return (
    <Table stickyHeader stickyHeaderOffset={60} striped>
      {columns}
      {rows}
    </Table>
  )

}

export default DataTable;