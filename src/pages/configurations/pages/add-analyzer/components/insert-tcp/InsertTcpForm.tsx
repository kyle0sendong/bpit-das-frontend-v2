import { Button, TextInput, Box, NativeSelect, Flex } from "@mantine/core";
import { useForm } from "@mantine/form";

import { TcpAnalyzerType } from "@/types/tcpAnalyzers";

import { useInsertTcpAnalyzer } from "@/hooks/tcpAnalyzersHook";

import { getDataSampling } from "../../../tcp-analyzers/utils/sampling";

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
        console.log(value)
        insertTcpAnalyzer(value)
      })}>
        <Box mb="1rem">
          <TextInput
            size="xs"
            label="Name"
            placeholder="e.g. WISE RHTEMP"
            key={form.key('name')}
            {...form.getInputProps('name')}
          />

          <TextInput
            size="xs"
            label="IP Address"
            placeholder="e.g. 192.168.1.1"
            key={form.key('host_address')}
            {...form.getInputProps('host_address')}
          />

          <TextInput
            size="xs"
            label="Port"
            key={form.key('port')}
            {...form.getInputProps('port')}
          />

          <TextInput
            size="xs"
            label="Device Address"
            key={form.key('device_address')}
            {...form.getInputProps('device_address')}
          />

          <NativeSelect
            size="xs"
            label="Data Sampling"
            data={getDataSampling}
            key={form.key(`sampling`)}
            {...form.getInputProps(`sampling`)}
          />
        </Box>

        <Flex justify="space-between">
          <Button type="submit" color="dark.3">
            Save
          </Button>
        </Flex>

      </form>

    </>
  );
}

export default InsertTcpForm;