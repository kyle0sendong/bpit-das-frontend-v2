import AlterTableClient from '../../../../Shared/service/AlterTableClient'
import AlterTableConfigService from '../../../../Shared/service/AlterTableConfigService'

const service = new AlterTableConfigService(AlterTableClient)

export const InsertColumnPerTimebase = (columnName, timebases) => {
  timebases.map( (timebase) => {
    const cleanTableName = `data_t${timebase.timebase}`  
    service.insertColumn({
      'tableName':cleanTableName,
      'columnName':columnName,
      'dataType':'DECIMAL(10,5)'
    })
    service.insertColumn({
      'tableName':cleanTableName,
      'columnName':`${columnName}_status`,
      'dataType':'TINYINT'
    })
  })
}

// export const InsertTablesPerTimebase = (tableName) => {

//   TIMEBASES.forEach( (timebase) => {
//     const cleanTableName = tableName.replaceAll(" ", "_")
//     const tableData = {'name':cleanTableName, 'timebase':timebase.key}
//     service.insertTable(tableData)
//   })
// }
