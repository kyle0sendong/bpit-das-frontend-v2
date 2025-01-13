import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, TextInput, Box, NativeSelect, Flex, Popover, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";

import { TcpAnalyzerType } from "@/types/tcpAnalyzers";

import { useUpdateTcpAnalyzer, useDeleteTcpAnalyzer } from "@/hooks/tcpAnalyzersHook";
import { IconCheck, IconTrash } from "@tabler/icons-react";

import { getDataSampling } from "../../../utils/sampling";

const ModalForm = ({tcpAnalyzerData}: {tcpAnalyzerData: TcpAnalyzerType}) => {

  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();
  const { mutate: updateTcpAnalyzer } = useUpdateTcpAnalyzer(tcpAnalyzerData.id);
  const { mutate: deleteTcpAnalyzer } = useDeleteTcpAnalyzer(tcpAnalyzerData.id);
  
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
        title={`Edit ${tcpAnalyzerData.name}`}
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
              data={getDataSampling}
              key={form.key(`sampling`)}
              {...form.getInputProps(`sampling`)}
            />
          </Box>

          <Flex justify="space-between">
            <Button type="submit" color="dark.3">
              Save
            </Button>

            <Popover position="bottom" withArrow shadow="md">
              <Popover.Target>
                <Button 
                  fz="0.6rem"
                  rightSection={<IconTrash size="1rem" />} 
                  variant="filled"
                  color="red"  
                >
                    Delete
                </Button>
              </Popover.Target>
              <Popover.Dropdown>
                <Group>
                  <Button 
                    justify="center"
                    fz="0.6rem"
                    rightSection={<IconCheck size="1rem" />} 
                    variant="default"
                    onClick={ () => {
                      navigate('/configurations')
                      deleteTcpAnalyzer(tcpAnalyzerData.id)
                    }}
                  >
                    Yes
                  </Button>
                </Group>

              </Popover.Dropdown>
            </Popover>
          </Flex>

        </form>
      </Modal>

    </>
  );
}

export default ModalForm;