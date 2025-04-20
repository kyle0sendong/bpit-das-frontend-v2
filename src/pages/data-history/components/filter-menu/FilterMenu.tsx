
import classes from "./FilterMenu.module.css";
import { useSearchParams } from "react-router-dom";

import { Button, Flex } from "@mantine/core";
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
      from: values.from === undefined ? <p style={{color:'red', textAlign:'center'}}>Please select a date.</p> : null,
      analyzer: validateInputs(values) ? <p style={{color:'red', textAlign:'center'}}>Please select an analyzer.</p> : null,
      virtualChannel: validateInputs(values) ? <p style={{color:'red', textAlign:'center'}}>Please select an analyzer.</p> : null,
    })
  })

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

        <Flex direction="column" className={classes.input_container}>

          <Flex direction="column" mx="xs" mb="xs">
            <p>View Type</p>

            <Flex direction="row" gap="xs" justify="center" className={classes.button_container}>
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
          </Flex>

          <Flex direction="column" mx="xs" mb="xs">
            <p>Date</p>
            <DatePicker form={form} />
          </Flex>

          <Flex direction="column" mx="xs" mb="xs">
            <p>Timebase</p>
            <TimebasePicker form={form}/>
          </Flex>

          <Flex direction="column" mx="xs" mb="xs">
            <p>Modbus TCP Analyzers</p>
            <AnalyzerPicker form={form} analyzers={tcpAnalyzers} type="tcp"/>
          </Flex>

          <Flex direction="column" mx="xs" mb="xs">
            <p>Serial Analyzers</p>
            <AnalyzerPicker form={form} analyzers={serialAnalyzers} type="serial"/>
          </Flex>

          <Flex direction="column" mx="xs" mb="xs">
            <p>Virtual Channels</p>
            <VirtualChannelPicker form={form}/>
          </Flex>
        </Flex>

      </form>
    </nav>
  )
}

export default SidebarMenu