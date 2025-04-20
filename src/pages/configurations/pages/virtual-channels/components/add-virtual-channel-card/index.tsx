import { useEffect, useState } from "react";
import { NumberInput, Flex } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useInsertVirtualChannel } from "@/hooks/virtualChannelsHook";
import { SaveButton1, LoaderButton1 } from "@/components/ui/button";

import { InsertVirtualChannelType } from "@/types/virtualChannels";

const AddVirtualChannelCard = () => {

  const form = useForm<InsertVirtualChannelType>({
    mode:"uncontrolled",
    initialValues: {
      number: 1
    }
  });
  
  const [errorState, setErrorState] = useState(false);
  const { mutate: insertVirtualChannel, isPending, isError } = useInsertVirtualChannel();

  useEffect(() => {
    if (isError) {
      setErrorState(true);
      const timer = setTimeout(() => {
        setErrorState(false)
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isError, isPending]);

  const handleSubmit = (value: InsertVirtualChannelType) => {
    insertVirtualChannel(value, {
      onError: () => {
        showNotification({
          title: "Insert Failed",
          message: "An error occurred while inserting the parameter.",
          color: "red",
          autoClose: 3000,
        });
      },
      onSuccess: () => {
        showNotification({
          title: "Insert Successful",
          message: "Virtual have been inserted successfully!",
          color: "green",
          autoClose: 3000,
        });
      },
    });
    form.reset()
  };

  return (
    <form onSubmit={
      form.onSubmit((value) => handleSubmit(value))
    }>
      <Flex align="center" p="xs" gap="md" direction='column'>
        <NumberInput   
          size="xs"
          max={10}
          min={1}
          label="Insert Virtual Channel"
          description="Number of Virtual Channels to be inserted"
          key={form.key('number')}
          {...form.getInputProps('number')}
        />
        {
          isPending ? (
            <LoaderButton1 />
          ) : (
            <SaveButton1 
              isDisabled={errorState}
            />
          )
        }
      </Flex>
    </form>

  )
}

export default AddVirtualChannelCard;