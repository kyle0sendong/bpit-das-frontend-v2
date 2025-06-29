import { useState } from 'react';
import '@mantine/charts/styles.css'; 
import { LineChart } from '@mantine/charts'; 
import { Flex, Pagination } from '@mantine/core'; 

import { toSnakeCase } from '@/utils/strings'; 

import { ParameterType } from '@/types/parameters';
import { VirtualChannelsType } from '@/types/virtualChannels';

import classes from './ParameterGraph.module.css';

// Function to generate a random hex color
const getRandomColor = () => {
  return `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`;
};

type Props = {
  parameters: ParameterType[] | VirtualChannelsType[],
  data: any[],
  analyzerType: string,
  analyzerId: string
}

const ParameterGraph = ({parameters, data, analyzerType, analyzerId}: Props) => {

  const itemsPerPage = 50;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  
  // Start on the last page by default
  const [currentPage, setCurrentPage] = useState(totalPages);

  // Calculate the start and end indices for slicing, starting from the end
  const endIndex = data.length - (currentPage - 1) * itemsPerPage;
  const startIndex = Math.max(0, endIndex - itemsPerPage);

  // Slice the latest data and reverse for display
  const paginatedData = data
    .slice(startIndex, endIndex)
    .reverse();


  const lineCharts = parameters.map((col) => {
    
    const seriesName = analyzerType === 'vc' ? `${analyzerType}_${toSnakeCase(col.name)}` : `${analyzerType}${analyzerId}_${toSnakeCase(col.name)}`
    const series = { 
      name: seriesName, 
      color: getRandomColor(), 
      label: col.name 
    };

    const maxYValue = Math.max(...paginatedData.map(d => Number(d[series.name])));
    const yAxisMax = Math.ceil(maxYValue * 1.5); // Adds 50% padding
    
    return ( 
      <LineChart
        className={classes.graph}
        key={seriesName}
        style={{
          backgroundColor:'white',
          padding: '1rem',
          borderRadius: '1.5rem',
        }}
        h="200px" 
        w="100%" 
        xAxisProps={{ 
          padding: { left: 50, right: 50 }
        }}
        yAxisProps={{ 
          width: 60,
          domain: [0, yAxisMax]
        }}
        withLegend
        styles={{
          legend: {
            label: {
              fill: 'black',
              fontSize: '14px',
              fontWeight: 'bold'
            }
          }
        }}
        data={paginatedData} 
        dataKey="formatted_date" 
        series={[series]} 
        tickLine="y" 
      /> 
    ); 
  }); 
 
  return ( 
    <Flex direction="column" w="100%" gap="lg" align="center"> 
      {lineCharts}
      <Pagination
        classNames={{
          control: classes.paginationControl
        }}
        total={totalPages} 
        value={currentPage} 
        onChange={setCurrentPage} 
        mt="md"
      />
    </Flex> 
  ); 
}; 
 
export default ParameterGraph;