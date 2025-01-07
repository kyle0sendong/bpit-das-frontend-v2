import { Layout, Menu, theme, Divider } from "antd";

import SidebarItems from "./components/SidebarItems";
import { Button } from "antd"
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useGetAllAnalyzers, useGetAllTimebase, useGetSites} from "../../../Hooks/useFetchData";
import ModalFormInsert from "../ModalFormInsert"

import { ANALYZER_FORM_INPUTS } from "../../../Shared/constants/analyzerFormInputs";

export default function Sidebar() {

  const navigate = useNavigate()
  const queryClient = useQueryClient()
  
  // Initialize Ant Design layout for sidebar
  const {Sider} = Layout
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  
  // Gather all necessary data from database to display in the sidebar

  const timebase = useGetAllTimebase()
  const site = useGetSites()
  const analyzer = useGetAllAnalyzers()

  // use link to navigate to specific tcp config, pass its data as props
  if(analyzer.isFetched && site.isFetched && timebase.isFetched) {
    const analyzerData = analyzer.data
    const siteData = site.data
    const timebaseData = timebase.data

    return(
      <>
        <Sider style={{ background: colorBgContainer, borderRadius: borderRadiusLG, margin:'6px' }} width={200}>

          <Divider>
            <Button
              type="dashed"
                style={{
                  cursor:'pointer',
                  textAlign:'center',
                  fontWeight:'700',
                  maxWidth:'100%',
                  marginInline:'auto'
                }}
              onClick={()=>navigate('home')}
            >
              <p style={{textOverflow:'ellipsis', maxWidth:'140px', overflow:'hidden'}}>{siteData[0].name} Station</p>
            </Button>
          </Divider>

          <Divider
            style={{
              cursor:'pointer',
              textAlign:'center',
              fontWeight:'700'}}
          >
            <ModalFormInsert
              text={'TCP/IP Analyzers +'}
              inputs={ANALYZER_FORM_INPUTS}
              data={{'timebase':timebaseData}}
              inputType={'input'}
              buttonStyle={{
                cursor:'pointer',
                textAlign:'center',
                fontWeight:'700'
              }}
            />
          </Divider>

          <Menu
            mode="inline"
            style={{ height: 'auto' }}
            items={SidebarItems(analyzerData, navigate, queryClient)}
          />
        </Sider>
      </>
    )
  }
}



