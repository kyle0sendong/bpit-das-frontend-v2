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

export const useGetCurrentValuesByAnalyzerId = (id: number) => {
  return useQuery({
    queryKey: [queryKeys.useGetCurrentValuesByAnalyzerId(id)],
    queryFn: () => getCurrentValuesByAnalyzerId(id)
  });
}
