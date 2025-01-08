import { useQuery, useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import queryKeys from "./_queryKeys";
import {
  getAllTimebases,
  insertTimebases,
  updateTimebases,
  deleteTimebases
} from "@/api/timebasesApi";

const queryClient = useQueryClient();

export const useGetAllTimebases = () => {
  return useQuery({
    queryKey: [queryKeys.useGetAllTimebases()],
    queryFn: getAllTimebases
  })
}

export const useInsertTimebases = () => {
  return useMutation({
    mutationFn: insertTimebases,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [queryKeys.useGetAllTimebases()]})
    }
  })
}

export const useUpdateTimebases = () => {
  return useMutation({
    mutationFn: updateTimebases,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [queryKeys.useGetAllTimebases()]})
    }
  })
}

export const useDeleteTimebases = () => {
  return useMutation({
    mutationFn: deleteTimebases,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [queryKeys.useGetAllTimebases()]})
    }
  })
}