import { useState } from "react";
import classes from "./SidebarMenu.module.css";
import { Button, Divider, Text, Checkbox, Box, Flex, NativeSelect, keys } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { DatePickerInput } from '@mantine/dates';

const SidebarMenu = () => {
  const labelStyle = {label:{fontSize:"0.9rem", color:"black"}}
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);

  const form = useForm<any>({
      mode:"uncontrolled"
  })

  type FormSubmitType = {
    timebase: string;
    analyzer: string;
    virtualChannel: string;
    date: Date[]
  }
  const formOnSubmit = (value: FormSubmitType) => {
    console.log(value)
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
              type="range"
              placeholder="Pick dates range"
              value={value}
              key={form.key('date')}
              {...form.getInputProps('date')}
            />
          </Flex>

          <Divider label="Timebase" labelPosition="center" styles={labelStyle}/>
          <Flex direction="column" mx="xs" mb="sm">
            <NativeSelect
              data={['1 minute', '5 minutes']}
              key={form.key('timebase')}
              {...form.getInputProps('timebase')}
            />
          </Flex>

          <Divider label="Analyzers" labelPosition="center" styles={labelStyle}/>
          <Flex direction="column" mx="xs" mb="sm">
            <NativeSelect
              data={['1 minute', '5 minutes']}
              key={form.key('analyzer')}
              {...form.getInputProps('analyzer')}
            />
          </Flex>

          <Divider label="Virtual Channels" labelPosition="center" styles={labelStyle}/>
          <Flex direction="column" mx="xs" mb="sm">
            <NativeSelect
              data={['1 minute', '5 minutes']}
              key={form.key('virtualChannel')}
              {...form.getInputProps('virtualChannel')}
            />
          </Flex>
        </form>

      </nav>
    </>
  )
}

export default SidebarMenu