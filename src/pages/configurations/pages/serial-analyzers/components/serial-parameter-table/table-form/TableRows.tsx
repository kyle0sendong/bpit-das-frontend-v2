import { Table, Group, TextInput, Switch, rem, NativeSelect, Button, Popover, NumberInput, Loader } from "@mantine/core"
import { IconCheck, IconX, IconTrash } from "@tabler/icons-react";

import { useEffect, useState } from "react";

import { useDeleteSerialParameter } from "@/hooks/serialParametersHook";
import { ParameterType } from "@/types/parameters";

import { UseFormReturnType } from "@mantine/form";
import { dataFormatMenu, requestIntervalsMenu, functionCodesMenu } from "@/utils/constants"


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
  parametersData: ParameterType[];
  form: UseFormReturnType<any>;
  mode: string;
}

const TableRows = ({parametersData, form, mode}: TableRowsProps) => {
  const {mutate: deleteParameter, isPending} = useDeleteSerialParameter(parametersData[0]?.analyzer_id);

  // Use useEffect to set form values once after mounting or when parametersData changes
  useEffect(() => {
    for(const parameter of parametersData) {
      form.setFieldValue(`enable_${parameter.id}`, parameter.enable);
      form.setFieldValue(`name_${parameter.id}`, parameter.name);
      form.setFieldValue(`unit_${parameter.id}`, parameter.unit);
      form.setFieldValue(`start_register_address_${parameter.id}`, parameter.start_register_address);
      form.setFieldValue(`register_count_${parameter.id}`, parameter.register_count);
      form.setFieldValue(`formula_${parameter.id}`, parameter.formula);
      form.setFieldValue(`request_interval_${parameter.id}`, parameter.request_interval);
      form.setFieldValue(`format_${parameter.id}`, parameter.format);
      form.setFieldValue(`function_code_${parameter.id}`, parameter.function_code);
      form.setFieldValue(`ascii_command_${parameter.id}`, parameter.ascii_command);
    }
  }, [parametersData]);

  // Function to determine register count
  const handleRegisterCount = (format: string) => {
    const bit = format.split(" ")[0];
    switch (bit) {
      case "16-bit":
        return 1;
      case "32-bit":
        return 2;
      case "64-bit":
        return 4;
      default:
        return 1; // Fallback
    }
  };

  const [registerCounts, setRegisterCounts] = useState<{ [key: string]: number }>(
    () =>
      parametersData.reduce((acc, param) => {
        acc[param.id] = handleRegisterCount(param.format); // Initialize with format-based value
        return acc;
      }, {} as { [key: string]: number })
  );

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
              key={form.key(`enable_${parameter.id}`)}
              {...form.getInputProps(`enable_${parameter.id}`)}
            />
          </Group>
        </Table.Td>

        {/* Name Input */}
        <Table.Td>
          <TextInput
            placeholder={parameter.name}
            radius="md"
            size="xs"
            key={form.key(`name_${parameter.id}`)}
            {...form.getInputProps(`name_${parameter.id}`)}
          />
        </Table.Td>

        {/* Unit Input */}
        <Table.Td>
          <TextInput
            placeholder={parameter.unit ?? ''}
            radius="md"
            size="xs"
            key={form.key(`unit_${parameter.id}`)}
            {...form.getInputProps(`unit_${parameter.id}`)}
          />
        </Table.Td>
      
        {/* Request Interval Selection */}
        <Table.Td>
          <NativeSelect
            size="xs"
            data={requestIntervalsMenu}
            key={form.key(`request_interval_${parameter.id}`)}
            {...form.getInputProps(`request_interval_${parameter.id}`)}
          />
        </Table.Td>

        {/* Data Format Selection */}
        <Table.Td>
        <NativeSelect
          size="xs"
          data={dataFormatMenu}
          key={form.key(`format_${parameter.id}`)}
          defaultValue={parameter.format} // Set initial value
          {...form.getInputProps(`format_${parameter.id}`)}
          onChange={(event) => {
            const selectedFormat = event.target.value;
            console.log("Selected Format:", selectedFormat); // Debugging
            form.setFieldValue(`format_${parameter.id}`, selectedFormat);
            console.log(form.getValues())
            setRegisterCounts((prev) => ({
              ...prev,
              [parameter.id]: handleRegisterCount(selectedFormat),
            }));
          }}
        />
      </Table.Td>

        {/* Function Codes Selection */}
        <Table.Td>
          <NativeSelect
            size="xs"
            data={functionCodesMenu}
            key={form.key(`function_code_${parameter.id}`)}
            {...form.getInputProps(`function_code_${parameter.id}`)}
          />
        </Table.Td>

        {/* Start Address Input */}
        <Table.Td>
          <NumberInput
            placeholder={parameter.start_register_address.toString()}
            radius="md"
            size="xs"
            key={form.key(`start_register_address_${parameter.id}`)}
            {...form.getInputProps(`start_register_address_${parameter.id}`)}
          />
        </Table.Td>

        {/* Register Count Input */}
        <Table.Td>
          <NumberInput
            value={registerCounts[parameter.id]} // Controlled by state, not form
            radius="md"
            size="xs"
            disabled // Prevent user changes
            key={form.key(`register_count_${parameter.id}`)}
            {...form.getInputProps(`register_count_${parameter.id}`)}
          />
        </Table.Td>

        {/* ASCII Command Input */}
        {
          mode === "ascii" && (
            <Table.Td>
              <TextInput
                placeholder={parameter.ascii_command}
                radius="md"
                size="xs"
                key={form.key(`${parameter.id}-ascii_command`)}
                {...form.getInputProps(`${parameter.id}-ascii_command`)}
              />
            </Table.Td>
          )
        }

        {/* Formula Input */}
        <Table.Td>
          <TextInput
            placeholder={parameter.formula}
            radius="md"
            size="xs"
            key={form.key(`formula_${parameter.id}`)}
            {...form.getInputProps(`formula_${parameter.id}`)}
          />
        </Table.Td>
        
        {/* Delete Button */}
        <Table.Td>
          <Popover position="bottom" withArrow shadow="md">
            <Popover.Target>
            {
              isPending ?  
                <Button 
                  size="compact-sm" 
                  variant="filled"
                  color="red"  
                  disabled>
                  <Loader size="sm" />
                </Button>
              :
                <Button 
                  size="compact-sm"
                  fz="0.6rem"
                  rightSection={<IconTrash size="1rem" />} 
                  variant="filled"
                  color="red"
                >
                  Delete
                </Button>
            }
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