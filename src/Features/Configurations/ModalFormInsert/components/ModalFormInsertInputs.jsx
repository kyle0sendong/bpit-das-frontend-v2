import { useState } from "react";
import { Form, Dropdown, Typography, Space, Input, InputNumber} from "antd";
import { DownOutlined } from '@ant-design/icons';

import { SAMPLING_ITEM } from "../../../../Shared/constants/samplingItems";

export default function ModalFormInsertInputs(props) {
  const { inputs, form, inputType } = props
  const [displaySampling, setDisplaySampling] = useState("100%")

  const dropdownInput = () => {

    const saveDropdown = (item) => {
      setDisplaySampling(`${item.key}%`)
      form.setFieldsValue({
          sampling: item.key
        }
      )
    }
  
    return (
      <Dropdown
        menu={{
          items:SAMPLING_ITEM,
          selectable: true,
          defaultSelectedKeys: '100',
          onClick: saveDropdown
        }}
        trigger={['click']}
      >
        <Typography.Link>
          <Space>
            {displaySampling}
            <DownOutlined />
          </Space>
        </Typography.Link>
      </Dropdown>
    )
  }

  const textInput = () => {
    return (
      inputType == 'input' && <Input/>
    )
  }

  const numberInput = () => {
    return (
      inputType == 'inputNumber' && <InputNumber min={1} max={10}/>
    )
  }

  return (
    inputs.map( (value)=> {

      const name = inputType == 'inputNumber' ? 'inputNumber' : value.name
      const isRequired = value.name == 'sampling' ? false : true

      return (
        <Form.Item
          id={`${value.name}Insert`}
          key={`${value.name}Insert`}
          label={value.label}
          name={name}
          rules={[{ required: isRequired }]}
        >
          {value.name == 'sampling' && dropdownInput()}
          {inputType == 'input' && value.name != 'sampling' && textInput()}
          {inputType == 'inputNumber' && numberInput()}
        </Form.Item>
        )
      
    })
  )
}
