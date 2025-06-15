import { AnalyzerQueryType } from "@/types/analyzerData";

const queryKeys = {

  useGetAllCurrentValues: () => 'allCurrentValues',
  useGetCurrentValuesByAnalyzerId: (id: number, type: string) => `currentValuesByAnalyzerId-${type}${id}`,
  useGetAllTcpParameters: () => 'allTcpParameters',
  useGetTcpParametersByAnalyzerId: (id: number) => `tcpParameterByAnalyzerId-${id}`,
  useGetSerialPorts: () => 'allSerialPorts',
  useGetAllSerialParameters: () => 'allSerialParameters',
  useGetSerialParametersByAnalyzerId: (id: number) => `serialParameterByAnalyzerId-${id}`,
  useGetAllStations: () => 'allStations',
  useGetAllTcpAnalyzers: () => 'allTcpAnalyzers',
  useGetTcpAnalyzerById: (id: number) => `tcpAnalyzerId-${id}`,
  useGetAllSerialAnalyzers: () => 'allSerialAnalyzers',
  useGetSerialAnalyzerById: (id: number) => `serialAnalyzerId-${id}`,
  useGetAllTimebases: () => 'allTimebases',
  useGetUserLogsByDate: (from: string, to: string) => `userLogFrom-${from}-${to}`,
  useGetLogDistinctDates: () => 'allDistinctDates',
  useGetAllVirtualChannels: () => 'allVirtualChannels',
  useGetAnalyzerData: (params: AnalyzerQueryType) => `${params.from}-${params.to}-${params.analyzerType}${params.analyzer}-timebase${params.timebase}`,
  useGetAllUsers: () => `allUsers`,
  useGetUserRoles: () => `allUserRoles`
}

export default queryKeys;