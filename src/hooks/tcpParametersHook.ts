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

import { UseFormReturnType } from "@mantine/form";
import { TcpParametersType } from "@/types/tcpParameters";

export const useGetAllParameters = () => {
  return useQuery({
    queryKey: [queryKeys.useGetAllParameters()],
    queryFn: getAllTcpParameters
  });
}

export const useGetParametersByAnalyzerId = (id: number) => {
  return useQuery({
    queryKey: [queryKeys.useGetParametersByAnalyzerId(id)],
    queryFn: () => getTcpParametersByAnalyzerId(id)
  });
}

export const useInsertParameter = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: insertTcpParameter,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [queryKeys.useGetParametersByAnalyzerId(id)]})
    }
  });
}

export const useUpdateParameter = (id: number, form: UseFormReturnType<TcpParametersType>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTcpParameter,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [queryKeys.useGetParametersByAnalyzerId(id)]});
      form.reset();
    }
  });
}

export const useDeleteParameter = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTcpParameter,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [queryKeys.useGetParametersByAnalyzerId(id)]})
    }
  });
}
