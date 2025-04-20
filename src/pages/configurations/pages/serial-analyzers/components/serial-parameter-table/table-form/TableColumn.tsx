import { Table } from "@mantine/core"

const TableColumn = (props: {mode: string}) => (
  <Table.Tr style={{fontSize:"0.8rem"}}>
    <Table.Th ta="center">Enable</Table.Th>
    <Table.Th ta="center">Parameter Name</Table.Th>
    <Table.Th ta="center" w={50}>Parameter Unit</Table.Th>
    <Table.Th ta="center">Request Interval</Table.Th>
    <Table.Th ta="center" w={120}>Data Format</Table.Th>
    <Table.Th ta="center">Function Code</Table.Th>
    <Table.Th ta="center" w={50}>Start Address</Table.Th>
    <Table.Th ta="center" w={50}>Register Count</Table.Th>
    {
      props.mode === 'ascii' && <Table.Th ta="center">ASCII Command</Table.Th>
    }
    <Table.Th ta="center">Offset Formula</Table.Th>
    <Table.Th ta="center">Actions</Table.Th>
  </Table.Tr>
)

export default TableColumn;