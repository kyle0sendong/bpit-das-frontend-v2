import { Layout, theme } from 'antd';
import Footer from '../../Features/DefaultLayout/Footer'
import Header from '../../Features/DefaultLayout/Header';
import { Outlet } from 'react-router-dom';

const { Content } = Layout;

const DefaultLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Header/>

      <Content style={{ padding: '0 48px' }}>
        <Layout
          style={{ padding: '24px 0', background: colorBgContainer, borderRadius: borderRadiusLG }}
        >
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            <Outlet/>
          </Content>
        </Layout>
      </Content>
      
      <Footer />
    </Layout>
  );
};

export default DefaultLayout;