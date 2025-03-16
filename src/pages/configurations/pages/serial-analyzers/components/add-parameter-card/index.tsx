import { Button, NumberInput, Flex, Loader } from "@mantine/core";
import { useInsertSerialParameter } from "@/hooks/serialParametersHook";
import { useForm } from "@mantine/form";
import { InsertParameterType } from "@/types/parameters";

const AddParameterCard = ({id}: {id: string}) => {

  const form = useForm<InsertParameterType>({
    mode:"uncontrolled",
    initialValues: {
      number: 1,
      id: parseInt(id)
    }
  });
  
  const { mutate: insertParameter, isPending } = useInsertSerialParameter(parseInt(id));

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