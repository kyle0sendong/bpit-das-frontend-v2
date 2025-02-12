import { AnalyzerQueryType } from "@/types/analyzerData";

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
  useGetAllVirtualChannels: () => 'allVirtualChannels',
  useGetAnalyzerData: (params: AnalyzerQueryType) => `${params.from}-${params.to}-${params.analyzerType}${params.analyzer}`,
  useGetAllUsers: () => `allUsers`,
  useGetUserRoles: () => `allUserRoles`
}

export default queryKeys;