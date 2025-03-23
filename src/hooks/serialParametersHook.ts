import { useQuery, useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import queryKeys from "./_queryKeys";

import {
  getAllSerialParameters,
  getSerialParametersByAnalyzerId,
  insertSerialParameter,
  updateSerialParameter,
  deleteSerialParameter
} from "@/api/serialParametersApi";

export const useGetAllSerialParameters = () => {
  return useQuery({
    queryKey: [queryKeys.useGetAllSerialParameters()],
    queryFn: getAllSerialParameters
  });
}

export const useGetSerialParametersByAnalyzerId = (id: number) => {
  return useQuery({
    queryKey: [queryKeys.useGetSerialParametersByAnalyzerId(id)],
    queryFn: () => getSerialParametersByAnalyzerId(id),
    enabled: id != 0
  });
}

export const useInsertSerialParameter = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: insertSerialParameter,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [queryKeys.useGetSerialParametersByAnalyzerId(id)]})
    }
  });
}

export const useUpdateSerialParameter = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateSerialParameter,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [queryKeys.useGetSerialParametersByAnalyzerId(id)]});
    }
  });
}

export const useDeleteSerialParameter = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSerialParameter,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [queryKeys.useGetSerialParametersByAnalyzerId(id)]})
    }
  });
}
