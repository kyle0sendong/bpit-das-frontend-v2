import {  useContext, useEffect } from "react";
import Tables from "../../../Features/DataReporter/Tables";
import { SearchFilterContext } from "../../../Contexts/SearchFilterContext";
import { useGetAllTimebase, useGetTcpData } from "../../../Hooks/useFetchData";
import { Spin, Flex } from "antd";

export default function DataReporterPage() {

  const { searchFilter, setSearchFilter } = useContext(SearchFilterContext)

  const tcpData = useGetTcpData({...searchFilter})
  const timebases = useGetAllTimebase()

  useEffect( () => {
    if(timebases.isFetched) {
      const timebaseData = timebases.data.filter((item) => item.enable==1)
      timebaseData.sort((a, b) => a.timebase - b.timebase)
        setSearchFilter(
        prevState => ({...prevState, timebaseData: timebaseData})
      )
    }
  }, [timebases.isFetched])

  if (timebases.isLoading && tcpData.isLoading) {
    return (
      <div style={{margin:'auto'}}>
        <Spin size="large"/>
      </div>
    )
  }
  
  if (timebases.isFetched && tcpData.isFetched) {
    // add key to each data
    tcpData.data.map( (data) => {
      data.key = `${searchFilter.table}${data.datetime}`
    })

    const isParameterSelected = searchFilter.parameters.length > 0
    const isDateSelected = searchFilter.startDate != ''
    const isTableView = searchFilter.viewType == 'table'
    const isGraphView = searchFilter.viewType == 'graph'

    return (
      <Flex justify="space-between">

        <div style={{width:'100%'}}>
          <div>
            {
              !isParameterSelected && 
              <div>
                Please select a parameter
              </div>
            }
            {
              !isDateSelected &&
              <div>
                Please select a date range
              </div>
            }
            {
              isParameterSelected && isDateSelected && !isTableView && !isGraphView &&
              <div>
                Please select a view
              </div>
            }
            {
              isParameterSelected && isDateSelected && isTableView &&
              <div style={{margin:'1rem'}}>
                <Tables tcpData={tcpData.data}/>
              </div>
            }
            {
              isParameterSelected && isDateSelected && isGraphView &&
              <div>
                Graph view
              </div>
            }
          </div>

        </div>
      </Flex>
    )
  }
  




}
