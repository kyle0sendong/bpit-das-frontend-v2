import AlterTableClient from '../../../../Shared/service/AlterTableClient'
import AlterTableConfigService from '../../../../Shared/service/AlterTableConfigService'

const service = new AlterTableConfigService(AlterTableClient)

export const InsertTable = (timebase) => {
  const tableData = {'tableName':`data_t${timebase}`}
  service.insertTable(tableData)
}

export const InsertParameterColumns = (parameters, timebase) => {
  parameters.map( (parameter) => {
    const cleanTableName = `data_t${timebase}`  
    service.insertColumn({
      'tableName':cleanTableName,
      'columnName':parameter.name.replace(" ", "_"),
      'dataType':'DECIMAL(10,5)'
    })
    service.insertColumn({
      'tableName':cleanTableName,
      'columnName':`${parameter.name.replace(" ", "_")}_status`,
      'dataType':'TINYINT'
    })
  })
}

export const DeleteTable = (timebase) => {
  const tableData = {'tableName': `data_t${timebase}`}
  service.deleteTable(tableData)
}
