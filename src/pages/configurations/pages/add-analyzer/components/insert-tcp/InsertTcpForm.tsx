import { Button, TextInput, NativeSelect, Flex, Title, Text } from "@mantine/core";
import { useForm } from "@mantine/form";

import { TcpAnalyzerType } from "@/types/tcpAnalyzers";

import { useInsertTcpAnalyzer } from "@/hooks/tcpAnalyzersHook";

import { getDataSampling } from "../../../tcp-analyzers/utils/sampling";
import classes from "./InsertTcpForm.module.css";

const InsertTcpForm = () => {

  const { mutate: insertTcpAnalyzer } = useInsertTcpAnalyzer();

  const form = useForm<Partial<TcpAnalyzerType>>({
    mode:"uncontrolled",
    initialValues:{
      port: 502,
      device_address: 1,
      sampling: 80
    }
  });

  return (
    <>
      <form onSubmit={ form.onSubmit( (value) =>  {
        insertTcpAnalyzer(value)
      })}>

        <Title size="xl" ta="center" mb="md" >
          Add Tcp Analyzer
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
            <TextInput
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
            <Button type="submit" color="dark.3">
              Save
            </Button>
          </Flex>
        </Flex>

      </form>

    </>
  );
}

export default InsertTcpForm;