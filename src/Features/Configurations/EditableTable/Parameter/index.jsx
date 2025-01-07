import './Assets/table.css'
import { Table } from 'antd';
import PropTypes from 'prop-types'

import { PARAMETER_COLUMNS } from './constants/columns';
import { RenameColumnsPerTable, DeleteColumnPerTable } from './hooks/useAlterColumn';

import { pagination } from './components/pagination';
import { EditableRow, EditableCell } from './components/EditableRow'
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useUpdateParameter, useDeleteParameter } from './hooks/useParameterData';
import { useGetAllTimebase } from '../../../../Hooks/useFetchData';
import changeDataFormatLabel from './utils/changeDataFormatLabel';

import { getCurrentDate } from '../../../../Utils/getCurrentDate';

import { useInsertUserLog } from '../../../../Hooks/useUserLogs'

import { insertLog } from './utils/logs';

const extractItemBeingUpdated = (oldData, newData) => {
  for(const key in oldData) {
    if(oldData[key] != newData[key]) {
      return key
    }
  }
}

const Tables = (props) => {
  
  const {tableName, data} = props
  const [dataSource, setDataSource] = useState(data.parameter)
  const queryClient = useQueryClient()
  console.log(data.parameter)
  const tcpId = dataSource[0].tcp_analyzer_id
  const tableKey = `tableKey${tcpId}`

  const { mutate: updateParameter } = useUpdateParameter()
  const { mutate: deleteParameter } = useDeleteParameter(queryClient, tcpId)
  const { mutate: insertUserLog } = useInsertUserLog(queryClient, getCurrentDate())

  const timebases = useGetAllTimebase()

  useEffect( ()=> {
    setDataSource(data.parameter)
  }, [data.parameter])

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  if (timebases.isFetched) {
    
    const handleDelete = (row) => {
      const queryKey = row.tcp_analyzer_id ? `parameter${row.tcp_analyzer_id}` : 'parameters'
      deleteParameter(row)
  
      const logData = {
        "username": "na",
        "full_name": "na",
        "tags": "Parameter, Delete",
        "changes": `Analyzer: ${tableName.replace('_', ' ')}. Parameter: ${row.name} Deletion`
      }
      insertLog(insertUserLog, logData)
      DeleteColumnPerTable(row.name, timebases.data)
      queryClient.invalidateQueries(queryKey)
    }
  
    const handleSave = (row) => {
      const newData = [...dataSource];
      const index = newData.findIndex((item) => row.key === item.key);
      const item = newData[index];
      newData.splice(index, 1, {
        ...item,
        ...row,
      });
  
      setDataSource(newData);
      const data = {...newData[index]}
      const updateItem = extractItemBeingUpdated(item, data)
      
      const logData = {
        "username": "na",
        "full_name": "na",
        "tags": "Parameter, Update",
        "changes": `Analyzer: ${tableName.replace('_', ' ')}. Parameter: ${row.name}: ${updateItem.replace('_', ' ')}. Value: ${item[updateItem]} to ${data[updateItem]}`
      }
      
      insertLog(insertUserLog, logData)
      updateParameter(data)
      RenameColumnsPerTable(dataSource[index].name, row.name, timebases.data)
    };
  
    const parameter_columns = PARAMETER_COLUMNS.map((col) => {
      return {
        ...col,
        onCell: (record) => ({
          record,
          inputType: col.inputType,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave,
          handleDelete
        }),
      };
    });
    
    changeDataFormatLabel(dataSource)
    return (
      <div style={{marginBlock:'0.5rem'}}>
        <div>
          <Table
            key={tableKey}
            components={components}
            rowClassName={() => 'editable-row'}
            dataSource={dataSource}
            columns={parameter_columns}
            size='small'
            bordered
            pagination={pagination}
          />
        </div>
      </div>
    );
  }

};

Tables.propTypes = {
  tableName: PropTypes.string,
  data: PropTypes.object
}

export default Tables;