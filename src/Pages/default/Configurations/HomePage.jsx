import { Flex, Spin, Divider } from "antd"
import InputForm from "../../../Features/Configurations/InputForm"
import { useGetAllTimebase, useGetSites, useGetAllParameters, useGetAllDerivedParameters } from "../../../Hooks/useFetchData";
import Statistics from "../../../Features/Configurations/Statistics";

export default function HomePage() {
  console.log(import.meta.env.BASE_URL)
  const timebase = useGetAllTimebase()
  const site = useGetSites()
  const parameters = useGetAllParameters()
  const derivedParameters = useGetAllDerivedParameters()

  if(timebase.isLoading || site.isLoading || parameters.isLoading || derivedParameters.isLoading) {
    return (
      <div style={{margin:'auto'}}>
        <Spin size="large" />
      </div>
    )
  }

  if(timebase.isFetched && site.isFetched && parameters.isFetched && derivedParameters.isFetched) {
    const timebaseData = timebase.data
    const siteData = site.data

    return (
      <Flex>
        <div style={{height:'100%', width:'55%', paddingInline:'1rem', borderRightWidth:'1px'}}>
          <Divider>Edit Station</Divider>
          <div style={{margin:'1rem', minWidth:"400px"}}>
            <InputForm
              data={{
                'timebase':timebaseData,
                'site':siteData,
                'parameterData': parameters.data,
                'derivedParameterData': derivedParameters.data
              }}
            />
          </div>
        </div>
        
        <div style={{paddingInline:'1rem'}}>
          <Divider>Statistics</Divider>
          <div>
            <Statistics />
          </div>
        </div>

      </Flex>
    )
  }

}