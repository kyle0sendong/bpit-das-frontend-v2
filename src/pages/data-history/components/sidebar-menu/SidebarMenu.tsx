
import classes from "./SidebarMenu.module.css";
import { useSearchParams } from "react-router-dom";

import { Button, Divider, Flex } from "@mantine/core";
import { useForm } from "@mantine/form";

import DatePicker from "./components/DatePicker";
import TimebasePicker from "./components/TimebasePicker";
import AnalyzerPicker from "./components/AnalyzerPicker";
import VirtualChannelPicker from "./components/VirtualChannelPicker";

import { getCurrentDate } from "@/utils/dates";

export type FormSubmitType = {
  timebase: string;
  tcp_analyzer: string;
  virtualChannel: string;
  from: string,
  to: string
}

const SidebarMenu = () => {

  const [searchParams, setSearchParams] = useSearchParams();

  const from = searchParams.get("from") ?? getCurrentDate();
  const to = searchParams.get("from") ?? getCurrentDate();
  const timebase = searchParams.get("timebase") ?? '1';
  const tcp_analyzer = searchParams.get("tcp_analyzer");

  const form = useForm<any>({
    mode:"uncontrolled",
    initialValues: {
      timebase: timebase,
      from: from,
      ...( to && {to: to} ),
      ...( tcp_analyzer && {tcp_analyzer: tcp_analyzer} )
    },
    validate: (values) => ({
      from: (values.from === undefined) && 'Please select a date.',
      tcp_analyzer: (values.tcp_analyzer === undefined && values.virtualChannel === undefined) && 'Please select an analyzer.',
      virtualChannel: (values.tcp_analyzer === undefined  && values.virtualChannel === undefined) && 'Please select an analyzer.'
    })
  })
  
  const labelStyle = {label:{fontSize:"0.9rem", color:"black"}}
  const formOnSubmit = (values: FormSubmitType) => {
    console.log(values)
    setSearchParams({
      timebase: values.timebase,
      from: values.from,
      ...(values.to && {to:values.to}),
      ...(values.tcp_analyzer && {tcp_analyzer: values.tcp_analyzer})
    })
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

          <Divider label="TCP Analyzers" labelPosition="center" styles={labelStyle}/>
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