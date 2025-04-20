import { Table } from "@mantine/core";
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
  id: number;
  type: string;
  title: string;
}

const RenderRows = ({ id, title, type}: Partial<DataTableProps>) => {
  const { data, isFetched } = useGetCurrentValuesByAnalyzerId(id ?? 1, type ?? 'tcp');
    

  // If data isn't fetched yet, we won't render the table content
  if (!isFetched) {
    return (
      <Table.Tr key={`loading`}>
        <Table.Td>Loading please wait...</Table.Td>
      </Table.Tr>
    );
  }

  if(data.length == 0) {
    return (
      <Table.Tr key={`loading`}>
        <Table.Td>No data</Table.Td>
      </Table.Tr>
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
      if (item && item.datetime && (item.timebase === 0 || item.timebase === 1)) {
        row.datetime = item.datetime;
      }
    });
    
    return row;
  });



  // Create rows from transformed data
  const rows = transformedData.map((row) => (
    <Table.Tr key={`${row.id}-${row.parameterName}`}>
      <Table.Td>{convertDateTimeToString(row.datetime)}</Table.Td>
      <Table.Td>{title}</Table.Td>
      <Table.Td>{row.parameterName}</Table.Td>
      
      {uniqueTimebases.map(timebase => {
        if(type === 'vc' && timebase === 0) return
        if(timebase === 1) {
          const value = row[`timebase_${timebase}`] as string | null;
          return (
            <Table.Td key={`${row.parameterName}-${timebase}`}>
              {
                value === "-9999.00000" 
                  ? "N/A" 
                    : value !== null 
                      ? parseFloat(value).toFixed(2) 
                      : "N/A"
              }
            </Table.Td>
          );
        }
      })}
    </Table.Tr>
  ));

  return rows;
};

export default RenderRows;