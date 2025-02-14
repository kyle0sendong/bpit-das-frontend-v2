import { Button, NumberInput, Flex, Loader } from "@mantine/core";
import { useInsertTcpParameter } from "@/hooks/tcpParametersHook";
import { useForm } from "@mantine/form";
import { InsertTcpParameterType } from "@/types/tcpParameters";

const AddParameterCard = ({id}: {id: string}) => {

  const form = useForm<InsertTcpParameterType>({
    mode:"uncontrolled",
    initialValues: {
      number: 1,
      id: parseInt(id)
    }
  });
  
  const { mutate: insertParameter, isPending } = useInsertTcpParameter(parseInt(id));

  return (
    <form onSubmit={
      form.onSubmit( (value) => {
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
        {
          isPending ?  
            <Button variant="outline" disabled> 
              <Loader size="sm" />
            </Button>
          : 
            <Button variant="outline" type="submit" onClick={() => form.setFieldValue("id", parseInt(id))}>
              Save
            </Button>
        }
        
      </Flex>
    </form>

  )
}

export default AddParameterCard;