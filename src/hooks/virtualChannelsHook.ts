import { useQuery, useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import queryKeys from "./_queryKeys";
import {
  getAllVirtualChannels,
  insertVirtualChannel,
  updateVirtualChannel,
  deleteVirtualChannel
} from "@/api/virtualChannelsApi";

const queryClient = useQueryClient();

export const useGetAllVirtualChannels = () => {
  return useQuery({
    queryKey: [queryKeys.useGetAllVirtualChannels()],
    queryFn: getAllVirtualChannels
  })
}

export const useInsertVirtualChannel = () => {
  return useMutation({
    mutationFn: insertVirtualChannel,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:[queryKeys.useGetAllVirtualChannels()]})
    }
  })
}

export const useUpdateVirtualChannel = () => {
  return useMutation({
    mutationFn: updateVirtualChannel,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:[queryKeys.useGetAllVirtualChannels()]})
    }
  })
}

export const useDeleteVirtualChannel = () => {
  return useMutation({
    mutationFn: deleteVirtualChannel,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:[queryKeys.useGetAllVirtualChannels()]})
    }
  })
}