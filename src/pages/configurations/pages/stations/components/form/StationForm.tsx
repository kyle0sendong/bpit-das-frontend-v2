import { useState, useEffect } from "react";

import { showNotification } from "@mantine/notifications";
import { TextInput, Flex, Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useUpdateStations } from "@/hooks/stationsHook";
import { StationsType } from "@/types/stations";
import { SaveButton1, LoaderButton1 } from "@/components/ui/button";

const StationForm = ({stationsData}: {stationsData: StationsType }) => {

  const { mutate: updateStation, isPending, isError } = useUpdateStations();
  const [errorState, setErrorState] = useState(false);

  const form = useForm<any>({
    mode:"uncontrolled"
  });
  
  useEffect(() => {
    if (isError) {
      setErrorState(true);
      const timer = setTimeout(() => {
        setErrorState(false)
        form.reset()
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isError]);

  const handleSubmit = (values: any) => {
    form.reset();
    updateStation(values, {
      onError: () => {
        showNotification({
          title: "Update Failed",
          message: "An error occurred while updating the Station.",
          color: "red",
          autoClose: 5000, // Notification disappears after 5s
        });
      },
      onSuccess: () => {
        showNotification({
          title: "Update Successful",
          message: "Station have been updated successfully!",
          color: "green",
          autoClose: 3000,
        });
      },
    });
  };


  if(stationsData) {
    form.setFieldValue("id", stationsData.id);
    return (

        <form onSubmit={ form.onSubmit(handleSubmit)}>
          <Box>
            <TextInput
              size="xs"
              placeholder={stationsData.name}
              label="Station Name"
              key={form.key('name')}
              {...form.getInputProps('name')}
            />

            <TextInput
              size="xs"
              placeholder={stationsData.location}
              label="Location"
              key={form.key('location')}
              {...form.getInputProps('location')}
            />
            
            <Flex justify="flex-end" pt="xs">
              {isPending ? (
                <LoaderButton1 />
              ) : (
                <SaveButton1 
                  isDisabled={errorState}
                />
              )}
            </Flex>
          </Box>
        </form>

    );
  }

}

export default StationForm;