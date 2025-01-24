import { useState } from "react";
import classes from './css/TableForm.module.css';

import { Table, Button,  ScrollArea, Group,  } from "@mantine/core";
import { useForm } from "@mantine/form";

import cx from 'clsx';

import TableRows from "./TableRows";
import TableColumn from "./TableColumn";
import modifyFormValues from "./modifyFormValues";
import { useUpdateTcpParameter } from "@/hooks/tcpParametersHook";

import { TcpParametersType } from "@/types/tcpParameters";

type TableFormProps = {
  parametersData: TcpParametersType[]
}

const TableForm = ({parametersData}: TableFormProps) => {

  const form = useForm<TcpParametersType>({
    mode:"uncontrolled"
  });

  const [scrolled, setScrolled] = useState(false);
  const { mutate: updateParameter } = useUpdateTcpParameter(parametersData[0]?.analyzer_id, form)


  return (

    <form 
      onSubmit={ 
        form.onSubmit( (values) => {
          updateParameter(modifyFormValues(values))
        })
      }
    >
      <ScrollArea h="55vh" onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
        <Table highlightOnHover withColumnBorders withRowBorders={false} ta="center">
          <Table.Thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
            <TableColumn />
          </Table.Thead>
          <Table.Tbody style={{fontSize:'0.8rem'}}>
            <TableRows parametersData={parametersData} form={form}/>
          </Table.Tbody>
        </Table>
      </ScrollArea>

      <Group justify="flex-end" mx="lg" my="md">
        <Button type="submit" color="dark.3">
          Save
        </Button>
      </Group>
    </form>
  )
}

export default TableForm;