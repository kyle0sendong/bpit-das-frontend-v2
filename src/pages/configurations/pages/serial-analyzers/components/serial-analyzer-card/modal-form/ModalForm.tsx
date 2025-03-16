import { useState, useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, TextInput, Box, NativeSelect, Flex, Popover, Group, Loader, Text, NumberInput } from "@mantine/core";

import { useForm } from "@mantine/form";
import { Navigate } from "react-router-dom";
import { IconCheck, IconTrash } from "@tabler/icons-react";

import { getDataSampling, getSerialMode, getBaudRates, getParity, getDataBits, getStopBits } from '@/utils/analyzers'
import { SerialAnalyzerType } from "@/types/serialAnalyzers";
import { useUpdateSerialAnalyzer, useDeleteSerialAnalyzer } from "@/hooks/serialAnalyzersHook";

const ModalForm = ({analyzerData}: {analyzerData: SerialAnalyzerType}) => {

  const [opened, { open, close }] = useDisclosure(false);
  const { mutate: updateSerialAnalyzer, isPending: isPendingUpdate } = useUpdateSerialAnalyzer(analyzerData.id);
  const { mutate: deleteSerialAnalyzer, isPending: isPendingDelete, isSuccess } = useDeleteSerialAnalyzer(analyzerData.id);
  
  const [serialMode, setSerialMode] = useState("rtu");

  const form = useForm<Partial<SerialAnalyzerType>>({
    mode:'uncontrolled',
    validate: (values) => ({
      name: values.name == undefined && "Analyzer Name is required",
      port_name: values.port_name == undefined && "Port Name is required",
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

  // Set initial values with new analyzer data
  useEffect(() => {
    form.setValues({
      id: analyzerData.id,
      name: analyzerData.name,
      port_name: analyzerData.port_name,
      mode: analyzerData.mode,
      ascii_command: analyzerData.ascii_command ?? 'asd',
      device_address: analyzerData.device_address,
      sampling: analyzerData.sampling,
      baud_rate: analyzerData.baud_rate,
      parity: analyzerData.parity,
      data_bits: analyzerData.data_bits,
      stop_bits: analyzerData.stop_bits,
      flow_control: analyzerData.flow_control
    });
  }, [analyzerData]);

  return (
    <>
      <Button h="100%" p="sm" variant="default" onClick={open} style={{fontSize:"1.3rem"}}>
        {analyzerData.name}
      </Button>

      <Modal
        miw="40rem"
        opened={opened}
        onClose={close}
        title={`Edit ${analyzerData.name}`}
        centered
      >
        <form onSubmit={ form.onSubmit( (value) =>  {
          form.setFieldValue('id', analyzerData.id);
          updateSerialAnalyzer(value)
        })}>
          <Box mb="1rem">

            <TextInput
              label="Name"
              size='xs'
              placeholder='e.g. RS232'
              key={form.key('name')}
              {...form.getInputProps('name')}
            />

            <TextInput
              label="Port Name"
              size='xs'
              placeholder='e.g. COM1'
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
              value={serialMode}
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
            <Popover position="bottom" withArrow shadow="md">
              <Popover.Target>
                <Button 
                  rightSection={<IconTrash size="1rem" />} 
                  variant="filled"
                  color="red"  
                >
                    Delete
                </Button>
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
                      onClick={ () => {
                        deleteSerialAnalyzer(analyzerData.id)
                      }}
                    >
                      Yes
                    </Button>
                }

                { isSuccess && <Navigate to={'/configurations'} />}

                </Group>
              </Popover.Dropdown>
            </Popover>
          
            {
              isPendingUpdate ? 
                <Button color="dark.3" disabled>
                  <Loader size="sm"/>
                </Button>
              : 
                <Button type="submit" color="dark.3">
                  Save
                </Button>
            }

          </Flex>

        </form>
      </Modal>

    </>
  );
}

export default ModalForm;