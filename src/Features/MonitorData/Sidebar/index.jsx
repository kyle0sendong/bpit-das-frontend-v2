import { Menu, Layout, theme} from 'antd';
import SidebarItems from './components/SidebarItems';
import { useNavigate } from 'react-router-dom';
import { useGetAllAnalyzers } from '../../../Hooks/useFetchData';

const Sidebar = () => {
  const {Sider} = Layout
  const {
    token: { colorBgContainer, borderRadiusLG},
  } = theme.useToken();

  const navigate = useNavigate()
  const analyzers = useGetAllAnalyzers()

  const onClick = (e) => {
    console.log('click ', e);
  };

  if( analyzers.isFetched) {
    return (
      <Sider style={{ background: colorBgContainer, borderRadius: borderRadiusLG, margin:'6px' }} width={200}>
        <Menu
          onClick={onClick}
          defaultOpenKeys={['tcpAnalyzers', 'otherAnalyzers']}
          mode="inline"
          items={SidebarItems(analyzers.data, null, navigate)}
        />
      </Sider>

    );
  }

};
export default Sidebar;