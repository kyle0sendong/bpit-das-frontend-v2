import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, TextInput, Box, NativeSelect, Flex, Popover, Group, Loader } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Navigate } from "react-router-dom";

import { TcpAnalyzerType } from "@/types/tcpAnalyzers";

import { useUpdateTcpAnalyzer, useDeleteTcpAnalyzer } from "@/hooks/tcpAnalyzersHook";
import { IconCheck, IconTrash } from "@tabler/icons-react";

import { getDataSampling } from "@/utils/analyzers"

const ModalForm = ({analyzerData}: {analyzerData: TcpAnalyzerType}) => {

  const [opened, { open, close }] = useDisclosure(false);
  const { mutate: updateTcpAnalyzer, isPending: isPendingUpdate } = useUpdateTcpAnalyzer(analyzerData.id);
  const { mutate: deleteTcpAnalyzer, isPending: isPendingDelete, isSuccess } = useDeleteTcpAnalyzer(analyzerData.id);
  
  const form = useForm<Partial<TcpAnalyzerType>>({
    mode:"uncontrolled",
    initialValues: {
      id: analyzerData.id
    }
  });

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
        <form onSubmit={ form.onSubmit( (value) =>  {
          form.setFieldValue('id', analyzerData.id);
          updateTcpAnalyzer(value)
        })}>
          <Box mb="1rem">
            <TextInput
              size="xs"
              label="Name"
              placeholder={analyzerData.name}
              key={form.key('name')}
              {...form.getInputProps('name')}
            />

            <TextInput
              size="xs"
              label="IP Address"
              placeholder={analyzerData.host_address}
              key={form.key('host_address')}
              {...form.getInputProps('host_address')}
            />

            <TextInput
              size="xs"
              label="Port"
              placeholder={analyzerData.port.toString()}
              key={form.key('port')}
              {...form.getInputProps('port')}
            />

            <TextInput
              size="xs"
              label="Device Address"
              placeholder={analyzerData.device_address.toString()}
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
                        
                        deleteTcpAnalyzer(analyzerData.id)
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