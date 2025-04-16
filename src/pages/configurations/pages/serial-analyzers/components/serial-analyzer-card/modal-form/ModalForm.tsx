import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { Modal, Button, TextInput, Box, NativeSelect, Flex, Popover, Group, Loader, NumberInput } from "@mantine/core";

import { IconCheck, IconTrash } from "@tabler/icons-react";

import { useGetSerialPorts } from "@/hooks/serialAnalyzersHook";
import { getDataSampling, getSerialMode, getBaudRates, getParity, getDataBits, getStopBits } from '@/utils/analyzers'

import { SerialAnalyzerType } from "@/types/serialAnalyzers";
import { useUpdateSerialAnalyzer, useDeleteSerialAnalyzer } from "@/hooks/serialAnalyzersHook";

const ModalForm = ({analyzerData}: {analyzerData: SerialAnalyzerType}) => {

  const [errorUpdateState, setErrorUpdateState] = useState(false);
  const [errorDeleteState, setErrorDeleteState] = useState(false);

  const [popoverOpened, setPopoverOpened] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);

  const serialPorts = useGetSerialPorts();
  const { mutate: updateSerialAnalyzer, isPending: isPendingUpdate, isError: isErrorUpdate } = useUpdateSerialAnalyzer(analyzerData.id);
  const { mutate: deleteSerialAnalyzer, isPending: isPendingDelete, isError: isErrorDelete, isSuccess } = useDeleteSerialAnalyzer(analyzerData.id);
  
  const [serialMode, setSerialMode] = useState("rtu");

  const form = useForm<Partial<SerialAnalyzerType>>({
    mode:'uncontrolled',
    validate: (values) => ({
      name: values.name == undefined && "Analyzer Name is required",
      port_name: values.port_name == undefined || values.port_name == '' && "Port Name is required",
      mode: values.mode == undefined && "Mode is required",
      device_address: values.device_address == undefined && "Device Address is required",
      sampling: values.sampling == undefined && "Sampling is required",
      baud_rate: values.baud_rate == undefined && "Baud Rate is required",
      parity: values.parity == undefined && "Parity is required",
      data_bits: values.data_bits == undefined && "Data Bits is required",
      stop_bits: values.stop_bits == undefined && "Stop Bits is required",
      flow_control: values.flow_control == undefined && "Flow Control is required",
    })
  });

  useEffect( () => {
    form.setFieldValue("id", analyzerData.id);
    form.setFieldValue("name", analyzerData.name);
    form.setFieldValue("port_name", analyzerData.port_name);
    form.setFieldValue("mode", analyzerData.mode);
    form.setFieldValue("ascii_command", analyzerData.ascii_command);
    form.setFieldValue("device_address", analyzerData.device_address);
    form.setFieldValue("sampling", analyzerData.sampling);
    form.setFieldValue("baud_rate", analyzerData.baud_rate);
    form.setFieldValue("parity", analyzerData.parity);
    form.setFieldValue("data_bits", analyzerData.data_bits);
    form.setFieldValue("stop_bits", analyzerData.stop_bits);
    form.setFieldValue("flow_control", analyzerData.flow_control);
  }, [analyzerData])
  

  useEffect(() => {
    if (isErrorUpdate) {
      setErrorUpdateState(true);
      const timer = setTimeout(() => {
        setErrorUpdateState(false)
        form.reset()
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isErrorUpdate]);

  useEffect(() => {
    if (isErrorDelete) {
      setErrorDeleteState(true);
      const timer = setTimeout(() => {
        setErrorDeleteState(false)
        form.reset()
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isErrorDelete]);

  const handleUpdate = (values: any) => {
    updateSerialAnalyzer(values, {
      onError: () => {
        showNotification({
          title: "Update Failed",
          message: "An error occurred while updating.",
          color: "red",
          autoClose: 3000, // Notification disappears after 5s
        });
      },
      onSuccess: () => {
        form.setValues(values);
        showNotification({
          title: "Update Successful",
          message: "Update successful!",
          color: "green",
          autoClose: 3000,
        });
      },
    });
  };

  const handleDelete = (id: number) => {
    setPopoverOpened(false);
    deleteSerialAnalyzer(id, {
      onError: () => {
        showNotification({
          title: "Delete Failed",
          message: "An error occurred while deleting.",
          color: "red",
          autoClose: 3000, // Notification disappears after 5s
        });
      },
      onSuccess: () => {
        showNotification({
          title: "Delete Successful",
          message: "Deleting successful!",
          color: "green",
          autoClose: 3000,
        });
      },
    });
  };

  if(!serialPorts.isFetched) {
    return (
      <div>
        <Loader />
      </div>
    )
  }

  const serialPortsData = serialPorts?.data || [];
  const serialPortsMenu = serialPortsData.length > 0
    ? serialPortsData.map((port: any) => ({
        label: port.friendlyName || "Unknown Port",
        value: port.path || "N/A"
      }))
    : [{ label: "No ports available", value: "no_ports" }]; 


  return (
    <>
      <Button h="100%" p="sm" variant="default" onClick={open} style={{fontSize:"1.3rem"}}>
        {analyzerData.name}
      </Button>

      <Modal
        opened={opened}
        onClose={close}
        title={`Edit ${analyzerData.name}`}
        centered
      >
        <form
          key={`serial${analyzerData.id}`}
          onSubmit={ form.onSubmit(handleUpdate)}
        >
          <Box mb="1rem">

            <TextInput
              label="Name"
              size='xs'
              placeholder='e.g. RS232'
              key={form.key('name')}
              {...form.getInputProps('name')}
            />

            <NativeSelect
              label="Port Name"
              size='xs'
              data={serialPortsMenu}
              key={form.key('port_name')}
              {...form.getInputProps('port_name')}
            />

            <NumberInput
              label="Device Address"
              size='xs'
              placeholder='1'
              min={0}
              key={form.key('device_address')}
              {...form.getInputProps('device_address')}
            />

            <NativeSelect
              label="Mode"
              size='xs'
              data={getSerialMode}
              key={form.key('mode')}
              defaultValue={serialMode}
              {...form.getInputProps('mode')}
              onChange={(e) => {
                setSerialMode(e.target.value)
                form.setFieldValue('mode', e.target.value)
              }}
            />

            {
              serialMode === 'ascii' && (
                <TextInput
                  label="ASCII Command"
                  size='xs'
                  key={form.key('ascii_command')}
                  {...form.getInputProps('ascii_command')}
                />
              )
            }

            <NativeSelect
              label='Baud Rate'
              size='xs'
              data={getBaudRates}
              key={form.key('baud_rate')}
              {...form.getInputProps('baud_rate')}
            />

            <NativeSelect
              label='Parity'
              size='xs'
              data={getParity}
              key={form.key('parity')}
              {...form.getInputProps('parity')}
            />

            <NativeSelect
              label='Data Bits'
              size='xs'
              data={getDataBits}
              key={form.key('data_bits')}
              {...form.getInputProps('data_bits')}
            />

            <NativeSelect
              label='Stop Bits'
              size='xs'
              data={getStopBits}
              key={form.key('stop_bits')}
              {...form.getInputProps('stop_bits')}
            />

            <NativeSelect
              label='Flow Control'
              size='xs'
              data={getStopBits}
              key={form.key('flow_control')}
              {...form.getInputProps('flow_control')}
            />

            <NativeSelect
              label='Sampling'
              size='xs'
              data={getDataSampling}
              key={form.key('sampling')}
              {...form.getInputProps('sampling')}
            />

          </Box>

          <Flex justify="space-between">
            <Popover
              position="bottom"
              withArrow
              shadow="md"
              opened={popoverOpened}
              onChange={() => setPopoverOpened(true)}
            >
              <Popover.Target>
                {isPendingDelete ? (
                  <Button color="dark.3" disabled>
                    <Loader size="xs" />
                  </Button>
                ) : (
                  <Button 
                    rightSection={<IconTrash size="1rem" />} 
                    variant="filled"
                    color="red"
                    disabled={errorDeleteState}
                    onClick={() => setPopoverOpened(true)}
                  >
                    Delete
                  </Button>
                )}
              </Popover.Target>
              <Popover.Dropdown>
                <Group>

                {
                  isPendingDelete ?                 
                    <Button
                      disabled
                      variant="default"
                      color="red"  
                    >
                        <Loader size="sm"/>
                    </Button>
                  :
                    <Button 
                      justify="center"
                      rightSection={<IconCheck size="1rem" />} 
                      variant="default"
                      onClick={() => handleDelete(analyzerData.id)}
                    >
                      Yes
                    </Button>
                }

                { isSuccess && <Navigate to={'/configurations'} />}

                </Group>
              </Popover.Dropdown>
            </Popover>
          
            { 
              isPendingUpdate ? (
                <Button color="dark.3" disabled>
                  <Loader size="xs" />
                </Button>
              ) : (
                <Button 
                  type="submit"
                  color="dark.3"
                  disabled={errorUpdateState}
                >
                  Save
                </Button>
              )
            }

          </Flex>

        </form>
      </Modal>

    </>
  );
}

export default ModalForm;