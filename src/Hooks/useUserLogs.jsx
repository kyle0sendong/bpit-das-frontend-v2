import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import Endpoints from "../Shared/constants/Endpoints";
import QueryKeys from "../Shared/constants/QueryKeys";

export const insertUserLog = async (data) => {
  return await axios.post(Endpoints.userLogsUrl('_', 'insert'), data)
}

export const useInsertUserLog = (queryClient, date) => {
  return useMutation({
    mutationFn: insertUserLog,
    onSuccess: (data) => {
      queryClient.invalidateQueries(QueryKeys.userLogs(date))
      console.log(data.data)
    }
  })
}