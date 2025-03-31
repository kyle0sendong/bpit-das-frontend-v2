import { useState, useEffect } from "react";

import { showNotification } from "@mantine/notifications";
import { Button, TextInput, Flex, Paper, Loader } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useGetAllStations, useUpdateStations } from "@/hooks/stationsHook";
import { StationsType } from "@/types/stations";

const StationForm = () => {

  const stations = useGetAllStations();
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


  if(stations.isLoading) {
    return (
      <Loader size={32} />
    )
  }

  if(stations.isFetched) {
    const stationsData: StationsType = stations.data[0];
    form.setFieldValue("id", stationsData.id);
    return (
      <>
        <form onSubmit={ form.onSubmit(handleSubmit)}>

          <Paper m="xs" p="xs">
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
                <Button color="dark.3" disabled>
                  <Loader size="xs" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  color="dark.3"
                  disabled={errorState}
                >
                  Save
                </Button>
              )}
            </Flex>
          </Paper>
        </form>
      </>
    );
  }

}

export default StationForm;