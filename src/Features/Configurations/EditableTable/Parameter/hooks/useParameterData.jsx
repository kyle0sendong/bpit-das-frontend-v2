import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Endpoints from "../../../../../Shared/constants/Endpoints";
import { message } from "antd";

const updateParameter = async (data) => {
  delete data.key
  return await axios.patch(Endpoints.parameterUrl(), data)
}

const deleteParameter = async (data) => {
  return await axios.delete(Endpoints.parameterUrl(), {
    data: data
  })
}

export const useUpdateParameter = () => {
  return useMutation({
    mutationFn: updateParameter,
    onSuccess: (data) => {
      message.success(`${data.data}`)
    }
  })
}

export const useDeleteParameter = (queryClient, id) => {
  return useMutation({
    mutationFn:deleteParameter,
    onSuccess: (data) => {
      queryClient.invalidateQueries(`parameter${id}`)
      message.success(`${data.data}`)
    }
  })
}
