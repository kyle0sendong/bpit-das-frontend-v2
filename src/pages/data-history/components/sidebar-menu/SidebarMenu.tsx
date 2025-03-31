
import classes from "./SidebarMenu.module.css";
import { useSearchParams } from "react-router-dom";

import { Button, Divider, Flex } from "@mantine/core";
import { useForm } from "@mantine/form";

import DatePicker from "./components/DatePicker";
import TimebasePicker from "./components/TimebasePicker";
import AnalyzerPicker from "./components/AnalyzerPicker";
import VirtualChannelPicker from "./components/VirtualChannelPicker";


import { useGetAllTcpAnalyzers } from "@/hooks/tcpAnalyzersHook";
import { useGetAllSerialAnalyzers } from "@/hooks/serialAnalyzersHook";

import { getCurrentDate } from "@/utils/dates";

export type FormSubmitType = {
  timebase?: string | undefined;
  analyzer?: string | undefined;
  virtualChannel?: string | undefined;
  from?: string | undefined,
  to?: string | undefined
}


const SidebarMenu = () => {

  const [searchParams, setSearchParams] = useSearchParams();

  const queryFrom = searchParams.get("from");
  const queryTo = searchParams.get("to");
  const queryTimebase = searchParams.get("timebase");

  const tcpAnalyzers = useGetAllTcpAnalyzers(true);
  const serialAnalyzers = useGetAllSerialAnalyzers(true);

  const validateInputs = (values: Partial<FormSubmitType>) => {
    return (values.analyzer === undefined && values.virtualChannel === undefined);
  }

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      timebase: queryTimebase || '1',
      from: queryFrom || getCurrentDate(),
      to: queryTo || undefined
    },

    validate: (values) => ({
      from: values.from === undefined ? "Please select a date." : null,
      analyzer: validateInputs(values) ? "Please select an analyzer." : null,
      virtualChannel: validateInputs(values) ? "Please select an analyzer." : null,
    })
  })

  const labelStyle = {label:{fontSize:"0.9rem", color:"black"}}

  const formOnSubmit = (values: FormSubmitType, view: 'table' | 'graph') => {
    form.setFieldValue("analyzer", "");
    form.setFieldValue("virtualChannel", "");
  
    const [type, id] = values.analyzer ? values.analyzer.split("-") : [undefined, undefined];
  
    setSearchParams({
      ...(values.timebase && {timebase: values.timebase}),
      ...(values.from && {from: values.from}),
      ...(values.to && {to: values.to}),
      ...(values.analyzer && {analyzerId: id, analyzerType: type}),
      ...(values.virtualChannel && {virtualChannel: values.virtualChannel}),
      view // Add the view parameter
    })
  }
  
  return (
    <nav className={classes.navbar}>
      <form onSubmit={form.onSubmit((values) => formOnSubmit(values, 'table'))}>
        <Divider label="Views" labelPosition="center" styles={labelStyle}/>
        <Flex direction="row" gap="xs" mb="sm" justify="center">
          <Button 
            color="black" 
            variant="outline" 
            type="submit"
            onClick={(event) => {
              event.preventDefault(); // Prevent default form submission
              form.onSubmit((values) => formOnSubmit(values, 'table'))();
            }}
          >
            Table View
          </Button>
          <Button 
            color="black" 
            variant="outline" 
            type="submit"
            onClick={(event) => {
              event.preventDefault(); // Prevent default form submission
              form.onSubmit((values) => formOnSubmit(values, 'graph'))();
            }}
          >
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

        <Divider label="Modbus TCP Analyzers" labelPosition="center" styles={labelStyle}/>
        <Flex direction="column" mx="xs" mb="sm">
          <AnalyzerPicker form={form} analyzers={tcpAnalyzers} type="tcp"/>
        </Flex>

        <Divider label="Serial Analyzers" labelPosition="center" styles={labelStyle}/>
        <Flex direction="column" mx="xs" mb="sm">
          <AnalyzerPicker form={form} analyzers={serialAnalyzers} type="serial"/>
        </Flex>

        <Divider label="Virtual Channels" labelPosition="center" styles={labelStyle}/>
        <Flex direction="column" mx="xs" mb="sm">
          <VirtualChannelPicker form={form}/>
        </Flex>
      </form>
    </nav>
  )
}

export default SidebarMenu