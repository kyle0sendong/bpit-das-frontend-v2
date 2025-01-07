import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import Endpoints from "../../../../Shared/constants/Endpoints";
import QueryKeys from "../../../../Shared/constants/QueryKeys"

export const useUpdateTimebase = (queryClient) => {
  return useMutation({
    mutationFn: async (data) => await axios.patch(Endpoints.timebaseUrl(), data),
    onSuccess: () => {
      queryClient.invalidateQueries(QueryKeys.timebases())
    }
  })
}

export const useInsertTimebase = (queryClient) => {
  return useMutation({
    mutationFn: async (data) => await axios.post(Endpoints.timebaseUrl(), data),
    onSuccess: () => {
      queryClient.invalidateQueries(QueryKeys.timebases())
    }
  })
}

export const useDeleteTimebase = (queryClient) => {
  return useMutation({
    mutationFn: async (data) => await axios.delete(Endpoints.timebaseUrl(), {data}),
    onSuccess: () => {
      queryClient.invalidateQueries(QueryKeys.timebases())
    }
  })
}
