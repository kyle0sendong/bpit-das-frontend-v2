import AlterTableClient from '../../../../Shared/service/AlterTableClient'
import AlterTableConfigService from '../../../../Shared/service/AlterTableConfigService'
import { TIMEBASES } from '../../../../Shared/constants/TimebaseConstants'

const alterTableConfigService = new AlterTableConfigService(AlterTableClient)

export const RenameTablePerTimebase = (tableName, newTableName) => {
  tableName = tableName.replaceAll(" ", "_")
  newTableName = newTableName.replaceAll(" ", "_")

  TIMEBASES.map( (timebase) => { 
    const tableData = {
      'tableName':`data_${tableName}_T${timebase.key}`, 
      'newTableName':`data_${newTableName}_T${timebase.key}`
    }
    alterTableConfigService.renameTable(tableData)
  })
}

export const DeleteTablePerTimebase = (tableName) => {
  tableName = tableName.replaceAll(" ", "_")
  TIMEBASES.map( (timebase) => {
    const tableData = {
      'tableName':`data_${tableName}_T${timebase.key}`
    }
    console.log(tableData)
    alterTableConfigService.deleteTable(tableData)
  })
}

export const DeleteColumnPerTimebase = (columnNames, timebaseData) => {

  columnNames.forEach( (columnName) => {
    columnName = columnName.replaceAll(" ", "_")
    timebaseData.forEach( (timebase) => {
      const tableData = {
        'tableName':`data_t${timebase.timebase}`,
        'columnName':columnName
      }
      alterTableConfigService.deleteColumn(tableData)
    })
  })

}