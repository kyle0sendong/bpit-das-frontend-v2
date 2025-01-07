import { Calendar, theme, Spin} from 'antd';
import { useNavigate } from 'react-router-dom';
import { useGetDistinctDateLogs } from '../../../Hooks/useFetchData';


const isDateBold = (data, day, month, year) => {

  for(let i = 0; i < data.length; i++) {
    const date = new Date(data[i].date)
    if(date.getDate() == day && date.getMonth() == month && date.getFullYear() == year) {
      return true
    }
  }
  return false
}

const CellRender = ({day, month, year, data}) => {

  const isBold = isDateBold(data, day, month, year)
  return (
    <span key={`${day}-${month}-${year}`} style={{fontWeight:isBold ? '800' : '400'}}>
      {day}
    </span>
  )
};

const CalendarView = () => {
  const { token } = theme.useToken();
  
  const wrapperStyle = {
    width: '100%',
    border: `2px solid ${token.colorBorder}`,
    borderRadius: token.borderRadiusLG,
  };

  const distinctDates = useGetDistinctDateLogs()
  const navigate = useNavigate()

  if(distinctDates.isLoading) {
    return (
      <div style={{margin:'auto'}}>
        <Spin size="large" />
      </div>
    )
  }
  
  if(distinctDates.isFetched) {
    return (
      <div style={wrapperStyle}>
        <Calendar
          fullCellRender={(cellValue) => (
            <CellRender
              day={cellValue.date()}
              month={cellValue.month()}
              year={cellValue.year()}
              data={distinctDates.data}
            />
          )}
          fullscreen={false}
          onSelect={(date, { source }) => {
            if (source === 'date') {
              const logDate = `${date.year()}-${date.month()+1}-${date.date()}`
              navigate(`/user-logs/date?date=${logDate}`)
            }
          }}
        />
      </div>
    );
  }
};

export default CalendarView;
