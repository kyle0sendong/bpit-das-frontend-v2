import { useState } from "react";
import classes from './css/TableForm.module.css';

import { Table, Button,  ScrollArea, Group,  } from "@mantine/core";
import { useForm } from "@mantine/form";

import cx from 'clsx';

import TableRows from "./TableRows";
import TableColumn from "./TableColumn";
import modifyFormValues from "./modifyFormValues";

import { useUpdateVirtualChannel, useGetAllVirtualChannels } from "@/hooks/virtualChannelsHook";
import { useGetAllTcpParameters } from "@/hooks/tcpParametersHook";
import { VirtualChannelsType } from "@/types/virtualChannels";

const TableForm = () => {
  
  const [scrolled, setScrolled] = useState(false);
  const { mutate: updateVirtualChannel } = useUpdateVirtualChannel()

  const form = useForm<VirtualChannelsType>({
    mode:"uncontrolled"
  });

  const parameters = useGetAllTcpParameters();
  const virtualChannels = useGetAllVirtualChannels();

  if(virtualChannels.isFetched && parameters.isFetched) {
    const virtualChannelsData = virtualChannels.data;
    const parametersData = parameters.data;

    return (

      <form 
        onSubmit={ 
          form.onSubmit( (values) => {
            updateVirtualChannel(modifyFormValues(values))
          })
        }
      >
        <ScrollArea h="55vh" onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
          <Table highlightOnHover withColumnBorders withRowBorders={false} ta="center">
            <Table.Thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
              <TableColumn />
            </Table.Thead>
            <Table.Tbody style={{fontSize:'0.8rem'}}>
              <TableRows virtualChannelsData={virtualChannelsData} parametersData={parametersData} form={form}/>
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


}

export default TableForm;