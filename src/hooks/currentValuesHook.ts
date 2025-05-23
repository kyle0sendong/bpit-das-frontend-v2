import { useQuery } from "@tanstack/react-query";
import queryKeys from "./_queryKeys";
import {
  getAllCurrentValues,
  getCurrentValuesByAnalyzerId
} from "@/api/currentValuesApi";

export const useGetAllCurrentValues = () => {
  return useQuery({
    queryKey: [queryKeys.useGetAllCurrentValues()],
    queryFn: getAllCurrentValues
  });
}

export const useGetCurrentValuesByAnalyzerId = (id: number, type: string) => {
  return useQuery({
    queryKey: [queryKeys.useGetCurrentValuesByAnalyzerId(id, type)],
    queryFn: () => getCurrentValuesByAnalyzerId(id, type),
    refetchInterval: 5000
  });
}
