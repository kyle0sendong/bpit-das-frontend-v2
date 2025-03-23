import { useState } from "react";
import classes from './css/TableForm.module.css';

import { Table, Button,  ScrollArea, Group, Loader } from "@mantine/core";
import { useForm } from "@mantine/form";

import cx from 'clsx';

import TableRows from "./TableRows";
import TableColumn from "./TableColumn";
import modifyFormValues from "./modifyFormValues";

import { useUpdateVirtualChannel, useGetAllVirtualChannels } from "@/hooks/virtualChannelsHook";
import { useGetAllTcpParameters } from "@/hooks/tcpParametersHook";
import { useGetAllSerialParameters } from "@/hooks/serialParametersHook";
import { VirtualChannelsType } from "@/types/virtualChannels";

const TableForm = () => {
  
  const [scrolled, setScrolled] = useState(false);
  const { mutate: updateVirtualChannel, isPending } = useUpdateVirtualChannel()

  const form = useForm<VirtualChannelsType>({
    mode:"uncontrolled"
  });

  const tcpParameters = useGetAllTcpParameters();
  const serialParameters = useGetAllSerialParameters();
  const virtualChannels = useGetAllVirtualChannels(true);

  if(virtualChannels.isFetched && tcpParameters.isFetched && serialParameters.isFetched) {
    const virtualChannelsData = virtualChannels.data;
    const parametersData = [...tcpParameters.data, ...serialParameters.data];

    return (

      <form 
        onSubmit={ 
          form.onSubmit( (values) => updateVirtualChannel(modifyFormValues(values))
          )
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
        {
          isPending ? 
            <Button
              color="dark.3"
              disabled
            >
              <Loader size="xs"/>
            </Button>
          :         
            <Button type="submit" color="dark.3">
              Save
            </Button>
        }
        </Group>
      </form>
    )
  }


}

export default TableForm;