import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Endpoints from "../../../../Shared/constants/Endpoints"
import { message } from "antd";

const insertParameter = async (data) => {
  return await axios.post(Endpoints.parameterUrl(), data)
}

export const useInsertParameter = (queryClient, id) => {
  return useMutation({
    mutationFn: insertParameter,
    onSuccess: (data) => {
      console.log(data)
      queryClient.invalidateQueries(`parameter${id}`)
      message.success(`${data.data}`)
    },
  })
}


