import { Button, NumberInput, Flex } from "@mantine/core";
import { useForm } from "@mantine/form";

import { useInsertVirtualChannel } from "@/hooks/virtualChannelsHook";

import { InsertVirtualChannelType } from "@/types/virtualChannels";

const AddVirtualChannelCard = () => {

  const form = useForm<InsertVirtualChannelType>({
    mode:"uncontrolled",
    initialValues: {
      number: 1
    }
  });
  
  const { mutate: insertVirtualChannel } = useInsertVirtualChannel();

  return (
    <form onSubmit={
      form.onSubmit( (value) => {
        form.reset();
        insertVirtualChannel(value);
      })
    }>
      <Flex align="center" p="xs" gap="md">
        <NumberInput   
          size="xs"
          label="Insert Virtual Channel"
          description="Number of Virtual Channels to be inserted"
          key={form.key('number')}
          {...form.getInputProps('number')}
        />
        <Button variant="outline" type="submit">Insert</Button>
      </Flex>
    </form>

  )
}

export default AddVirtualChannelCard;