import { Table } from 'antd';
import { pagination } from './components/pagination';
import { columns } from './constants/columns';
import { useGetLogs } from '../../../Hooks/useFetchData';
import { useSearchParams} from 'react-router-dom';

const modifyItems = (items) => {
  items.forEach( (item) => {
    item.key = item.id
    if (item.tags && typeof item.tags === 'string') {
      item.tags = item.tags.split(',')
    }

    const date = new Date(item.date)
    item.date = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
  })
}

const UserLogsTable = () => {
  const [searchParams] = useSearchParams()

  let date = searchParams.get('date') && searchParams.get('date')
  let startDate = searchParams.get('start_date')
  let endDate = searchParams.get('end_date')
  
  const data = date ? {'date':date} : {'startDate':startDate, 'endDate':endDate}
  const userLogs = useGetLogs(data)

  date = date && new Date(date.replace("-", ","))

  startDate = startDate && new Date(startDate.replace("-", ","))
  endDate = endDate && new Date(endDate.replace("-", ","))

  if(userLogs.isFetched) {
    modifyItems(userLogs.data)
    return (
      <>
        <div style={{textAlign:'center', fontSize:'1.5em', fontWeight:'700', marginBlockEnd:'2vh'}}>
          {date && `
              ${date.toLocaleString('default', { month: 'long' })}
              ${date.getDate()},
              ${date.getFullYear()}
          `}

          {startDate && `
            ${startDate.toLocaleString('default', { month: 'long' })}
            ${startDate.getDate()},
            ${startDate.getFullYear()}
            - 
            ${endDate.toLocaleString('default', { month: 'long' })}
            ${endDate.getDate()},
            ${endDate.getFullYear()}
          `}
        </div>
        <div>
          <Table
            columns={columns}
            dataSource={userLogs.data}
            size="small"
            pagination={pagination}
            showSorterTooltip={{
              target: 'sorter-icon',
            }}
            scroll={{ x: 'max-content' }} 
            virtual
          />
        </div>
      </>
    )
  }

}

export default UserLogsTable;