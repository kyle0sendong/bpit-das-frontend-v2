import { Button, Dropdown } from 'antd'
import { useContext } from 'react';
import { SearchFilterContext } from '../../../../Contexts/SearchFilterContext';

const DropdownTimebase = () => {

  const { searchFilter, setSearchFilter } = useContext(SearchFilterContext)

  const getItems = (items) => {
    return items.map( (item) => {
        return {
          'key': `${item.timebase}`,
          'label': `${item.timebase}`
        };
    })
  }

  const onClick = (info) => {
    setSearchFilter(
      prevState => ({...prevState, timebase: info.key, table: `data_t${info.key}`})
    )
  }

  return (
    <Dropdown
      menu={{
        items: getItems(searchFilter.timebaseData),
        onClick: onClick
      }}
    >
      <Button> Timebase: {searchFilter.timebase} </Button>
    </Dropdown>
  )
}

export default DropdownTimebase;