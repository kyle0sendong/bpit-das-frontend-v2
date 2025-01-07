import { Spin } from "antd"
import DataTable from "../../../Features/MonitorData/Table"

import { useParams } from "react-router-dom";
import { useGetAnalyzers, useGetAllTimebase, useGetParameters, useGetDerivedParameters, useGetCurrentValuesTcp } from "../../../Hooks/useFetchData";

export default function MonitorPage() { 

  const {analyzer_id} = useParams()
  const analyzers = useGetAnalyzers(analyzer_id)
  const timebases = useGetAllTimebase()
  const parameters = useGetParameters(analyzer_id)
  const derivedParameters = useGetDerivedParameters(analyzer_id)
  const currentValues = useGetCurrentValuesTcp(analyzer_id)

  if(analyzers.isLoading && timebases.isLoading && parameters.isLoading && derivedParameters.isLoading && currentValues.isLoading) {
    return (
      <div style={{margin:'auto'}}>
        <Spin size="large"/>
      </div>
    )
  }

  if(analyzers.isFetched && timebases.isFetched && parameters.isFetched && derivedParameters.isFetched && currentValues.isFetched){

    const timebaseData = timebases.data.filter( (timebase) => timebase.enable == 1)
    return (
      <div>
        <DataTable data=
          {{
            'analyzer':analyzers.data[0], 
            'timebases':timebaseData,
            'parameters': parameters.data,
            'derivedParameters': derivedParameters.data,
            'currentValues': currentValues.data
          }}
        />
      </div>
    )
  }
}
