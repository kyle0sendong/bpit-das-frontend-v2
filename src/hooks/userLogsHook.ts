import { useQuery } from "@tanstack/react-query";
import queryKeys from "./_queryKeys";
import {
  getUserLogsByDate,
  getLogDistinctDates
} from "@/api/userLogsApi";

export const useGetUserLogsByDate = (from: string, to: string) => {
  return useQuery({
    queryKey: [queryKeys.useGetUserLogsByDate(from, to)],
    queryFn: () => getUserLogsByDate(from, to)
  })
}

export const useGetLogDistinctDates = () => {
  return useQuery({
    queryKey: [queryKeys.useGetLogDistinctDates()],
    queryFn: getLogDistinctDates
  })
}