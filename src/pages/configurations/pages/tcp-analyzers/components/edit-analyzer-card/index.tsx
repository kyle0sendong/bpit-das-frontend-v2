import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

import { Button, TextInput, Box, NativeSelect, Flex, Popover, Group, Loader } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useForm } from "@mantine/form";

import { useUpdateTcpAnalyzer, useDeleteTcpAnalyzer } from "@/hooks/tcpAnalyzersHook";
import { IconCheck, IconTrash } from "@tabler/icons-react";

import { getDataSampling } from "@/utils/analyzers"

import { TcpAnalyzerType } from "@/types/tcpAnalyzers";

import classes from "./EditAnalyzer.module.css";

const ModalForm = ({analyzerData}: {analyzerData: TcpAnalyzerType}) => {

  const [errorUpdateState, setErrorUpdateState] = useState(false);
  const [errorDeleteState, setErrorDeleteState] = useState(false);
  const [popoverOpened, setPopoverOpened] = useState(false);

  const { mutate: updateTcpAnalyzer, isPending: isPendingUpdate, isError: isErrorUpdate } = useUpdateTcpAnalyzer(analyzerData.id);
  const { mutate: deleteTcpAnalyzer, isPending: isPendingDelete, isError: isErrorDelete, isSuccess } = useDeleteTcpAnalyzer(analyzerData.id);

  const form = useForm<Partial<TcpAnalyzerType>>({
    mode:"uncontrolled",
    validate: (values) => ({
      name: values.name == undefined && "Analyzer Name is required",
      host_address: values.host_address == undefined && "IP Address is required",
      port: values.port == undefined && "Port is required",
      device_address: values.device_address == undefined && "Device Address is required",
      sampling: values.sampling == undefined && "Sampling is required"
    })
  });

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
    updateTcpAnalyzer(values, {
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
    deleteTcpAnalyzer(id, {
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

  useEffect( () => {
    form.setFieldValue("id", analyzerData.id);
    form.setFieldValue("name", analyzerData.name);
    form.setFieldValue("host_address", analyzerData.host_address);
    form.setFieldValue("port", analyzerData.port);
    form.setFieldValue("device_address", analyzerData.device_address);
    form.setFieldValue("sampling", analyzerData.sampling);
  }, [analyzerData, form])

  return (
    <>
      <form 
        key={`tcp-${analyzerData.id}`}
        onSubmit={ form.onSubmit(handleUpdate)}
      >
        <Box mb="1rem" className={classes.input_container}>

          <p> Name </p>
          <TextInput
            size="xs"
            placeholder={analyzerData.name}
            key={form.key('name')}
            {...form.getInputProps('name')}
          />

          <p> IP Address </p>
          <TextInput
            size="xs"
            placeholder={analyzerData.host_address}
            key={form.key('host_address')}
            {...form.getInputProps('host_address')}
          />

          <p> Port </p>
          <TextInput
            size="xs"
            placeholder={analyzerData.port.toString()}
            key={form.key('port')}
            {...form.getInputProps('port')}
          />

          <p> Device Address </p>
          <TextInput
            size="xs"
            placeholder={analyzerData.device_address.toString()}
            key={form.key('device_address')}
            {...form.getInputProps('device_address')}
          />

          <p> Data Sampling </p>
          <NativeSelect
            size="xs"
            data={getDataSampling}
            key={form.key(`sampling`)}
            {...form.getInputProps(`sampling`)}
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
        
        
          {isPendingUpdate ? (
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
          )}

        </Flex>

      </form>
    </>
  );
}

export default ModalForm;