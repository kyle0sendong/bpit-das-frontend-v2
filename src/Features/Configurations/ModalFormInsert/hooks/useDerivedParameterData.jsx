import { useMutation } from "@tanstack/react-query";
import Endpoints from "../../../../Shared/constants/Endpoints";
import axios from "axios";
import { message } from "antd";

const insertDerivedParameter = (data) => {
  return axios.post(Endpoints.derivedParameterUrl(), data)
}

export const useInsertDerivedParameter = (queryClient, id) => {
  return useMutation({
    mutationFn: insertDerivedParameter,
    onSuccess: (data) => {
      queryClient.invalidateQueries(`derivedParameter${id}`)
      message.success(`${data.data}`)
    }
  })
}