import AlterTableClient from '../../../../../Shared/service/AlterTableClient'
import AlterTableConfigService from '../../../../../Shared/service/AlterTableConfigService'

const service = new AlterTableConfigService(AlterTableClient)

export const DeleteColumnPerTable = (columnName, timebases) => {

  timebases.forEach( (timebase) => {
    const cleanColumnName = columnName.replaceAll(' ', '_')
    const cleanTableName = `data_t${timebase.timebase}`
    let data = {'tableName':cleanTableName, 'columnName':cleanColumnName}
    service.deleteColumn(data)

    data.columnName = `${data.columnName}_status`
    service.deleteColumn(data)
  })
}

export const RenameColumnsPerTable = (data, newData, timebases) => {

  const columnName = data.replaceAll(' ', '_')
  const newColumnName = newData.replaceAll(' ', '_')
  
  if(columnName != newColumnName) {

    timebases.map( (timebase) => {

      try {
        const cleanTableName = `data_t${timebase.timebase}`
        const changeColumnData = {'tableName': cleanTableName, 
                                  'dataType':'DECIMAL(10,5)', 
                                  'columnName':columnName, 
                                  'newColumnName':`${newColumnName}`}
        service.renameColumn(changeColumnData)
  
        // rename status column
        changeColumnData.columnName = `${columnName}_status`
        changeColumnData.newColumnName = `${newColumnName}_status`
        changeColumnData.dataType = 'TINYINT'
        service.renameColumn(changeColumnData)
      } catch (error) {
        return error
      }

    })
  }

}
