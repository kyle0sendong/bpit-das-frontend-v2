import { Button, NumberInput, Flex } from "@mantine/core";
import { useInsertTcpParameter } from "@/hooks/tcpParametersHook";
import { useForm } from "@mantine/form";
import { InsertTcpParameterType } from "@/types/tcpParameters";


const AddParameterCard = ({id}: {id: string}) => {

  const form = useForm<InsertTcpParameterType>({
    mode:"uncontrolled",
    initialValues: {
      number: 1,
      id: parseInt(id),
      name: "Default"
    }
  });
  
  const { mutate: insertParameter } = useInsertTcpParameter(parseInt(id));

  return (
    <form onSubmit={
      form.onSubmit( (value) => {

        form.reset();
        console.log(value);
        insertParameter(value);
      })
    }>
      <Flex align="center" p="xs" gap="md">
          <NumberInput   
            size="xs"
            label="Insert Parameters"
            description="Number of parameters to be inserted"
            key={form.key('number')}
            {...form.getInputProps('number')}
          />
          <Button variant="outline" type="submit"> Save</Button>
      </Flex>
    </form>

  )
}

export default AddParameterCard;