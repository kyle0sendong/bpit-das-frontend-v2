import { useQuery, useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import queryKeys from "./_queryKeys";
import {
  getAllStations,
  updateStations
} from "@/api/stationsApi";

export const useGetAllStations = () => {
  return useQuery({
    queryKey: [queryKeys.useGetAllStations()],
    queryFn: getAllStations
  })
}

export const useUpdateStations = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateStations,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [queryKeys.useGetAllStations()]})
    }
  })
}