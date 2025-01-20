import { Table, Group, TextInput, Switch, rem, NativeSelect, Button, Popover } from "@mantine/core"
import { IconCheck, IconX, IconTrash } from "@tabler/icons-react";

import { useDeleteVirtualChannel } from "@/hooks/virtualChannelsHook";

import { VirtualChannelsType } from "@/types/virtualChannels";
import { TcpParametersType } from "@/types/tcpParameters";
import { UseFormReturnType } from "@mantine/form";

const getSelectDataMenu = (parametersData: TcpParametersType[], selectedId: number) => {
  const selectData: {
    label: string,
    value: string
  }[] = []

  const selectedIndex = parametersData.findIndex((parameterData) => parameterData.id === selectedId) ?? 0;
  const value = parametersData[selectedIndex]?.id ?? 'N/A';

  if(selectedIndex > -1) {
    selectData.push({
      label: `${parametersData[selectedIndex].name}`,
      value: value.toString()
    })
  } else {
    selectData.push({
      label: `NA`,
      value: '-1'
    })
  }

  for(const parameterData of parametersData) {
    selectData.push({
      label: `${parameterData.name}`,
      value: parameterData.id.toString()
    })
  }
  selectedIndex > -1 && selectData.splice(selectedIndex+1, 1);
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
  parametersData: TcpParametersType[];
  form: UseFormReturnType<VirtualChannelsType>;
}

const TableRows = ({virtualChannelsData, parametersData, form}: TableRowsProps) => {
  const {mutate: deleteVirtualChannel} = useDeleteVirtualChannel();

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
              key={form.key(`${virtualChannel.id}-enable`)}
              {...form.getInputProps(`${virtualChannel.id}-enable`)}
            />
          </Group>
        </Table.Td>

        {/* Name Input */}
        <Table.Td>
          <TextInput
            placeholder={virtualChannel.name}
            radius="md"
            size="xs"
            key={form.key(`${virtualChannel.id}-name`)}
            {...form.getInputProps(`${virtualChannel.id}-name`)}
          />
        </Table.Td>

        {/* Unit Input */}
        <Table.Td>
          <TextInput
            placeholder={virtualChannel.unit ?? ''}
            radius="md"
            size="xs"
            key={form.key(`${virtualChannel.id}-unit`)}
            {...form.getInputProps(`${virtualChannel.id}-unit`)}
          />
        </Table.Td>

        {/* Formula Input */}
        <Table.Td>
          <TextInput
            placeholder={virtualChannel.formula}
            radius="md"
            size="xs"
            key={form.key(`${virtualChannel.id}-formula`)}
            {...form.getInputProps(`${virtualChannel.id}-formula`)}
          />
        </Table.Td>
        
        {/* variable X */}
        <Table.Td>
          <NativeSelect
            size="xs"
            data={getSelectDataMenu(parametersData, virtualChannel.x ?? 0)}
            key={form.key(`${virtualChannel.id}-x`)}
            {...form.getInputProps(`${virtualChannel.id}-x`)}
          />
        </Table.Td>

        {/* variable Y */}
        <Table.Td>
          <NativeSelect
            size="xs"
            data={getSelectDataMenu(parametersData, virtualChannel.y ?? 0)}
            key={form.key(`${virtualChannel.id}-y`)}
            {...form.getInputProps(`${virtualChannel.id}-y`)}
          />
        </Table.Td>

        {/* variable Z */}
        <Table.Td>
          <NativeSelect
            size="xs"
            data={getSelectDataMenu(parametersData, virtualChannel.z ?? 0)}
            key={form.key(`${virtualChannel.id}-z`)}
            {...form.getInputProps(`${virtualChannel.id}-z`)}
          />
        </Table.Td>

        {/* variable A */}
        <Table.Td>
          <NativeSelect
            size="xs"
            data={getSelectDataMenu(parametersData, virtualChannel.a ?? 0)}
            key={form.key(`${virtualChannel.id}-a`)}
            {...form.getInputProps(`${virtualChannel.id}-a`)}
          />
        </Table.Td>

        {/* variable B */}
        <Table.Td>
          <NativeSelect
            size="xs"
            data={getSelectDataMenu(parametersData, virtualChannel.b ?? 0)}
            key={form.key(`${virtualChannel.id}-b`)}
            {...form.getInputProps(`${virtualChannel.id}-b`)}
          />
        </Table.Td>

        {/* variable C */}
        <Table.Td>
          <NativeSelect
            size="xs"
            data={getSelectDataMenu(parametersData, virtualChannel.c ?? 0)}
            key={form.key(`${virtualChannel.id}-c`)}
            {...form.getInputProps(`${virtualChannel.id}-c`)}
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