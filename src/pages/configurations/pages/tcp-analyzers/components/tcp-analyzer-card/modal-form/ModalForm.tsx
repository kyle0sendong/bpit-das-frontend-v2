import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, TextInput, Box, NativeSelect} from "@mantine/core";
import { useForm } from "@mantine/form";

import { TcpAnalyzerType } from "@/types/tcpAnalyzers";

import { useUpdateTcpAnalyzer } from "@/hooks/tcpAnalyzersHook";


const dataSampling = [
  { label: "100%", value: "100" },
  { label: "90%", value: "90" },
  { label: "80%", value: "80" },
  { label: "70%", value: "70" },
  { label: "60%", value: "60" },
  { label: "50%", value: "50" },
]

const ModalForm = ({tcpAnalyzerData}: {tcpAnalyzerData: TcpAnalyzerType}) => {

  const [opened, { open, close }] = useDisclosure(false);
  const { mutate: updateTcpAnalyzer } = useUpdateTcpAnalyzer(tcpAnalyzerData.id);

  const form = useForm<Partial<TcpAnalyzerType>>({
    mode:"uncontrolled",
    initialValues: {
      id: tcpAnalyzerData.id
    }
  });

  return (
    <>
      <Button h="100%" p="sm" variant="default" onClick={open} style={{fontSize:"1.3rem"}}>
        {tcpAnalyzerData.name}
      </Button>

      <Modal
        opened={opened}
        onClose={close}
        title="Edit Station"
        centered
      >
        <form onSubmit={ form.onSubmit( (value) =>  {
          form.setFieldValue('id', tcpAnalyzerData.id);
          updateTcpAnalyzer(value)
        })}>
          <Box mb="1rem">
            <TextInput
              size="xs"
              label="Name"
              placeholder={tcpAnalyzerData.name}
              key={form.key('name')}
              {...form.getInputProps('name')}
            />

            <TextInput
              size="xs"
              label="IP Address"
              placeholder={tcpAnalyzerData.host_address}
              key={form.key('host_address')}
              {...form.getInputProps('host_address')}
            />

            <TextInput
              size="xs"
              label="Port"
              placeholder={tcpAnalyzerData.port.toString()}
              key={form.key('port')}
              {...form.getInputProps('port')}
            />

            <TextInput
              size="xs"
              label="Device Address"
              placeholder={tcpAnalyzerData.device_address.toString()}
              key={form.key('device_address')}
              {...form.getInputProps('device_address')}
            />

            <NativeSelect
              size="xs"
              label="Data Sampling"
              data={dataSampling}
              key={form.key(`sampling`)}
              {...form.getInputProps(`sampling`)}
            />
          </Box>

          <Button 
            type="submit"
            color="dark.3"
          >
            Save
          </Button>
        </form>
      </Modal>

    </>
  );
}

export default ModalForm;