import { useState } from 'react';
import { Checkbox, Divider, Flex } from 'antd';

const CheckboxGroup = Checkbox.Group;

const extractArray = (items) => {
  const array = []
  items.map( (item) => {
    array.push(item.name)
  })
  return array.sort((a, b) => a.toLowerCase() < b.toLowerCase() ? -1 : 1) // reference at bottom. 
}
const ParameterCheckbox = (props) => {

  const { data } = props
    
  const filteredParameter = data.parameters.filter(parameter => parameter.enable == 1)
  const checkList = extractArray(filteredParameter)
  const [checkedList, setCheckedList] = useState(checkList);

  const checkAll = checkList.length === checkedList.length;
  const indeterminate = checkList.length > 0 && checkedList.length < checkList.length;

  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? checkList : []);
  };

  console.log(checkedList)
  return (
    <div style={{width:'20vw'}}>
      <div style={{textAlign:"center", fontSize:"1.3em", fontWeight:"700"}}>
        Parameters
      </div>
      <Divider/>
      <CheckboxGroup options={checkList} value={checkedList} onChange={list => setCheckedList(list)} />
      <Divider/>
      
      <Flex style={{justifyContent:'flex-end'}}>
        <div>
          <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
            Check all
          </Checkbox>
        </div>
      </Flex>
      
    </div>
  );
};
export default ParameterCheckbox;