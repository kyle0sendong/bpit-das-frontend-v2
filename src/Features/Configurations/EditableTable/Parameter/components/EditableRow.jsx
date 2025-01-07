import { CheckOutlined, CloseOutlined} from '@ant-design/icons';
import { Form, Input, Switch, Button, Popconfirm} from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';

import { removeUndefined } from '../../../../../Utils/removeUndefined'
import { DropdownMenu } from './DropdownMenu';

const EditableContext = React.createContext(null);

export const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

export const EditableCell = ({
                        title,
                        inputType,
                        children,
                        dataIndex,
                        record,
                        handleSave,
                        handleDelete,
                        ...restProps}) => {

  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);
 
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const deleteRow = async() => {
    try {
      handleDelete({...record})
    } catch (error) {
      console.log('Delete failed', error)
    }
  }

  const saveRow = async(key) => {
    try {

      let values = null
      switch(inputType) {
        case 'switch':
          form.setFieldsValue({
            [dataIndex]: key
          });
          values = await form.validateFields();
          break
        case 'dropdown':
          form.setFieldsValue({
            [dataIndex]: key.key
          });
          values = await form.validateFields();
          break
        case 'text':
          values = await form.validateFields();
          toggleEdit()
          break
      }
      values = removeUndefined(values)
      handleSave({...record, ...values});
    } catch (error) {
      console.log('Save failed', error)
    }
  }

  const confirm = () => {
    deleteRow()
  }

  let childNode = children;
  const childValue = {...children}
  const formItemStyle = {textAlign:'center', margin:'auto'}
  switch(inputType) {
    case 'text':
      childNode = editing ? 
        <Form.Item
          style={formItemStyle}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            }
          ]}
        >
          <Input ref={inputRef} onPressEnter={saveRow} onBlur={saveRow}/>
        </Form.Item>
      :
        <div
          className="editable-cell-value-wrap"
          style={{ paddingRight: 20, }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      break
    case 'switch':
      childNode =
        <Form.Item
          style={formItemStyle}
          name={dataIndex}
          valuePropName="checked"
        >
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            defaultChecked={childValue[1]}
            onChange={saveRow}
            ref= {inputRef}
          />
        </Form.Item>
      break
    case 'dropdown':
      childNode =
        <Form.Item
          style={formItemStyle}
          name={dataIndex}
        >
          <DropdownMenu dataIndex={dataIndex} save={saveRow} inputRef={inputRef}>
            {children}
          </DropdownMenu>
        </Form.Item>
      break
    case 'delete':
      childNode =
        <Form.Item
          style={formItemStyle}
          name={dataIndex}
        >
          <Popconfirm
            title="Delete Row"
            description="Confirm Deletion"
            onConfirm={confirm}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>
              Delete
            </Button>
          </Popconfirm>
        </Form.Item>
  }

  return <td {...restProps}>{childNode}</td>;
};
