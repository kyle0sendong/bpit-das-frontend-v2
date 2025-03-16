import { useQuery, useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import queryKeys from "./_queryKeys";
import {
  getAllSerialAnalyzers,
  getSerialAnalyzerById,
  insertSerialAnalyzer,
  updateSerialAnalyzer,
  deleteSerialAnalyzer
} from "@/api/serialAnalyzersApi";

import { SerialAnalyzerType } from "@/types/serialAnalyzers";
import { UseFormReturnType } from "@mantine/form";

export const useGetAllSerialAnalyzers = (enabled: boolean) => {
  return useQuery({
    queryKey: [queryKeys.useGetAllSerialAnalyzers()],
    queryFn: getAllSerialAnalyzers,
    enabled: enabled
  })
}

export const useGetSerialAnalyzerById = (id: number, enabled: boolean) => {
  return useQuery({
    queryKey: [queryKeys.useGetSerialAnalyzerById(id)],
    queryFn: () => getSerialAnalyzerById(id),
    enabled: enabled
  })
}

export const useInsertSerialAnalyzer = (form: UseFormReturnType<Partial<SerialAnalyzerType>>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: insertSerialAnalyzer,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [queryKeys.useGetAllSerialAnalyzers()]})
      form.reset();
    }
  })
}

export const useUpdateSerialAnalyzer = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateSerialAnalyzer,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [queryKeys.useGetSerialAnalyzerById(id)]})
      queryClient.invalidateQueries({queryKey: [queryKeys.useGetAllSerialAnalyzers()]})
    }
  })
}

export const useDeleteSerialAnalyzer = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSerialAnalyzer,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [queryKeys.useGetSerialAnalyzerById(id)]})
      queryClient.invalidateQueries({queryKey: [queryKeys.useGetAllSerialAnalyzers()]})
    }
  })
}