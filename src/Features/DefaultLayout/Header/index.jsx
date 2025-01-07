import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { navigationItems } from "./constants/navigationItems";

export default function Header() {
  const [currentItem, setCurrentItem] = useState(window.location.pathname)

	const {Header} = Layout;
  const navigate = useNavigate()

  const onClick = (item) => {
    navigate(item.key)
    setCurrentItem(item.key)
  }

  return (
		<>
			<Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          selectedKeys={[currentItem]}
          mode="horizontal"
          items={navigationItems}
          style={{ flex: 1, minWidth: 0 }}
          onClick={onClick}
        />
      </Header>
		</>
	)
}