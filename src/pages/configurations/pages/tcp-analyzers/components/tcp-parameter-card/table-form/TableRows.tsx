import { Table, Group, TextInput, Switch, rem, NativeSelect, Button, Popover, NumberInput } from "@mantine/core"
import { IconCheck, IconX, IconTrash } from "@tabler/icons-react";

import { useDeleteParameter } from "@/hooks/tcpParametersHook";
import { TcpParametersType } from "@/types/tcpParameters";

import { UseFormReturnType } from "@mantine/form";

const requestIntervalsMenu = [
  { label: "5 seconds", value: "5" },
  { label: "10 seconds", value: "10" },
  { label: "30 seconds", value: "30" },
  { label: "1 minute", value: "60" },
]

const dataFormatMenu = [
  { label: "16-bit", value: "16-bit" },
  { label: "32-bit", value: "32-bit Signed Big-Endian" },
  { label: "32-bit Inverse", value: "32-bit Signed Big-Endian byte swap" },
  { label: "64-bit", value: "64-bit Signed Big-Endian" },
  { label: "64-bit Inverse", value: "64-bit Signed Big-Endian byte swap" },
  { label: "Float", value: "32-bit Float Big-Endian" },
  { label: "Float Inverse", value: "32-bit Float Big-Endian byte swap" },
  { label: "Double", value: "64-bit Double Big-Endian" },
  { label: "Double Inverse", value: "64-bit Double Big-Endian byte swap" },
]

const functionCodesMenu = [
  { label: "0x01 Read Coils", value: "0x01 Read Coils" },
  { label: "0x02 Read Discrete Inputs", value: "0x02 Read Discrete Inputs" },
  { label: "0x03 Read Holding Register", value: "0x03 Read Holding Register" },
  { label: "0x04 Read Input Register", value: "0x04 Read Input Register" },
]

const checkIcon = (
  <IconCheck
    style={{ width: rem(16), height: rem(16) }}
    stroke={2.5}
    color="lime"
  />
);

const xIcon = (
  <IconX
    style={{ width: rem(16), height: rem(16) }}
    stroke={2.5}
    color="red"
  />
);

type TableRowsProps = {
  parametersData: TcpParametersType[];
  form: UseFormReturnType<TcpParametersType>;
}

const TableRows = ({parametersData, form}: TableRowsProps) => {
  const {mutate: deleteParameter} = useDeleteParameter(parametersData[0]?.tcp_analyzer_id);

  return parametersData.map( (parameter) => {
    return (
      <Table.Tr key={`${parameter.name}${parameter.id}`}  style={{fontSize:"0.7rem"}}>

        {/* Enable Switch */}
        <Table.Td>
          <Group justify="center">
            <Switch
              defaultChecked={parameter.enable}
              onLabel={checkIcon}
              offLabel={xIcon}
              color="dark.4"
              key={form.key(`${parameter.id}-enable`)}
              {...form.getInputProps(`${parameter.id}-enable`)}
            />
          </Group>
        </Table.Td>

        {/* Name Input */}
        <Table.Td>
          <TextInput
            placeholder={parameter.name}
            radius="md"
            size="xs"
            key={form.key(`${parameter.id}-name`)}
            {...form.getInputProps(`${parameter.id}-name`)}
          />
        </Table.Td>

        {/* Unit Input */}
        <Table.Td>
          <TextInput
            placeholder={parameter.unit ?? ''}
            radius="md"
            size="xs"
            key={form.key(`${parameter.id}-unit`)}
            {...form.getInputProps(`${parameter.id}-unit`)}
          />
        </Table.Td>
      
        {/* Request Inteval Selection */}
        <Table.Td>
          <NativeSelect
            size="xs"
            data={requestIntervalsMenu}
            key={form.key(`${parameter.id}-request_interval`)}
            {...form.getInputProps(`${parameter.id}-request_interval`)}
          />
        </Table.Td>

        {/* Data Format Selection */}
        <Table.Td>
          <NativeSelect
            size="xs"
            data={dataFormatMenu}
            key={form.key(`${parameter.id}-format`)}
            {...form.getInputProps(`${parameter.id}-format`)}
          />
        </Table.Td>

        {/* Function Codes Selection */}
        <Table.Td>
          <NativeSelect
            size="xs"
            data={functionCodesMenu}
            key={form.key(`${parameter.id}-function_code`)}
            {...form.getInputProps(`${parameter.id}-function_code`)}
          />
        </Table.Td>

        {/* Start Address Input */}
        <Table.Td>
          <NumberInput
            placeholder={parameter.start_register_address.toString()}
            radius="md"
            size="xs"
            key={form.key(`${parameter.id}-start_register_address`)}
            {...form.getInputProps(`${parameter.id}-start_register_address`)}
          />
        </Table.Td>

        {/* Register Count Input */}
        <Table.Td>
          <NumberInput
            placeholder={parameter.register_count.toString()}
            radius="md"
            size="xs"
            key={form.key(`${parameter.id}-register_count`)}
            {...form.getInputProps(`${parameter.id}-register_count`)}
          />
        </Table.Td>

        {/* Formula Input */}
        <Table.Td>
          <TextInput
            placeholder={parameter.formula}
            radius="md"
            size="xs"
            key={form.key(`${parameter.id}-formula`)}
            {...form.getInputProps(`${parameter.id}-formula`)}
          />
        </Table.Td>
        
        {/* Delete Button */}
        <Table.Td>
          <Popover position="bottom" withArrow shadow="md">
            <Popover.Target>
              <Button 
                size="compact-sm"
                fz="0.6rem"
                rightSection={<IconTrash size="1rem" />} 
                variant="filled"
                color="red"  
              >
                  Delete
              </Button>
            </Popover.Target>
            <Popover.Dropdown>
              <Group>
                <Button 
                  justify="center"
                  size="compact-sm"
                  fz="0.6rem"
                  rightSection={<IconCheck size="1rem" />} 
                  variant="default"
                  onClick={ () => {
                    deleteParameter(parameter.id)
                  }}
                >
                  Yes
                </Button>
              </Group>

            </Popover.Dropdown>
          </Popover>
        </Table.Td>
      </Table.Tr>
    )
  })
}

export default TableRows;