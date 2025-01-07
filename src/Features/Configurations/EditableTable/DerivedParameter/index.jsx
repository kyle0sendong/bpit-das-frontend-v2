import './Assets/table.css'
import { Table } from 'antd';
import PropTypes from 'prop-types'

import { DERIVED_PARAMETER_COLUMNS } from './constants/columns';
import { RenameColumnsPerTable, DeleteColumnPerTable } from './hooks/useAlterColumn';

import { pagination } from './components/pagination';
import { EditableRow, EditableCell } from './components/EditableRow'
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useUpdateDerivedParameter, useDeleteDerivedParameter } from './hooks/useDerivedParameterData';
import { useGetAllTimebase } from '../../../../Hooks/useFetchData';
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

const EditableTableDerivedParameter = (props) => {
  
  const {tableName, data} = props
  const [dataSource, setDataSource] = useState(data.derivedParameter)
  const queryClient = useQueryClient()
  const dropdownParameterData = data.dropdownParameterData
  const tcpId = dataSource[0].tcp_analyzer_id
  const tableKey = `tableKey${tcpId}`
 
  const { mutate: updateDerivedParameter } = useUpdateDerivedParameter()
  const { mutate: deleteDerivedParameter } = useDeleteDerivedParameter(queryClient, tcpId)
  const { mutate: insertUserLog } = useInsertUserLog(queryClient, getCurrentDate())

  const timebases = useGetAllTimebase()

  useEffect( () => {
    setDataSource(data.derivedParameter)
  }, [data.derivedParameter])

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  if (timebases.isFetched) {
    const handleDelete = (row) => {
      const queryKey = row.tcp_analyzer_id ? `derivedParameter${row.tcp_analyzer_id}` : 'derivedParameters'
      deleteDerivedParameter(row)
  
      const logData = {
        "username": "na",
        "full_name": "na",
        "tags": "Virtual Channel, Delete",
        "changes": `Analyzer: ${tableName.replace('_', ' ')}. Virtual Channel: ${row.name} Deletion`
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
      
      function getLabel(key, data) {
        const index = data.findIndex((item) => item.key == key)
        if (index >= 0) {
          return data[index].label
        } else {
          return ''
        }
      }
      const currentDerivedParameter = getLabel(item[updateItem], dropdownParameterData)
      const newDerivedParameter = getLabel(data[updateItem], dropdownParameterData)
  
      const logData = {
        "username": "na",
        "full_name": "na",
        "tags": "Virtual Channel, Update",
        "changes": `Analyzer: ${tableName.replace('_', ' ')}. Virtual Channel: ${row.name}: ${updateItem.replace('_', ' ')}. Value: ${currentDerivedParameter} to ${newDerivedParameter}`
      }
      
      insertLog(insertUserLog, logData)
      updateDerivedParameter(data)
      RenameColumnsPerTable(dataSource[index].name, row.name, timebases.data)
    };
  
    const derived_parameter_columns = DERIVED_PARAMETER_COLUMNS.map((col) => {
      return {
        ...col,
        onCell: (record) => ({
          record,
          inputType: col.inputType,
          dataIndex: col.dataIndex,
          title: col.title,
          dropdownParameterData: dropdownParameterData,
          handleSave,
          handleDelete
        }),
      };
    });
  
    return (
      <div style={{marginBlock:'0.5rem'}}>
        <div>
          <Table
            key={tableKey}
            components={components}
            rowClassName={() => 'editable-row'}
            dataSource={dataSource}
            columns={derived_parameter_columns}
            size='small'
            bordered
            pagination={pagination}
          />
        </div>
      </div>
    );
  }

};

EditableTableDerivedParameter.propTypes = {
  tableName: PropTypes.string,
  data: PropTypes.object
}

export default EditableTableDerivedParameter;