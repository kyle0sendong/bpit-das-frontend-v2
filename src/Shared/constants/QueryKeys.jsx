const QueryKeys = {
  parameters: (id) => `parameter${id}`,
  currentValues:(id) => `currentValues${id}`,
  tcpDataRange: (queryKeyData) => {
    const queryKey = `${queryKeyData.table}${queryKeyData.startDate}${queryKeyData.endDate}`
    return `tcpDataRange${queryKey}`
  },
  allParameters: () => 'allParameters',
  derivedParameters: (id) => `derivedParameter${id}`,
  allDerivedParameters: () => `derivedParameters`,
  tcpAnalyzer: (id) => `analyzer${id}`,
  allTcpAnalyzers: () => 'analyzerData',
  sites: () => 'siteData',
  timebases: () => 'timebaseData',
  userLogs: (dateTime) => `userLogs${dateTime}`
}

export default QueryKeys