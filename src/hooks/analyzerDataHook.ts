import { useQuery } from "@tanstack/react-query";
import { getAnalyzerData, getVirtualChannelsData } from "@/api/analyzerDataApi";
import { AnalyzerQueryType } from "@/types/analyzerData";

import queryKeys from "./_queryKeys";

export const useGetAnalyzerData = (params: AnalyzerQueryType) => {
  return useQuery({
    queryKey: [queryKeys.useGetAnalyzerData(params)],
    queryFn: () => getAnalyzerData(params),
    enabled: params.analyzer != '0'
  })
}

export const useGetVirtualChannelsData = (params: AnalyzerQueryType) => {
  return useQuery({
    queryKey: [queryKeys.useGetAnalyzerData(params)],
    queryFn: () => getVirtualChannelsData(params),
    enabled: params.analyzer != '0'
  })
}