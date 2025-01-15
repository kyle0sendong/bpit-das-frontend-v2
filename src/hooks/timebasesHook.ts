import { useQuery, useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import queryKeys from "./_queryKeys";
import {
  getAllTimebases,
  insertTimebases,
  updateTimebases,
  deleteTimebases
} from "@/api/timebasesApi";

export const useGetAllTimebases = () => {
  return useQuery({
    queryKey: [queryKeys.useGetAllTimebases()],
    queryFn: getAllTimebases
  })
}

export const useInsertTimebases = () => {
  
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: insertTimebases,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [queryKeys.useGetAllTimebases()]})
    }
  })
}

export const useUpdateTimebases = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTimebases,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [queryKeys.useGetAllTimebases()]})
    }
  })
}

export const useDeleteTimebases = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTimebases,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [queryKeys.useGetAllTimebases()]})
    }
  })
}