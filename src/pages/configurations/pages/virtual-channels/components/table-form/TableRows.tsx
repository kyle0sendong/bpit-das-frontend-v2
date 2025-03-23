import { useEffect } from "react";
import { Table, Group, TextInput, Switch, rem, NativeSelect, Button, Popover, Loader } from "@mantine/core"
import { IconCheck, IconX, IconTrash } from "@tabler/icons-react";

import { useDeleteVirtualChannel } from "@/hooks/virtualChannelsHook";

import { VirtualChannelsType } from "@/types/virtualChannels";
import { ParameterType } from "@/types/parameters";
import { UseFormReturnType } from "@mantine/form";

const getSelectDataMenu = (parametersData: ParameterType[], selected: string) => {
  

  const selectData: {
    label: string,
    value: string
  }[] = []

  if (selected && selected !== 'none') {

    for(const parameterData of parametersData) {
      const [selectedType, selectedId] = selected.split("-");
      const selectedNumericId = parseInt(selectedId);

      // Check if TCP
      if (
        selectedType === "tcp" &&
        !("ascii_command" in parameterData) &&
        parameterData.id === selectedNumericId
      ) {
        selectData.push({
          label: `${parameterData.name} (TCP)`,
          value: `tcp-${parameterData.id}`
        });
        break;
      }

      // Check if Serial
      if (
        selectedType === "serial" &&
        "ascii_command" in parameterData &&
        parameterData.id === selectedNumericId
      ) {
        selectData.push({
          label: `${parameterData.name} (Serial)`,
          value: `serial-${parameterData.id}`
        });
        break;
      }
    }
  }
  else {
    selectData.push({
      label: `NA`,
      value: 'none'
    })
  }


  for(const parameterData of parametersData) {
    let type = 'TCP'
    if ("ascii_command" in parameterData) type = 'Serial'

    const selectItem = {
      label: `${parameterData.name} (${type})`,
      value: `${type.toLowerCase()}-${parameterData.id}`
    }

    if(selectData[0].label === selectItem.label) continue;

    selectData.push(selectItem)
  }

  if(selectData[0].label !== 'NA') selectData.push({label: `NA`, value: 'none'});
  return selectData;
}

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
  virtualChannelsData: VirtualChannelsType[];
  parametersData: ParameterType[];
  form: UseFormReturnType<VirtualChannelsType>;
}

const TableRows = ({virtualChannelsData, parametersData, form}: TableRowsProps) => {
  const {mutate: deleteVirtualChannel, isPending} = useDeleteVirtualChannel();

  // Use useEffect to set form values once after mounting or when parametersData changes
  useEffect(() => {
    for(const virtualChannel of virtualChannelsData) {
      form.setFieldValue(`enable_${virtualChannel.id}`, virtualChannel.enable);
      form.setFieldValue(`name_${virtualChannel.id}`, virtualChannel.name);
      form.setFieldValue(`unit_${virtualChannel.id}`, virtualChannel.unit);
      form.setFieldValue(`formula_${virtualChannel.id}`, virtualChannel.formula);
      form.setFieldValue(`x_${virtualChannel.id}`, virtualChannel.x);
      form.setFieldValue(`y_${virtualChannel.id}`, virtualChannel.y);
      form.setFieldValue(`z_${virtualChannel.id}`, virtualChannel.z);
      form.setFieldValue(`a_${virtualChannel.id}`, virtualChannel.a);
      form.setFieldValue(`b_${virtualChannel.id}`, virtualChannel.b);
      form.setFieldValue(`c_${virtualChannel.id}`, virtualChannel.c);
    }
  }, [virtualChannelsData]);

  return virtualChannelsData.map( (virtualChannel) => {
    return (
      <Table.Tr key={`${virtualChannel.name}${virtualChannel.id}`}  style={{fontSize:"0.7rem"}}>

        {/* Enable Switch */}
        <Table.Td>
          <Group justify="center">
            <Switch
              defaultChecked={virtualChannel.enable}
              onLabel={checkIcon}
              offLabel={xIcon}
              color="dark.4"
              key={form.key(`enable_${virtualChannel.id}`)}
              {...form.getInputProps(`enable_${virtualChannel.id}`)}
            />
          </Group>
        </Table.Td>

        {/* Name Input */}
        <Table.Td>
          <TextInput
            placeholder={virtualChannel.name}
            radius="md"
            size="xs"
            key={form.key(`name_${virtualChannel.id}`)}
            {...form.getInputProps(`name_${virtualChannel.id}`)}
          />
        </Table.Td>

        {/* Unit Input */}
        <Table.Td>
          <TextInput
            placeholder={virtualChannel.unit ?? ''}
            radius="md"
            size="xs"
            key={form.key(`unit_${virtualChannel.id}`)}
            {...form.getInputProps(`unit_${virtualChannel.id}`)}
          />
        </Table.Td>

        {/* Formula Input */}
        <Table.Td>
          <TextInput
            placeholder={virtualChannel.formula}
            radius="md"
            size="xs"
            key={form.key(`formula_${virtualChannel.id}`)}
            {...form.getInputProps(`formula_${virtualChannel.id}`)}
          />
        </Table.Td>
        
        {/* variable X */}
        <Table.Td>
          <NativeSelect
            size="xs"
            data={getSelectDataMenu(parametersData, virtualChannel.x)}
            key={form.key(`x_${virtualChannel.id}`)}
            {...form.getInputProps(`x_${virtualChannel.id}`)}
          />
        </Table.Td>

        {/* variable Y */}
        <Table.Td>
          <NativeSelect
            size="xs"
            data={getSelectDataMenu(parametersData, virtualChannel.y)}
            key={form.key(`y_${virtualChannel.id}`)}
            {...form.getInputProps(`y_${virtualChannel.id}`)}
          />
        </Table.Td>

        {/* variable Z */}
        <Table.Td>
          <NativeSelect
            size="xs"
            data={getSelectDataMenu(parametersData, virtualChannel.z)}
            key={form.key(`z_${virtualChannel.id}`)}
            {...form.getInputProps(`z_${virtualChannel.id}`)}
          />
        </Table.Td>

        {/* variable A */}
        <Table.Td>
          <NativeSelect
            size="xs"
            data={getSelectDataMenu(parametersData, virtualChannel.a)}
            key={form.key(`a_${virtualChannel.id}`)}
            {...form.getInputProps(`a_${virtualChannel.id}`)}
          />
        </Table.Td>

        {/* variable B */}
        <Table.Td>
          <NativeSelect
            size="xs"
            data={getSelectDataMenu(parametersData, virtualChannel.b)}
            key={form.key(`b_${virtualChannel.id}`)}
            {...form.getInputProps(`b_${virtualChannel.id}`)}
          />
        </Table.Td>

        {/* variable C */}
        <Table.Td>
          <NativeSelect
            size="xs"
            data={getSelectDataMenu(parametersData, virtualChannel.c)}
            key={form.key(`c_${virtualChannel.id}`)}
            {...form.getInputProps(`c_${virtualChannel.id}`)}
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
                    deleteVirtualChannel(virtualChannel.id)
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