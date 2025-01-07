import PropTypes from 'prop-types'
import { SearchFilterContext } from "../../../Contexts/SearchFilterContext";
import { Table } from 'antd';
import { pagination } from './components/pagination';
import {  useContext } from "react";

const getColumns = (items) => {

  const columns = [{
    title: 'Date & Time',
    dataIndex: 'datetime',
    key: 'datetime',
    sorter: (a, b) => new Date(a.datetime) - new Date(b.datetime),
    sortDirections: ['descend', 'ascend', 'descend'],
    defaultSortOrder: 'descend'
  }]

  const sorter = (index) => (a, b) => {
    const isInvalid = (value) => {
      switch(value) {
        case '< Sampling':
        case 'No Data':
        case 'No Status':
          return true;
        default:
          return false
      }
    }
    let a1 = a[index]
    let b1 = b[index]
    if(isInvalid(a[index])) {
      a1 = -9999
    }
    if(isInvalid(b[index])) {
      b1 = -9999
    }
    return a1 - b1
  }

  items.forEach( (item) => {
    const cleanIndex = item.replace(' ', '_')
    columns.push({
      title: item,
      dataIndex: cleanIndex,
      key: `${cleanIndex}`,
      sorter: sorter(cleanIndex),
      ellipsis:true
    })
  })
  return columns
}


const modifyItems = (tcpData) => {

  function formatDate(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes;
    return (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
  }

  const getStatusInfo = (code) => {

    switch(code) {
      case null:
        return 'No Status';
      case 2:
        return 'No Data'
      case 3:
        return '< Sampling'
    }
  }

  tcpData.forEach( (data) => {
    data['datetime'] = formatDate(new Date(data['datetime']))

    for (const key in data) {
      if (data[key] == null) {
        const status = getStatusInfo(data[`${key}_status`])
        data[key] = status
      }
    }
  })
}


const DataTable = ({tcpData}) => {

  const { searchFilter } = useContext(SearchFilterContext)
  modifyItems(tcpData)
  const columns = getColumns(searchFilter.parameters)

  return (
    <Table
      key="dataReporterTable"
      columns={columns}
      dataSource={tcpData}
      size="small"
      pagination={pagination}
      scroll={{ x: 'max-content' }}
    />
  )
}
DataTable.propTypes = {
  tcpData: PropTypes.array
}

export default DataTable
