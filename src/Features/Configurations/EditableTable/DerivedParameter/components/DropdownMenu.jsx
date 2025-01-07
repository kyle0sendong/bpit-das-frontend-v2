import { Dropdown, Space, Typography } from "antd"
import { DownOutlined } from "@ant-design/icons"

function getLabel(key, data) {
  const index = data.findIndex((item) => item.key == key)
  if (index >= 0) {
    return data[index].label
  } else {
    return ''
  }
}

export const DropdownMenu = (props) => {
  const {save, inputRef, dropdownData, children} = props
  return (
    <Dropdown
      menu={{
        items:dropdownData,
        selectable: true,
        defaultSelectedKeys: [children[1]],
        onClick: save,
        ref: inputRef
      }}
      trigger={['click']}
    >
      <Typography.Link>
        <Space>
          {getLabel(children[1], dropdownData)}
          <DownOutlined />
        </Space>
      </Typography.Link>
    </Dropdown>
    )
}