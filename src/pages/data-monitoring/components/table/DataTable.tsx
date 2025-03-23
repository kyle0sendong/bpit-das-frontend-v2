import { useState } from "react";
import { Table, ScrollArea, Title, Flex } from "@mantine/core";
import classes from "./css/DataTable.module.css"
import cx from "clsx";

import { convertDateTimeToString } from "@/utils/dates";
import { useGetCurrentValuesByAnalyzerId } from "@/hooks/currentValuesHook";

// Define the types for your data
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
  datetime: string | null;
  [key: string]: string | null | number; // For dynamically added timebase columns
}

type DataTableProps = {
  title: string;
  id: number;
  type: string;
}

const DataTable = ({title, id, type}: Partial<DataTableProps>) => {
  const [scrolled, setScrolled] = useState(false);
  const { data, isFetched } = useGetCurrentValuesByAnalyzerId(id ?? 1, type ?? 'tcp');
  
  // If data isn't fetched yet, we won't render the table content
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
      <Flex direction="column" mb="xs">
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
    // Start with the parameter name
    const row: TransformedDataItem = {
      parameterName: paramName,
      datetime: null // Will be updated if any non-null datetime exists
    };
    
    // Add columns for each timebase
    uniqueTimebases.forEach(timebase => {

      // Find the matching item for this parameter and timebase
      const item = typedData.find(d => 
        d.parameterName === paramName && d.timebase === timebase
      );
      
      // Add the currentValue as a column with the timebase as the column name
      row[`timebase_${timebase}`] = item ? item.currentValue : null;
      
      // Update datetime if available
      if (item && item.datetime) {
        row.datetime = item.datetime;
      }
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
    <Table.Thead className={cx(classes.header, { [classes.scrolled]: scrolled })} style={{fontSize:'0.8rem'}}>
      <Table.Tr>
        <Table.Th ta="center" style={{ width: 170, minWidth: 170 }}>Parameter</Table.Th>
        <Table.Th ta="center" style={{ width: 170, minWidth: 170 }}>Date & Time</Table.Th>
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

  // Create rows from transformed data
  const rows = transformedData.map((row) => (
    <Table.Tbody style={{fontSize:'0.8rem'}} key={row.parameterName}>
      <Table.Tr>
        <Table.Td>{row.parameterName}</Table.Td>
        <Table.Td>{convertDateTimeToString(row.datetime)}</Table.Td>
        {uniqueTimebases.map(timebase => {
          if(type === 'vc' && timebase === 0) return 
          const value = row[`timebase_${timebase}`] as string | null;
          return (
            <Table.Td key={`${row.parameterName}-${timebase}`}>
              {value === "-9999.00000" ? 
                "N/A" : 
                value !== null ? 
                  parseFloat(value).toFixed(2) : 
                  "N/A"}
            </Table.Td>
          );
        })}
      </Table.Tr>
    </Table.Tbody>
  ));

  return (
    <Flex direction="column" mb="md">
      <Title size="md" ta="center" p="xs">
        {title}
      </Title>
      <ScrollArea maw="70vw" type="auto" offsetScrollbars scrollbarSize={15} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
        <Table bg="white" verticalSpacing="sm" highlightOnHover withColumnBorders ta="center">
          {columns}
          {rows}
        </Table>
      </ScrollArea>
    </Flex>
  );
};

export default DataTable;