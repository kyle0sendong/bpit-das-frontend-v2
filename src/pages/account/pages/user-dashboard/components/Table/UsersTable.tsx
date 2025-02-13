import { useState } from "react";
import classes from './css/TableForm.module.css';

import { Table, ScrollArea } from "@mantine/core";

import cx from 'clsx';

import TableRows from "./TableRows";
import TableColumn from "./TableColumn";

const UsersTable = () => {
  
  const [scrolled, setScrolled] = useState(false);

  return (
    <ScrollArea h="70vh" onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
      <Table highlightOnHover withColumnBorders withRowBorders={false} ta="center">
        <Table.Thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <TableColumn />
        </Table.Thead>
        <Table.Tbody style={{fontSize:'0.8rem'}}>
          <TableRows />
        </Table.Tbody>
      </Table>
    </ScrollArea>
  )

}

export default UsersTable;