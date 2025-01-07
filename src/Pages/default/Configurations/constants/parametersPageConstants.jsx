export const getAnalyzerDescription = (analyzerData) =>{
  return (
    [
      {
        key: 'ipAddress',
        label: 'IP Address',
        children: analyzerData[0].host_address
      },
      {
        key: 'deviceAddress',
        label: 'Device Address',
        children: analyzerData[0].device_address
      },
      {
        key: 'port',
        label: 'Port',
        children: analyzerData[0].port
      },
      {
        key: 'sampling',
        label: 'Data Threshold',
        children: `${analyzerData[0].sampling}%`
      }
    ]
  )
}

export const PARAMETER_INSERT = [
  {
    label: 'Parameter Amount',
    name: 'Parameter Amount'
  }
]

export const DERIVED_PARAMETER_INSERT = [
  {
    label: 'Virtual Channel Amount',
    name: 'Virtual Channel Amount'
  }
]