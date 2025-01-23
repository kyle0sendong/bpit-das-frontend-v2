import { useQuery } from "@tanstack/react-query";
import { getAnalyzerData } from "@/api/analyzerDataApi";
import { AnalyzerQueryType } from "@/types/analyzerData";

import queryKeys from "./_queryKeys";

export const useGetAnalyzerData = (params: AnalyzerQueryType) => {
  return useQuery({
    queryKey: [queryKeys.useGetAnalyzerData(params)],
    queryFn: () => getAnalyzerData(params),
    enabled: params.analyzer != '0'
  })
}