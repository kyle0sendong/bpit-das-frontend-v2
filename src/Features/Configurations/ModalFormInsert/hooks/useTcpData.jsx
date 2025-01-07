import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { message } from "antd"

import Endpoints from "../../../../Shared/constants/Endpoints"

const insertTcp = async (data) => {
  if(!data.sampling) {
    data.sampling = '100'
  }
  return await axios.post(Endpoints.analyzerUrl(), data)
}

export const useInsertTcp = (queryClient) => {
  return useMutation({
    mutationFn: insertTcp,
    onSuccess: (data) => {
      queryClient.invalidateQueries('analyzerData')
      message.success(`${data.data}`)
    }
  })
}