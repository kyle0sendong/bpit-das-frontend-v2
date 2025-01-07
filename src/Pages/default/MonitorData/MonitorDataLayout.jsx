import { Layout, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import Sidebar from "../../../Features/MonitorData/Sidebar"
const { Content } = Layout;

const MonitorDataLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (

    <Layout style={{borderRadius: borderRadiusLG }}>
      <Sidebar />
      <Layout style={{background: colorBgContainer, borderRadius: borderRadiusLG, margin:'6px' }}>
        <Content>
          <Outlet/>
        </Content>
      </Layout>
    </Layout>

  );
};

export default MonitorDataLayout;