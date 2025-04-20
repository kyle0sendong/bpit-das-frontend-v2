import { Table } from "@mantine/core"

const TableColumn = () => (
  <Table.Tr style={{fontSize:"0.8rem"}}>
    <Table.Th ta="center">Username</Table.Th>
    <Table.Th ta="center">Name</Table.Th>
    <Table.Th ta="center">Email</Table.Th>
    <Table.Th ta="center">Role</Table.Th>
    <Table.Th ta="center" w="100">Actions</Table.Th>
  </Table.Tr>
)

export default TableColumn;