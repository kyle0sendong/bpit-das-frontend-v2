import { useQuery, useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import queryKeys from "./_queryKeys";
import {
  getAllTcpAnalyzers,
  getTcpAnalyzerById,
  insertTcpAnalyzer,
  updateTcpAnalyzer,
  deleteTcpAnalyzer
} from "@/api/tcpAnalyzersApi";

export const useGetAllTcpAnalyzers = () => {
  return useQuery({
    queryKey: [queryKeys.useGetAllTcpAnalyzers()],
    queryFn: getAllTcpAnalyzers
  })
}

export const useGetTcpAnalyzerById = (id: number) => {
  return useQuery({
    queryKey: [queryKeys.useGetTcpAnalyzerById(id)],
    queryFn: () => getTcpAnalyzerById(id)
  })
}

export const useInsertTcpAnalyzer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: insertTcpAnalyzer,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [queryKeys.useGetAllTcpAnalyzers()]})
    }
  })
}

export const useUpdateTcpAnalyzer = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTcpAnalyzer,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [queryKeys.useGetTcpAnalyzerById(id)]})
      queryClient.invalidateQueries({queryKey: [queryKeys.useGetAllTcpAnalyzers()]})
    }
  })
}

export const useDeleteTcpAnalyzer = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTcpAnalyzer,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [queryKeys.useGetTcpAnalyzerById(id)]})
      queryClient.invalidateQueries({queryKey: [queryKeys.useGetAllTcpAnalyzers()]})
    }
  })
}