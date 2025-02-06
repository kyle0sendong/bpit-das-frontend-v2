import { useQuery, useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import queryKeys from "./_queryKeys";
import {
  getAllVirtualChannels,
  insertVirtualChannel,
  updateVirtualChannel,
  deleteVirtualChannel
} from "@/api/virtualChannelsApi";

export const useGetAllVirtualChannels = (enabled: boolean) => {
  return useQuery({
    queryKey: [queryKeys.useGetAllVirtualChannels()],
    queryFn: getAllVirtualChannels,
    enabled: enabled
  })
}

export const useInsertVirtualChannel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: insertVirtualChannel,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:[queryKeys.useGetAllVirtualChannels()]})
    }
  })
}

export const useUpdateVirtualChannel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateVirtualChannel,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:[queryKeys.useGetAllVirtualChannels()]})
    }
  })
}

export const useDeleteVirtualChannel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteVirtualChannel,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:[queryKeys.useGetAllVirtualChannels()]})
    }
  })
}