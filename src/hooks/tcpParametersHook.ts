import { useQuery, useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import queryKeys from "./_queryKeys";

import {
  getAllTcpParameters,
  getTcpParametersByAnalyzerId,
  insertTcpParameter,
  updateTcpParameter,
  deleteTcpParameter
} from "@/api/tcpParametersApi";

export const useGetAllTcpParameters = () => {
  return useQuery({
    queryKey: [queryKeys.useGetAllTcpParameters()],
    queryFn: getAllTcpParameters
  });
}

export const useGetTcpParametersByAnalyzerId = (id: number) => {
  return useQuery({
    queryKey: [queryKeys.useGetTcpParametersByAnalyzerId(id)],
    queryFn: () => getTcpParametersByAnalyzerId(id),
    enabled: id != 0
  });
}

export const useInsertTcpParameter = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: insertTcpParameter,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [queryKeys.useGetTcpParametersByAnalyzerId(id)]})
    }
  });
}

export const useUpdateTcpParameter = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTcpParameter,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [queryKeys.useGetTcpParametersByAnalyzerId(id)]});
    }
  });
}

export const useDeleteTcpParameter = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTcpParameter,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [queryKeys.useGetTcpParametersByAnalyzerId(id)]})
    }
  });
}
