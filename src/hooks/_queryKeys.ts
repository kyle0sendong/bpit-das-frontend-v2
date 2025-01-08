const queryKeys = {

  useGetAllCurrentValues: () => 'allCurrentValues',
  useGetCurrentValuesByAnalyzerId: (id: number) => `currentValuesByAnalyzerId-${id}`,
  useGetAllParameters: () => 'allParameters',
  useGetParametersByAnalyzerId: (id: number) => `parameterByAnalyzerId-${id}`,
  useGetAllSites: () => 'allSites',
  useGetAllTcpAnalyzers: () => 'allTcpAnalyzers',
  useGetTcpAnalyzerById: (id: number) => `tcpAnalyzerId-${id}`,
  useGetAllTimebases: () => 'allTimebases',
  useGetUserLogsByDate: (from: string, to: string) => `userLogFrom-${from}-${to}`,
  useGetLogDistinctDates: () => 'allDistinctDates',
  useGetAllVirtualChannels: () => 'allVirtualChannels'
  
}

export default queryKeys;