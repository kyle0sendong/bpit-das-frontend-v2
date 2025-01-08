import { useQuery, useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import queryKeys from "./_queryKeys";
import {
  getAllSites,
  updateSite
} from "@/api/sitesApi";

const queryClient = useQueryClient();

export const useGetAllSites = () => {
  return useQuery({
    queryKey: [queryKeys.useGetAllSites()],
    queryFn: getAllSites
  })
}

export const useUpdateSite = () => {
  return useMutation({
    mutationFn: updateSite,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [queryKeys.useGetAllSites()]})
    }
  })
}