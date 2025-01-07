import { Layout, theme } from 'antd';
import Sidebar from '../../../Features/Configurations/Sidebar'
import { Outlet } from 'react-router-dom';

const { Content } = Layout;

const ConfigurationsLayout = () => {
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

export default ConfigurationsLayout;