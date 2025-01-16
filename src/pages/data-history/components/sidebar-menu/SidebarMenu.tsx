import { useState } from "react";
import classes from "./SidebarMenu.module.css";
import { Button, Divider, Flex } from "@mantine/core";
import { useForm } from "@mantine/form";
import { DatePickerInput } from '@mantine/dates';

import TimebasePicker from "./components/TimebasePicker";
import AnalyzerPicker from "./components/AnalyzerPicker";
import VirtualChannelPicker from "./components/VirtualChannelPicker";

export type FormSubmitType = {
  timebase: string;
  analyzer: string;
  virtualChannel: string;
  date: Date[]
}

const SidebarMenu = () => {

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const form = useForm<any>({
      mode:"uncontrolled"
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
            <DatePickerInput
              placeholder="Pick Start Date"
              value={startDate}
              key={form.key('startDate')}
              onChange={(value) => {
                setStartDate(value)
                form.setFieldValue('startDate', value)
              }}
            />

            <DatePickerInput
              placeholder="Pick End Date"
              value={endDate}
              key={form.key('endDate')}
              onChange={(value) => {
                setEndDate(value)
                form.setFieldValue('endDate', value)
              }}
            />
          </Flex>

          <Divider label="Timebase" labelPosition="center" styles={labelStyle}/>
          <TimebasePicker form={form}/>

          <Divider label="Analyzers" labelPosition="center" styles={labelStyle}/>
          <Flex direction="column" mx="xs" mb="sm">
            <AnalyzerPicker form={form} />
          </Flex>
          

          <Divider label="Virtual Channels" labelPosition="center" styles={labelStyle}/>
          <VirtualChannelPicker form={form}/>
        </form>

      </nav>
    </>
  )
}

export default SidebarMenu