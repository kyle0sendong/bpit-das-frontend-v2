import { useState } from "react";
import { Table, ScrollArea, Title, Flex } from "@mantine/core";
import classes from "./css/DataTable.module.css"
import cx from "clsx";

const testData = [
  {
     parameter: "testing", dateTime: "02/02/2025",
     currentData: 1,
     oneMinute: 2
  },
  {
    parameter: "testing", dateTime: "02/03/2025",
    currentData: 1,
    oneMinute: 2
  },
  {
    parameter: "testing", dateTime: "02/02/2025",
    currentData: 1,
    oneMinute: 2
 },
 {
   parameter: "testing", dateTime: "02/03/2025",
   currentData: 1,
   oneMinute: 2
 },
 

]

type DataTableProps = {
  title: string
}
const DataTable = ({title}: DataTableProps) => {

  const [scrolled, setScrolled] = useState(false);
  
  const columns = (
    <Table.Thead className={cx(classes.header, { [classes.scrolled]: scrolled })} style={{fontSize:'0.8rem'}}>
      <Table.Tr>
        <Table.Th ta="center" w={200}>Parameter</Table.Th>
        <Table.Th ta="center" w={200}>Date & Time</Table.Th>
        <Table.Th ta="center" w={125}>Current Data</Table.Th>
        <Table.Th ta="center" w={125}>1 minute</Table.Th>
      </Table.Tr>
    </Table.Thead>
  )

  const rows = testData.map( (data) => (
    <Table.Tbody style={{fontSize:'0.8rem'}}>
      <Table.Tr key={`${data.dateTime}-${data.oneMinute}`}>
        <Table.Td>{data.parameter}</Table.Td>
        <Table.Td>{data.dateTime}</Table.Td>
        <Table.Td>{data.currentData}</Table.Td>
        <Table.Td>{data.oneMinute}</Table.Td>
      </Table.Tr>
    </Table.Tbody>
  ));

  return (
    <Flex direction="column" mb="xs">
      <Title size="md" ta="center" p="xs">
        {title}
      </Title>
      <ScrollArea mah="40vh" onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
        <Table bg="white" verticalSpacing="sm" highlightOnHover withColumnBorders ta="center">
          {columns}
          {rows}
        </Table>
      </ScrollArea>
    </Flex>

  )

}

export default DataTable;