import { Button, Loader, Flex, Checkbox, Grid, Text, Paper } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useGetAllTimebases, useUpdateTimebases } from "@/hooks/timebasesHook";
import { TimebasesType } from "@/types/timebases";
import modifyTimebaseFormValues from "./modifyTimebaseFormValues";

const TimebaseForm = () => {

  const timebases = useGetAllTimebases();
  const { mutate: updateTimebase, isPending } = useUpdateTimebases();
  const form = useForm<any>({
    mode:"uncontrolled"
  });

  if(timebases.isLoading) {
    return (
      <>
        <Loader size={32} />
      </>
    )
  }
  if(timebases.isFetched) {
    const timebaseData: TimebasesType[] = timebases.data

    form.setFieldValue('timebase_5', timebaseData.find((data) => data.timebase == 5)?.enable)
    form.setFieldValue('timebase_10', timebaseData.find((data) => data.timebase == 10)?.enable)
    form.setFieldValue('timebase_15', timebaseData.find((data) => data.timebase == 15)?.enable)
    form.setFieldValue('timebase_30', timebaseData.find((data) => data.timebase == 30)?.enable)
    form.setFieldValue('timebase_60', timebaseData.find((data) => data.timebase == 60)?.enable)
    form.setFieldValue('timebase_240', timebaseData.find((data) => data.timebase == 240)?.enable)
    form.setFieldValue('timebase_480', timebaseData.find((data) => data.timebase == 480)?.enable)
    form.setFieldValue('timebase_720', timebaseData.find((data) => data.timebase == 720)?.enable)
    form.setFieldValue('timebase_1440', timebaseData.find((data) => data.timebase == 1440)?.enable)

    return (
      <>
        <form onSubmit={ form.onSubmit( (value) =>  {
          updateTimebase(modifyTimebaseFormValues(value))
        })}>

          <Paper shadow="md" m="xs" p="xs">
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
                <Checkbox label="10 Minutes"
                  key={form.key('timebase_10')}
                  {...form.getInputProps('timebase_10', { type: 'checkbox' })}
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
              <Grid.Col span={4}> 
                <Checkbox label="8 Hours"
                key={form.key('timebase_480')}
                {...form.getInputProps('timebase_480', { type: 'checkbox' })}/> 
              </Grid.Col>
              <Grid.Col span={4}> 
                <Checkbox label="12 Hours"
                key={form.key('timebase_720')}
                {...form.getInputProps('timebase_720', { type: 'checkbox' })}/> 
              </Grid.Col>
              <Grid.Col span={4}> 
                <Checkbox label="1 Day"
                key={form.key('timebase_1440')}
                {...form.getInputProps('timebase_1440', { type: 'checkbox' })}/> 
              </Grid.Col>
            </Grid>

            <Flex justify="flex-end" w="100%" pt="xs">
              {
                isPending ? 
                  <Button color="dark.3" disabled>
                    Save Timebase 
                    <Loader size="sm"/>
                  </Button>
                : 
                  <Button type="submit" color="dark.3">
                    Save Timebase
                  </Button>
              }
            </Flex>
          </Paper>
        </form>
      </>
    );
  }

}

export default TimebaseForm;