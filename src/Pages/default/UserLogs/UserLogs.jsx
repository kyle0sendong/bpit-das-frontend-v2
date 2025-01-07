import {Flex} from 'antd'
import UserLogsTable from '../../../Features/UserLogs/Table'
import CalendarView from '../../../Features/UserLogs/DatePicker'
import DateRangePicker from '../../../Features/UserLogs/DateRangePicker'

export default function UserLogs() {
  return(
    <Flex>
      <div style={{width:'90vw'}}>
        <UserLogsTable />
      </div>

      <div style={{width:'30vw', marginInlineStart:'2vw'}}>
        <DateRangePicker />
        <CalendarView />
      </div>
    </Flex>
  )
}