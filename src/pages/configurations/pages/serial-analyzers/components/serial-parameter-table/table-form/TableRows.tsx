/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

import { Table, Group, TextInput, Switch, rem, NativeSelect, Button, Popover, NumberInput, Text } from "@mantine/core"
import { IconCheck, IconX } from "@tabler/icons-react";
import { showNotification } from "@mantine/notifications";
import { UseFormReturnType } from "@mantine/form";
import { LoaderButton1, DeleteButton1 } from "@/components/ui/button";
import { useDeleteSerialParameter } from "@/hooks/serialParametersHook";

import { dataFormatMenu, requestIntervalsMenu, functionCodesMenu } from "@/utils/constants";

import { ParameterType } from "@/types/parameters";

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
  const {mutate: deleteParameter, isPending, isError } = useDeleteSerialParameter(parametersData[0]?.analyzer_id);
  const [errorState, setErrorState] = useState(false);
  const [opened, setOpened] = useState<number | null>(null);

  
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

  useEffect(() => {
    if (isError) {
      setErrorState(true);
      const timer = setTimeout(() => {
        setErrorState(false)
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isError]);

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

  // If there are no parameters, return a message
  if (parametersData.length === 0) {
    return (
      <Table.Tr>
        <Table.Td colSpan={11} style={{ textAlign: 'center', padding: '20px', color: 'white' }}>
          <Text>No parameters configured.</Text>
        </Table.Td>
      </Table.Tr>
    );
  }


  const handleDelete = (id:number) => {
    deleteParameter(id, {
      onError: () => {
        showNotification({
          title: "Delete Failed",
          message: "An error occurred while deleting the parameter.",
          color: "red",
          autoClose: 3000,
        });
      },
      onSuccess: () => {
        showNotification({
          title: "Delete Successful",
          message: "Parameters have been deleted successfully!",
          color: "green",
          autoClose: 3000,
        });
      },
    });
  };

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
            form.setFieldValue(`format_${parameter.id}`, selectedFormat);
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
                key={form.key(`ascii_command-${parameter.id}`)}
                {...form.getInputProps(`ascii_command-${parameter.id}`)}
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
          <Popover 
            position="bottom"
            withArrow
            shadow="md"
            opened={opened === parameter.id} // Open only for the clicked row
            onChange={(isOpen) => setOpened(isOpen ? parameter.id : null)}
          >
            <Popover.Target>
              {isPending ? (
                <LoaderButton1 />
              ) : (
                <DeleteButton1                   
                  onClick={() => setOpened(parameter.id)}
                  isDisabled={errorState}
                />
              )}
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
                    handleDelete(parameter.id);
                    setOpened(null); // Close popover
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