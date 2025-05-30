import { useState, useEffect } from 'react';

import { TextInput, NativeSelect, Flex, Title, Text, NumberInput, Loader } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { SerialAnalyzerType } from '@/types/serialAnalyzers';
import { SaveButton1, LoaderButton1 } from "@/components/ui/button";
import { useGetSerialPorts } from '@/hooks/serialAnalyzersHook';
import { useInsertSerialAnalyzer } from '@/hooks/serialAnalyzersHook';

import { getDataSampling, getSerialMode, getBaudRates, getParity, getDataBits, getStopBits, getFlowControl } from '@/utils/analyzers'
import classes from '../../InsertForm.module.css';

const InsertSerialForm = () => {

  const [serialMode, setSerialMode] = useState("rtu");
  const [errorState, setErrorState] = useState(false);

  const serialPorts = useGetSerialPorts();

  const form = useForm<Partial<SerialAnalyzerType>>({
    mode:'uncontrolled',
    initialValues:{
      port_name: 'COM1',
      mode: serialMode,
      device_address: 1,
      sampling: 80,
      baud_rate: 9600,
      parity: 'none',
      data_bits: 8,
      stop_bits: 1,
      flow_control: 'none'
    },
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

  const { mutate: insertAnalyzer, isPending, isError } = useInsertSerialAnalyzer(form);

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
    insertAnalyzer(values, {
      onError: () => {
        showNotification({
          title: "Insert Failed",
          message: "An error occurred while inserting a Serial Analyzer.",
          color: "red",
          autoClose: 5000, // Notification disappears after 5s
        });
      },
      onSuccess: () => {
        showNotification({
          title: "Insert Successful",
          message: "Inserting Serial Analyzer successful!",
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
      <form onSubmit={form.onSubmit(handleSubmit)}>

        <Title size='xl' ta='center' mb='md' >
          Add Serial Analyzer {serialMode.toUpperCase()}
        </Title>

        <Flex direction='column' gap='lg'>

          <Flex>
            <Flex direction='column' gap='lg' w="50%" px="lg" pt="md">
              <Flex className={classes.flexContainer}>
                <Text className={classes.text}> Analyzer Name </Text>
                <TextInput
                  className={classes.textInput}
                  size='xs'
                  placeholder='e.g. RS232'
                  key={form.key('name')}
                  {...form.getInputProps('name')}
                />
              </Flex>

              <Flex className={classes.flexContainer}>
                <Text className={classes.text}>Port Name</Text>
                <NativeSelect
                  className={classes.textInput}
                  size='xs'
                  data={serialPortsMenu}
                  key={form.key('port_name')}
                  {...form.getInputProps('port_name')}
                />
              </Flex>

              <Flex className={classes.flexContainer}>
                <Text className={classes.text}>Device Address</Text>
                <NumberInput
                  className={classes.textInput}
                  size='xs'
                  placeholder='1'
                  min={0}
                  key={form.key('device_address')}
                  {...form.getInputProps('device_address')}
                />
              </Flex>

              <Flex className={classes.flexContainer}>
                <Text className={classes.text}>Mode</Text>
                <NativeSelect
                  className={classes.textInput}
                  size='xs'
                  data={getSerialMode}
                  key={form.key('mode')}
                  value={serialMode}
                  onChange={(e) => {
                    setSerialMode(e.target.value)
                    form.setFieldValue('mode', e.target.value)
                  }}
                />
              </Flex>

              {
                serialMode === 'ascii' && (
                  <Flex className={classes.flexContainer}>
                    <Text className={classes.text}>ASCII Command</Text>
                    <TextInput
                      className={classes.textInput}
                      size='xs'
                      key={form.key('ascii_command')}
                      {...form.getInputProps('ascii_command')}
                    />
                  </Flex>
                )
              }
            </Flex>

            <Flex direction='column' gap='lg' w="50%"  px="lg" pt="md">

              <Flex className={classes.flexContainer}>
                <Text className={classes.text}>Baud Rate</Text>
                <NativeSelect
                  className={classes.textInput}
                  size='xs'
                  data={getBaudRates}
                  key={form.key('baud_rate')}
                  {...form.getInputProps('baud_rate')}
                />
              </Flex>

              <Flex className={classes.flexContainer}>
                <Text className={classes.text}>Parity</Text>
                <NativeSelect
                  className={classes.textInput}
                  size='xs'
                  data={getParity}
                  key={form.key('parity')}
                  {...form.getInputProps('parity')}
                />
              </Flex>

              <Flex className={classes.flexContainer}>
                <Text className={classes.text}>Data Bits</Text>
                <NativeSelect
                  className={classes.textInput}
                  size='xs'
                  data={getDataBits}
                  key={form.key('data_bits')}
                  {...form.getInputProps('data_bits')}
                />
              </Flex>

              <Flex className={classes.flexContainer}>
                <Text className={classes.text}>Stop Bits</Text>
                <NativeSelect
                  className={classes.textInput}
                  size='xs'
                  data={getStopBits}
                  key={form.key('stop_bits')}
                  {...form.getInputProps('stop_bits')}
                />
              </Flex>

              <Flex className={classes.flexContainer}>
                <Text className={classes.text}>Flow Control</Text>
                <NativeSelect
                  className={classes.textInput}
                  size='xs'
                  data={getFlowControl}
                  key={form.key('flow_control')}
                  {...form.getInputProps('flow_control')}
                />
              </Flex>

              <Flex className={classes.flexContainer}>
                <Text className={classes.text}>Data Sampling</Text>
                <NativeSelect
                  className={classes.textInput}
                  size='xs'
                  data={getDataSampling}
                  key={form.key('sampling')}
                  {...form.getInputProps('sampling')}
                />
              </Flex>

            </Flex>
          </Flex>
          





          <Flex mt='xs' justify='flex-end'>
            { isPending 
                ? <LoaderButton1 />
                : <SaveButton1 isDisabled={errorState} />
            }
          </Flex>
        </Flex>

      </form>

    </>
  );
}

export default InsertSerialForm;