import { Table } from 'antd';
import { pagination } from './components/pagination';
import PropTypes from 'prop-types'

const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

const createColumns = (timebases) => {
  const columns = [
    {
      title: 'Parameter',
      key: 'monitorDataParameterName',
      dataIndex: 'parameter',
      width: 150,
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.parameter.localeCompare(b.parameter),
      sortDirections: ['ascend', 'descend', 'ascend']
    },
    {
      title: 'Date & Time',
      key: 'monitorDataDateTime',
      dataIndex: 'datetime',
      width: 150
    },
    {
      title: 'Current Value',
      key: 'monitorDataCurrentValue',
      width: 100,
      dataIndex: 'currentValue',
    }
  ]

  timebases.sort((a,b) => a.timebase - b.timebase)

  timebases.map( (timebase) => {
    const timebaseValue = timebase.timebase < 60 ? timebase.timebase : timebase.timebase < 1440 ? timebase.timebase/60 : timebase.timebase/1440
    const titleFormat = timebase.timebase < 60 ? 'minute' : timebase.timebase < 1440 ? 'hour' : 'day'
    const timebaseObject = {
      title: `${timebaseValue}-${titleFormat}`,
      key: `monitorDataMinute${timebase.timebase}`,
      dataIndex: `minute${timebase.timebase}`,
      width: 100
    }
    columns.push(timebaseObject)
  })

  return columns
}

const createInitialRow = (parameters, derivedParameters) => {
  const row = []

  parameters.forEach( (parameter) => {
    const parameterName = parameter.name.replace(" ", "_")
    const rowData = {
      'parameter': parameter.name,
      'currentValue': null,
      'key': parameterName
    }
    row.push(rowData)
  })

  derivedParameters.forEach( (derivedParameter) => {
    const parameterName = derivedParameter.name.replace(" ", "_")
    const rowData = {
      'parameter': derivedParameter.name,
      'currentValue': 'Virtual Channel',
      'key': parameterName
    }
    row.push(rowData)
  })
  return row
}

const insertRowData = (dataSource, currentValues, timebases, parameters, derivedParameters) => {

  const modifyCurrentValue = (value, status) => {
    if (value == null) {
      switch(status){
        case 2:
          return 'No Data'
        case 3:
          return '< Sampling'
      }
    } else {
      return (Math.round(value * 100) / 100) // round to 2nd decimal place
    }
  }

  function formatDate(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    minutes = minutes < 10 ? '0'+minutes : minutes;
    seconds = seconds < 10 ? '0'+seconds : seconds;
    let strTime = hours + ':' + minutes + ':' + seconds;
    return (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
  }

  currentValues.forEach( (currentValue) => {
    const timebaseIndex = timebases.findIndex( (timebase) => timebase.id == currentValue.timebase_id)

    // this is the current value for 5 seconds data
    // only process parameters
    if (currentValue.timebase_id == null && currentValue.derived_parameter_id == null) {
        // search for the current value index in the array of current values
      const parameterIndex = parameters.findIndex( (parameter) => parameter.id == currentValue.parameter_id)
      const parameterName = parameters[parameterIndex]['name']
      const currentValueIndex = dataSource.findIndex( (data) => data.parameter == parameterName)
      dataSource[currentValueIndex]['currentValue'] = modifyCurrentValue(currentValue.current_value, currentValue.current_value_status)
      dataSource[currentValueIndex]['datetime'] = formatDate(new Date(currentValue.datetime))
    } else if (timebaseIndex >= 0){

      const timebase = timebases[timebaseIndex]['timebase']
      let parameterIndex = null
      let parameterName = null

      if (currentValue.parameter_id != null) { // check if parameter
        parameterIndex = parameters.findIndex( (parameter) => parameter.id == currentValue.parameter_id)
        parameterName = parameters[parameterIndex]['name']
      }
      
      if (currentValue.derived_parameter_id != null) { // check if derived parameter (virtual channel)
        parameterIndex = derivedParameters.findIndex( (derivedParameter) => derivedParameter.id == currentValue.derived_parameter_id)
        parameterName = derivedParameters[parameterIndex]['name']
        // add 1 minute date time if timebase is 1 minute
        if (timebase == 1) {
          const currentValueIndex = dataSource.findIndex( (data) => data.parameter == parameterName)
          dataSource[currentValueIndex][`datetime`] = formatDate(new Date(currentValue.datetime))
        }
      }
      const currentValueIndex = dataSource.findIndex( (data) => data.parameter == parameterName)
      dataSource[currentValueIndex][`minute${timebase}`] = modifyCurrentValue(currentValue.current_value, currentValue.current_value_status)
      
    }

  })
}

const DataTable = ({ data }) => {

  const columns = createColumns(data.timebases)
  const dataSource = createInitialRow(data.parameters, data.derivedParameters)

  insertRowData(dataSource, data.currentValues, data.timebases, data.parameters, data.derivedParameters)
  if(data.analyzer) {
    if(dataSource.length > 0) {
      console.log(dataSource)
      return (
        <div style={{marginBlock:'24px'}}>
          <div style={{textAlign:"center", marginBlockEnd:'1rem', fontSize:'1.5em',fontWeight:'800'}}>
            {data.analyzer.name}
          </div>

          <div>
            <Table
              key='monitorDataTable'
              style={{margin:'24px 12px'}}
              columns={columns}
              dataSource={dataSource}
              size="small"
              pagination={pagination}
              onChange={onChange}
              showSorterTooltip={{
                target: 'sorter-icon',
              }}
              scroll={{ x: 'max-content' }} 
              virtual
            />
          </div>
        </div>
      )
    } else {
      return (
        <div>
          empty data
        </div>
      )
    }
  } else {
    return (
      <div>
        empty data
      </div>
    )
  }

}

DataTable.propTypes = {
  data: PropTypes.object
}

export default DataTable;
