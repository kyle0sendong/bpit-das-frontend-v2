import { Form, Dropdown, Typography, Space, Input} from "antd";
import { DownOutlined } from '@ant-design/icons';
import { useState } from "react";

import { ANALYZER_FORM_INPUTS } from '../../../../Shared/constants/analyzerFormInputs'
import { SAMPLING_ITEM } from '../../../../Shared/constants/samplingItems'

export default function ModalFormUpdateInputs(props) {
  const {sampling, data, form} = props
  const [displaySampling, setDisplaySampling] = useState(sampling)

  const dropdownInput = () => {

    const saveDropdown = (item) => {
      setDisplaySampling(item.key)
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
          defaultSelectedKeys: sampling.toString(),
          onClick: saveDropdown
        }}
        trigger={['click']}
      >
        <Typography.Link>
          <Space style={{margin:'auto'}}>
            {`${displaySampling}%`}
            <DownOutlined />
          </Space>
        </Typography.Link>
      </Dropdown>
    )
  }

  const textInput = (placeholder) => {
    return (
      <Input placeholder={placeholder}/>
    )
  }

  return (
    ANALYZER_FORM_INPUTS.map( (value)=> {

      return (
        <Form.Item
          id={`${value.name}Update`}
          key={`${value.name}Update`}
          label={value.label}
          name={value.name}
        >
          {
            value.name == 'sampling' ?
              dropdownInput()
            :
              textInput(data[value.name])
          }
        </Form.Item>
      ) 
      
    })
  )
 
}