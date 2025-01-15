import { Button, TextInput, Flex, Checkbox, Grid, Text, Paper } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useGetAllStations } from "@/hooks/stationsHook";
import { useGetAllTimebases } from "@/hooks/timebasesHook";

const StationForm = () => {


  const stations = useGetAllStations();
  const timebases = useGetAllTimebases();

  if(stations.isFetched) {
    console.log(stations.data)
  }

  if(timebases.isFetched) {
    console.log(timebases.data)
  }
  const form = useForm<any>({
    mode:"uncontrolled",
    initialValues: {
      timebase_5: true,
      timebase_15: true,
      timebase_30: true,
      timebase_60: true,
      timebase_240: true
    }
  });

  return (
    <>
      <form onSubmit={ form.onSubmit( (value) =>  {
        console.log(value)
      })}>
        <Text size="1.3rem" fw="bold">Edit Station</Text>
        <Flex mb="1rem" direction="column">
          
            <TextInput
              size="xs"
              label="Station Name"
              key={form.key('name')}
              {...form.getInputProps('name')}
            />

            <TextInput
              size="xs"
              label="Location"
              key={form.key('location')}
              {...form.getInputProps('location')}
            />


          <Paper shadow="md" m="xs">
            <Text m="xs">Timebases</Text>
            <Grid px="lg">
              <Grid.Col span={4}> 
                <Checkbox disabled checked label="1 Minute" value={1}/> 
              </Grid.Col>
              <Grid.Col span={4}> 
                <Checkbox label="5 Minutes"
                  key={form.key('timebase_5')}
                  {...form.getInputProps('timebase_5', { type: 'checkbox' })}
                /> 
              </Grid.Col>
              <Grid.Col span={4}> 
                <Checkbox label="15 Minutes"
                  key={form.key('timebase_15')}
                  {...form.getInputProps('timebase_15', { type: 'checkbox' })}
                />
              </Grid.Col>
              <Grid.Col span={4}> 
                <Checkbox label="30 Minutes"
                  key={form.key('timebase_30')}
                  {...form.getInputProps('timebase_30', { type: 'checkbox' })}
                /> 
              </Grid.Col>
              <Grid.Col span={4}>
                <Checkbox label="1 Hour"
                  key={form.key('timebase_60')}
                  {...form.getInputProps('timebase_60', { type: 'checkbox' })}
                />
              </Grid.Col>
              <Grid.Col span={4}> 
                <Checkbox label="4 Hours"
                key={form.key('timebase_240')}
                {...form.getInputProps('timebase_240', { type: 'checkbox' })}/> 
              </Grid.Col>
              <Grid.Col span={4}> </Grid.Col>
            </Grid>
          </Paper>
        </Flex>

        <Flex justify="space-between">
          <Button type="submit" color="dark.3">
            Save
          </Button>
        </Flex>

      </form>

    </>
  );
}

export default StationForm;