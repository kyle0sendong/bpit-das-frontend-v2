
import classes from "./SidebarMenu.module.css";
import { Button, Divider, Flex } from "@mantine/core";
import { useForm } from "@mantine/form";
import { DateValue } from "@mantine/dates";
import DatePicker from "./components/DatePicker";
import TimebasePicker from "./components/TimebasePicker";
import AnalyzerPicker from "./components/AnalyzerPicker";
import VirtualChannelPicker from "./components/VirtualChannelPicker";

export type FormSubmitType = {
  timebase: string;
  analyzer: string;
  virtualChannel: string;
  from: DateValue,
  to: DateValue
}

const SidebarMenu = () => {

  
  const form = useForm<any>({
      mode:"uncontrolled",
      initialValues: {
        timebase: '1',
        from: new Date()
      },
      validate: (values) => ({
        analyzer: (values.analyzer === undefined && values.virtualChannel === undefined) && 'Please select an analyzer.',
        virtualChannel: (values.analyzer === undefined  && values.virtualChannel === undefined) && 'Please select an analyzer.'
      })
  })
  
  const labelStyle = {label:{fontSize:"0.9rem", color:"black"}}
  const formOnSubmit = (values: FormSubmitType) => {
    console.log(values)
  }

  return (
    <>
      <nav className={classes.navbar}>
        <form onSubmit={ form.onSubmit(formOnSubmit)
          }>
          <Divider label="Views" labelPosition="center" styles={labelStyle}/>
          <Flex direction="column" gap="xs" mx="xs" mb="sm">
            <Button variant="default" type="submit">
              Table View
            </Button>
            <Button variant="default" type="submit">
              Graph View
            </Button>
          </Flex>

          <Divider label="Select Date" labelPosition="center" styles={labelStyle}/>
          <Flex direction="column" mx="xs" mb="sm">
            <DatePicker form={form}/>
          </Flex>

          <Divider label="Timebase" labelPosition="center" styles={labelStyle}/>
          <Flex direction="column" mx="xs" mb="sm">
            <TimebasePicker form={form}/>
          </Flex>

          <Divider label="Analyzers" labelPosition="center" styles={labelStyle}/>
          <Flex direction="column" mx="xs" mb="sm">
            <AnalyzerPicker form={form} />
          </Flex>
          

          <Divider label="Virtual Channels" labelPosition="center" styles={labelStyle}/>
          <Flex direction="column" mx="xs" mb="sm">
            <VirtualChannelPicker form={form}/>
          </Flex>
        </form>

      </nav>
    </>
  )
}

export default SidebarMenu