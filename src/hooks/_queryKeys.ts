const queryKeys = {

  useGetAllCurrentValues: () => 'allCurrentValues',
  useGetCurrentValuesByAnalyzerId: (id: number) => `currentValuesByAnalyzerId-${id}`,
  useGetAllTcpParameters: () => 'allParameters',
  useGetTcpParametersByAnalyzerId: (id: number) => `parameterByAnalyzerId-${id}`,
  useGetAllStations: () => 'allStations',
  useGetAllTcpAnalyzers: () => 'allTcpAnalyzers',
  useGetTcpAnalyzerById: (id: number) => `tcpAnalyzerId-${id}`,
  useGetAllTimebases: () => 'allTimebases',
  useGetUserLogsByDate: (from: string, to: string) => `userLogFrom-${from}-${to}`,
  useGetLogDistinctDates: () => 'allDistinctDates',
  useGetAllVirtualChannels: () => 'allVirtualChannels'
  
}

export default queryKeys;