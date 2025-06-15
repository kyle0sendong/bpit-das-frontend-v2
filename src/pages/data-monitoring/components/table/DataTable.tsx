import { useState } from "react";
import { Table, ScrollArea, Title, Flex, Tooltip } from "@mantine/core";
import classes from "./DataTable.module.css"
import cx from "clsx";

import { convertDateTimeToString } from "@/utils/dates";
import { useGetCurrentValuesByAnalyzerId } from "@/hooks/currentValuesHook";

interface DataItem {
  id: number;
  currentValue: string | null;
  datetime: string | null;
  timebase: number;
  parameterName: string;
  requestInterval: string;
}

interface TransformedDataItem {
  parameterName: string;
  [key: string]: string | null | number;
}

type DataTableProps = {
  title: string;
  id: number;
  type: string;
}

const DataTable = ({title, id, type}: Partial<DataTableProps>) => {
  const [scrolled, setScrolled] = useState(false);
  const { data, isFetched } = useGetCurrentValuesByAnalyzerId(id ?? 1, type ?? 'tcp');
    
  // If data isn't fetched yet, don't render the table content
  if (!isFetched) {
    return (
      <Flex direction="column" mb="xs">
        <Title size="md" ta="center" p="xs">{title}</Title>
        <div>Loading...</div>
      </Flex>
    );
  }

  if(data.length == 0) {
    return (
      <Flex direction="column" mb="xs" c="white">
        <Title size="md" ta="center" p="xs">{title}</Title>
        <div> No Configured Parameters</div>
      </Flex>
    );
  }
  
  // Type assertion for data
  const typedData = data as DataItem[];
  const uniqueParameterNames = [...new Set(typedData.map((item) => item.parameterName))];
  const uniqueTimebases = [...new Set(typedData.map((item) => item.timebase))].sort((a, b) => a - b);
    
  // Transform data to have one row per parameter with columns for each timebase
  const transformedData: TransformedDataItem[] = uniqueParameterNames.map(paramName => {

    const row: TransformedDataItem = {
      parameterName: paramName
    };
    
    uniqueTimebases.forEach(timebase => {
  
      const item = typedData.find(d =>
        d.parameterName === paramName && d.timebase === timebase
      );

      row[`timebase_${timebase}`] = item ? item.currentValue : null;
      row[`datetime_${timebase}`] = item?.datetime ?? null;
    });

    
    return row;
  });

  // Function to get column label based on timebase
  const getTimebaseLabel = (timebase: number): string => {
    if(timebase == 0) return `Current Data`;
    else {    
      const timebaseValue = timebase < 60 ? timebase : timebase < 1440 ? timebase/60 : timebase/1440;
      const titleFormat = timebase < 60 ? 'min.' : timebase < 1440 ? 'hr.' : 'day';
      return `${timebaseValue}-${titleFormat}`;
    }
  };

  // Create column headers based on timebases
  const columns = (
    <Table.Thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
      <Table.Tr>
        <Table.Th ta="center" style={{ width: 170, minWidth: 170 }}>Parameter</Table.Th>
        {
          uniqueTimebases.map(timebase => {
            if(type === 'vc' && timebase === 0) return 
            return (
              <Table.Th key={`th-${timebase}`} ta="center" style={{ width: 120, minWidth: 120 }}>
                {getTimebaseLabel(timebase)}
              </Table.Th>
            )
          })
        }
      </Table.Tr>
    </Table.Thead>
  );

  const rows = transformedData.map((row) => (
    <Table.Tbody className={classes.rows_container} key={row.parameterName}>
      <Table.Tr>
        <Table.Td>{row.parameterName}</Table.Td>
        {uniqueTimebases.map((timebase) => {
          if (type === 'vc' && timebase === 0) return null;

          const value = row[`timebase_${timebase}`] as string | null;
          const datetime = row[`datetime_${timebase}`] as string | null;
          
          return (
            <Table.Td
              key={`${row.parameterName}-${timebase}`}
              className={cx(classes.rows, classes.pointer)} // Add `pointer` class
            >
              <Tooltip
                label={datetime ? convertDateTimeToString(datetime) : 'No timestamp'}
                withArrow
                position="top"
                offset={6}
              >
                <span>
                  {
                    value === "-9999.00000"
                      ? "N/A"
                      : value !== null
                        ? parseFloat(value).toFixed(2)
                        : "N/A"
                  }
                </span>
              </Tooltip>
            </Table.Td>
          );
        })}
      </Table.Tr>
    </Table.Tbody>
  ));


  return (
    <Flex mb="md" direction="column" justify='center'>
      <div className={classes.title}>
        <p>
          {title}
        </p>
      </div>

      <ScrollArea
        className={classes.table_container}
        classNames={{
          thumb: classes.scrollThumb,
          scrollbar: classes.scrollbar
        }}
        styles={{
          viewport: {
            paddingRight: 0,
            marginRight: 0,
          }
        }}
        type="auto" 
        offsetScrollbars
        scrollbarSize={10}
        onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
      >
        <Table verticalSpacing="sm" ta="center">
          {columns}
          {rows}
        </Table>
      </ScrollArea>
    </Flex>
  );
};

export default DataTable;