import { DatePicker, Divider, Flex} from 'antd';
import { useNavigate } from 'react-router-dom';
const { RangePicker } = DatePicker;

const DateRangePicker = () => {

  const navigate = useNavigate()

  const handleChange = (date) => {
    const start_date = `${date[0].$y}-${(date[0].$M)+1}-${date[0].$D}`
    const end_date = `${date[1].$y}-${(date[1].$M)+1}-${date[1].$D}`
    navigate(`/user-logs/date?start_date=${start_date}&end_date=${end_date}`)
  };

  const handleMonthly = (date) => {
    const start_date = `${date[0].$y}-${(date[0].$M)+1}-1`
    const end_date = `${date[1].$y}-${(date[1].$M)+1}-1`
    navigate(`/user-logs/date?start_date=${start_date}&end_date=${end_date}`)
  }
  
  return (
    <Flex justify="center" vertical>
      <RangePicker style={{width:'100%', borderWidth:'2px', marginBlock:'2%'}} onChange={handleChange}/>
      <Divider style={{marginBlock:'2%'}}/>
      <RangePicker style={{width:'100%', borderWidth:'2px', marginBlock:'2%'}} picker="month" onChange={handleMonthly}/>
      <Divider style={{marginBlock:'2%'}}/>
    </Flex>

  )
};
export default DateRangePicker;