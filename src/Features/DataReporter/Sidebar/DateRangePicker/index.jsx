import { DatePicker, Divider, Flex} from 'antd';
import { useContext } from 'react';
import { SearchFilterContext } from '../../../../Contexts/SearchFilterContext';

const { RangePicker } = DatePicker;

const DateRangePicker = () => {
  const { setSearchFilter } = useContext(SearchFilterContext)
  const handleChange = (date) => {
    const start_date = `${date[0].$y}-${(date[0].$M)+1}-${date[0].$D}`
    const end_date = `${date[1].$y}-${(date[1].$M)+1}-${date[1].$D} 23:59:59`

    setSearchFilter(
      prevState => ({...prevState, startDate: start_date, endDate: end_date})
    )
  };
  
  return (
    <Flex justify="center" vertical>
      <RangePicker style={{width:'100%', borderWidth:'2px', marginBlock:'2%'}} onChange={handleChange}/>
      <Divider style={{marginBlock:'2%', fontSize:"14px"}} plain></Divider>

    </Flex>
  )
};

export default DateRangePicker;


  // const handleMonthly = (date) => {
  //   const start_date = `${date[0].$y}-${(date[0].$M)+1}-1`
  //   const end_date = `${date[1].$y}-${(date[1].$M)+1}-1`

  //   setSearchFilter(
  //     prevState => ({...prevState, startDate: start_date, endDate: end_date})
  //   )
  // }
  // <RangePicker style={{width:'100%', borderWidth:'2px', marginBlock:'2%'}} picker="month" onChange={handleMonthly}/>
  // <Divider style={{marginBlock:'2%'}}/>