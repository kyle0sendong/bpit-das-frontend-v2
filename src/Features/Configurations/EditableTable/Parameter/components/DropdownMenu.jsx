import { Dropdown, Space, Typography } from "antd"
import { DownOutlined } from "@ant-design/icons"
import { DATA_FORMAT } from "../constants/dataFormat"
import { REQUEST_INTERVAL } from "../constants/requestInterval"
import { FUNCTION_CODE } from "../constants/functionCode"

const selectDropdownItems = (dataIndex) => {
  switch (dataIndex) {
    case 'request_interval':
      return REQUEST_INTERVAL
    case 'format':
      return DATA_FORMAT
    case 'function_code':
      return FUNCTION_CODE
  }
}

export const DropdownMenu = (props) => {
  const {dataIndex, save, inputRef, children} = props
  return (
    <Dropdown
      menu={{
        items:selectDropdownItems(dataIndex),
        selectable: true,
        defaultSelectedKeys: [children[1]],
        onClick: save,
        ref: inputRef
      }}
      trigger={['click']}
    >
      <Typography.Link>
        <Space>
          {dataIndex !== 'request_interval' ? children : 
            children[1] < 60 && dataIndex == 'request_interval' ? `${children[1]} sec`: `${children[1]/60} min`}

          <DownOutlined />
        </Space>
      </Typography.Link>
    </Dropdown>
    )
}