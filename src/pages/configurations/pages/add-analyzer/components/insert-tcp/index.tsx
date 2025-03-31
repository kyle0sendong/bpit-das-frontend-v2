import { useState, useEffect } from "react";

import { Button, TextInput, NativeSelect, Flex, Title, Text, Loader, NumberInput } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useForm } from "@mantine/form";

import { TcpAnalyzerType } from "@/types/tcpAnalyzers";

import { useInsertTcpAnalyzer } from "@/hooks/tcpAnalyzersHook";

import { getDataSampling } from "@/utils/analyzers"
import classes from "../../InsertForm.module.css";

const InsertTcpForm = () => {

  const { mutate: insertTcpAnalyzer, isPending, isError } = useInsertTcpAnalyzer();
  const [errorState, setErrorState] = useState(false);

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
    insertTcpAnalyzer(values, {
      onError: () => {
        showNotification({
          title: "Insert Failed",
          message: "An error occurred while inserting a TCP Analyzer.",
          color: "red",
          autoClose: 5000, // Notification disappears after 5s
        });
      },
      onSuccess: () => {
        showNotification({
          title: "Insert Successful",
          message: "Inserting TCP Analyzer successful!",
          color: "green",
          autoClose: 3000,
        });
      },
    });
  };

  const form = useForm<Partial<TcpAnalyzerType>>({
    mode:"uncontrolled",
    initialValues:{
      port: 502,
      device_address: 1,
      sampling: 80
    },
    validate: (values) => ({
      name: values.name === undefined || values.name === '' ? "Please enter a name." : null,
      host_address: values.host_address === undefined || values.host_address === '' ? "Please enter an IP Address." : null
    })
  });


  return (
    <>
      <form onSubmit={form.onSubmit(handleSubmit)}>

        <Title size="xl" ta="center" mb="md" >
          Add Modbus Tcp Analyzer
        </Title>

        <Flex direction="column" gap="lg">

          <Flex className={classes.flexContainer}>
            <Text className={classes.text}> Analyzer Name </Text>
            <TextInput
              className={classes.textInput}
              size="xs"
              placeholder="e.g. WISE RHTEMP"
              key={form.key('name')}
              {...form.getInputProps('name')}
            />
          </Flex>

          <Flex className={classes.flexContainer}>
            <Text className={classes.text}>IP Address</Text>
            <TextInput
              className={classes.textInput}
              size="xs"
              placeholder="e.g. 192.168.1.1"
              key={form.key('host_address')}
              {...form.getInputProps('host_address')}
            />
          </Flex>

          <Flex className={classes.flexContainer}>
            <Text className={classes.text}>Port Number</Text>
            <NumberInput
              min={1}
              max={99999}
              className={classes.textInput}
              size="xs"
              key={form.key('port')}
              {...form.getInputProps('port')}
            />
          </Flex>

          <Flex className={classes.flexContainer}>
            <Text className={classes.text}>Device Address</Text>
            <TextInput
              className={classes.textInput}
              size="xs"
              key={form.key('device_address')}
              {...form.getInputProps('device_address')}
            />
          </Flex>

          <Flex className={classes.flexContainer}>
            <Text className={classes.text}>Data Sampling</Text>
            <NativeSelect
              className={classes.textInput}
              size="xs"
              data={getDataSampling}
              key={form.key(`sampling`)}
              {...form.getInputProps(`sampling`)}
            />
          </Flex>


          <Flex mt="xs" justify="flex-end">
            {isPending ? (
              <Button color="dark.3" disabled>
                <Loader size="xs" />
              </Button>
            ) : (
              <Button 
                type="submit"
                color="dark.3"
                disabled={errorState}
              >
                Save
              </Button>
            )}
          </Flex>
        </Flex>

      </form>

    </>
  );
}

export default InsertTcpForm;