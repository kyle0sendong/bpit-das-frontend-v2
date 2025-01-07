import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Endpoints from "../../../../../Shared/constants/Endpoints";
import { message } from "antd";

const updateDerivedParameter = async (data) => {
  delete data.key
  console.log(data)
  return await axios.patch(Endpoints.derivedParameterUrl(), data)
}

const deleteDerivedParameter = async (data) => {
  return await axios.delete(Endpoints.derivedParameterUrl(), {
    data: data
  })
}

export const useUpdateDerivedParameter = () => {
  return useMutation({
    mutationFn: updateDerivedParameter,
    onSuccess: (data) => {
      message.success(`${data.data}`)
    }
  })
}

export const useDeleteDerivedParameter = (queryClient, id) => {
  return useMutation({
    mutationFn:deleteDerivedParameter,
    onSuccess: (data) => {
      queryClient.invalidateQueries(`parameter${id}`)
      message.success(`${data.data}`)
    }
  })
}
