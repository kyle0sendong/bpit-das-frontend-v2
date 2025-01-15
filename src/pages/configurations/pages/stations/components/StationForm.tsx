import { Button, TextInput, Flex, Paper, Loader } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useGetAllStations, useUpdateStations } from "@/hooks/stationsHook";
import { StationsType } from "@/types/stations";

const StationForm = () => {

  const stations = useGetAllStations();
  const { mutate: updateStation } = useUpdateStations();

  const form = useForm<any>({
    mode:"uncontrolled"
  });

  if(stations.isLoading) {
    return (
      <Loader size={32} />
    )
  }

  if(stations.isFetched) {
    const stationsData: StationsType = stations.data[0];

    return (
      <>
        <form onSubmit={ form.onSubmit( (value) =>  {
          form.setFieldValue("id", stationsData.id)
          updateStation(value)
        })}>

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
              <Button type="submit" color="dark.3">
                Save Station
              </Button>
            </Flex>
          </Paper>
        </form>
      </>
    );
  }

}

export default StationForm;