import { useQuery, useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import queryKeys from "./_queryKeys";
import {
  getAllParameters,
  getParametersByAnalyzerId,
  insertParameter,
  updateParameter,
  deleteParameter
} from "@/api/parametersApi";

export const useGetAllParameters = () => {
  return useQuery({
    queryKey: [queryKeys.useGetAllParameters()],
    queryFn: getAllParameters
  });
}

export const useGetParametersByAnalyzerId = (id: number) => {
  return useQuery({
    queryKey: [queryKeys.useGetParametersByAnalyzerId(id)],
    queryFn: () => getParametersByAnalyzerId(id)
  });
}

export const useInsertParameter = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: insertParameter,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [queryKeys.useGetAllParameters()]})
    }
  });
}

export const useUpdateParameter = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateParameter,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [queryKeys.useGetAllParameters()]})
    }
  });
}

export const useDeleteParameter = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteParameter,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [queryKeys.useGetAllParameters()]})
    }
  });
}
