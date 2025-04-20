import { useEffect, useState } from "react";
import { NumberInput, Flex } from "@mantine/core";
import { SaveButton1, LoaderButton1 } from "@/components/ui/button";
import { showNotification } from "@mantine/notifications";
import { useInsertTcpParameter } from "@/hooks/tcpParametersHook";
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

  const [errorState, setErrorState] = useState(false);
  const { mutate: insertParameter, isPending, isError } = useInsertTcpParameter(parseInt(id));

  useEffect(() => {
    if (isError) {
      setErrorState(true);
      const timer = setTimeout(() => {
        setErrorState(false)
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isError, isPending]);

  const handleSubmit = (value: InsertParameterType) => {
    form.setFieldValue("id", parseInt(id));
    insertParameter(value, {
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
          message: "Parameters have been inserted successfully!",
          color: "green",
          autoClose: 3000,
        });
      },
    });
    form.reset();
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Flex direction="column" align="center" p="xs" gap="md">
        <NumberInput   
          size="xs"
          label="Insert Parameters"
          description="Number of parameters to be inserted"
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

export default AddParameterCard;