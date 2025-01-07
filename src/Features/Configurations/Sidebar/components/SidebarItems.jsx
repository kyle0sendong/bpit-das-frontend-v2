import React from "react";
import {UserOutlined} from '@ant-design/icons'

export default function SidebarItems(itemList, navigate, queryClient) {
  return (
    itemList.map(
      (key) => {
        return {
          key: `${key.name}`,
          icon: React.createElement(UserOutlined),
          label: `${key.name}`,
          onClick: ()=> {
            queryClient.invalidateQueries(`site`)
            navigate(`parameters/${key.id}`)
          }
        };
      },
    ) 
  )
}