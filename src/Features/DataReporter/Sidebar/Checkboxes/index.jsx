import { Checkbox, Col } from 'antd';
import { useGetAllDerivedParameters, useGetAllParameters } from '../../../../Hooks/useFetchData';
import { useState } from 'react';

import { useContext } from 'react';
import { SearchFilterContext } from '../../../../Contexts/SearchFilterContext';

const CheckboxGroup = Checkbox.Group;

const ParameterCheckbox = () => {

  const { searchFilter, setSearchFilter } = useContext(SearchFilterContext)
  const [checkedList, setCheckedList] = useState(searchFilter.parameters);
  const getParameterOptions = (items) => {
    const options = []
    items.forEach( (item) => {
      options.push(item.name)
    })
    return options
  }

  const parameters = useGetAllParameters()
  const derivedParameters = useGetAllDerivedParameters()

  if(parameters.isFetched && derivedParameters.isFetched) {
    const parameterOptions = getParameterOptions(parameters.data)
    const derivedParameterOptions = getParameterOptions(derivedParameters.data)
    const options = [...parameterOptions, ...derivedParameterOptions]
    const checkAll = options.length === checkedList.length;
    const indeterminate = checkedList.length > 0 && checkedList.length < options.length;

    const onChange = (list) => {
      setCheckedList(list);
      setSearchFilter(
        prevState => ({...prevState, parameters: list})
      )
    };
  
    const onCheckAllChange = (e) => {
      const list = e.target.checked ? options : []
      setCheckedList(list);
      setSearchFilter(
        prevState => ({...prevState, parameters:list})
      )
    };
  
    return (
      <>        
        <div style={{marginBlockStart:'14px'}}>
          <div style={{margin:'auto', width:'50%'}}>
            <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
              Check all
            </Checkbox>
          </div>
        </div>

        <div>
          <Col span={24} style={{margin:'1rem'}}>
            <CheckboxGroup options={options} value={checkedList} onChange={onChange}/>
          </Col>
        </div>
      </>
    );
  }

};
export default ParameterCheckbox;