import { Button } from "antd"
import { useContext } from 'react';
import { SearchFilterContext } from '../../../../Contexts/SearchFilterContext';
import { useNavigate } from "react-router-dom";

const Buttons = () => {

  const { searchFilter, setSearchFilter } = useContext(SearchFilterContext)
  const navigate = useNavigate()

  const disableButton = () => {
    if(searchFilter.parameters.length == 0 || searchFilter.startDate == '' || searchFilter.endDate == '') {
      return true
    }
    return false
  }

  return (
    <div>
      <div style={{margin:'0.5rem', textAlign:'center'}}>
        <Button
          style={{backgroundColor: searchFilter.viewType=='table' && '#bde0fe'}}
          onClick={ () => {
              navigate('/data-reporter/view?view=table')
              setSearchFilter(
                prevState => ({...prevState, viewType:'table'})
              )
            }
          }
          disabled={disableButton()}
        >
          Show Table View
        </Button>
      </div>
      <div style={{margin:'0.5rem', textAlign:'center'}}>
        <Button
          style={{backgroundColor: searchFilter.viewType=='graph' && '#bde0fe'}}
          onClick={ () => {
              navigate('/data-reporter/view?view=graph')
              setSearchFilter(
                prevState => ({...prevState, viewType:'graph'})
              )
            }
          }
          disabled={disableButton()}
        >
          Show Graph View
        </Button>
      </div>
    </div>
  )
}

export default Buttons;