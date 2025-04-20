import { useState, useEffect } from "react";
import classes from './TableForm.module.css';

import { Table, ScrollArea, Group } from "@mantine/core";
import { SaveButton1, LoaderButton1 } from "@/components/ui/button";

import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import cx from 'clsx';

import TableRows from "./TableRows";
import TableColumn from "./TableColumn";
import modifyFormValues from "./modifyFormValues";

import { useUpdateVirtualChannel, useGetAllVirtualChannels } from "@/hooks/virtualChannelsHook";
import { useGetAllTcpParameters } from "@/hooks/tcpParametersHook";
import { useGetAllSerialParameters } from "@/hooks/serialParametersHook";
import { VirtualChannelsType } from "@/types/virtualChannels";

const TableForm = () => {

  const [errorState, setErrorState] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { mutate: updateVirtualChannel, isPending, isError }  = useUpdateVirtualChannel()

  const tcpParameters = useGetAllTcpParameters();
  const serialParameters = useGetAllSerialParameters();
  const virtualChannels = useGetAllVirtualChannels(true);

  const form = useForm<VirtualChannelsType>({
    mode:"uncontrolled"
  });

  useEffect(() => {
    if (isError) {
      setErrorState(true);
      const timer = setTimeout(() => {
        setErrorState(false)
        form.reset()
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isError]);

  const handleSubmit = (values: any) => {
    updateVirtualChannel(modifyFormValues(values), {
      onError: () => {
        showNotification({
          title: "Update Failed",
          message: "An error occurred while updating the parameters.",
          color: "red",
          autoClose: 5000, // Notification disappears after 5s
        });
      },
      onSuccess: () => {
        showNotification({
          title: "Update Successful",
          message: "Parameters have been updated successfully!",
          color: "green",
          autoClose: 3000,
        });
      },
    });
  };

  if(virtualChannels.isFetched && tcpParameters.isFetched && serialParameters.isFetched) {
    const virtualChannelsData = virtualChannels.data;
    const parametersData = [...tcpParameters.data, ...serialParameters.data];

    return (

      <form 
        onSubmit={form.onSubmit( handleSubmit)}
      >
        <ScrollArea 
          onScrollPositionChange={({ y }) => setScrolled(y !== 0)} 
          className={classes.table_container}
          classNames={{
            thumb: classes.scrollThumb
          }}
        >
          <Table
            withRowBorders={false}
            ta="center"
          >
            <Table.Thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
              <TableColumn />
            </Table.Thead>
            <Table.Tbody style={{fontSize:'0.8rem'}} className={classes.input}>
              <TableRows virtualChannelsData={virtualChannelsData} parametersData={parametersData} form={form}/>
            </Table.Tbody>
          </Table>
        </ScrollArea>
  
        <Group justify="flex-end" mx="lg" my="md">
          {isPending ? (
            <LoaderButton1 />
          ) : (
            <SaveButton1 
              isDisabled={errorState}
            />
          )}
      </Group>
      </form>
    )
  }


}

export default TableForm;