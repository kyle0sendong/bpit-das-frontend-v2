import { Divider } from 'antd';

import ParameterCheckbox from './Checkboxes';
import DateRangePicker from './DateRangePicker';
import DropdownTimebase from './Dropdowns';
import Buttons from './Buttons';
import { Layout, theme } from 'antd';

const Sidebar = ({timebaseData}) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const {Sider} = Layout
  return (

    <Sider style={{ background: colorBgContainer, borderRadius: borderRadiusLG, margin:'6px' }} width={'20%'}>
      <div style={{margin:'0.5rem', textAlign:'center'}}>
        <Divider style={{marginBlock:'2%', fontSize:"14px"}}>
          Views
        </Divider>
        <Buttons />
      </div>

      <div style={{margin:'0.5rem', textAlign:'center'}}>
        <Divider style={{marginBlock:'2%', fontSize:"14px"}}>Dates</Divider>
        <DateRangePicker />
      </div>

      <div style={{margin:'0.5rem', textAlign:'center'}}>
        <Divider style={{marginBlock:'2%', fontSize:"14px"}}>Timebase</Divider>
        <DropdownTimebase timebaseData={timebaseData}/>
      </div>

      <div style={{margin:'0.5rem', textAlign:'center'}}>
        <Divider style={{marginBlock:'2%', fontSize:"14px"}}>
          Select Parameters
        </Divider>
        <ParameterCheckbox />
      </div>
    </Sider>
  )
}

export default Sidebar;