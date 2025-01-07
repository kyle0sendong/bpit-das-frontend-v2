import { Layout, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import { SearchFilterContextProvider } from '../../../Contexts/SearchFilterContext'
import Sidebar from '../../../Features/DataReporter/Sidebar';
const { Content } = Layout;

const DataReporterLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <SearchFilterContextProvider>
      <Layout style={{borderRadius: borderRadiusLG }}>
        <Sidebar />
        <Layout style={{background: colorBgContainer, borderRadius: borderRadiusLG, margin:'6px' }}>
          <Content>
            <Outlet/>
          </Content>
        </Layout>
      </Layout>
    </SearchFilterContextProvider>
  );
};

export default DataReporterLayout;