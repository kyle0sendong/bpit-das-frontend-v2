import { Table } from "@mantine/core"

const TableColumn = () => (
  <Table.Tr style={{fontSize:"0.8rem"}}>
    <Table.Th ta="center">Enable</Table.Th>
    <Table.Th ta="center" w="200">Parameter Name</Table.Th>
    <Table.Th ta="center" w="70">Unit</Table.Th>
    <Table.Th ta="center" w="200">Formula</Table.Th>
    <Table.Th ta="center">x</Table.Th>
    <Table.Th ta="center">y</Table.Th>
    <Table.Th ta="center">z</Table.Th>
    <Table.Th ta="center">a</Table.Th>
    <Table.Th ta="center">b</Table.Th>
    <Table.Th ta="center">c</Table.Th>
    <Table.Th ta="center" w="70">Actions</Table.Th>
  </Table.Tr>
)

export default TableColumn;