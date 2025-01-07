import axios from "axios"
import { useMutation } from "@tanstack/react-query"
import { message } from "antd"
import Endpoints from '../../../../Shared/constants/Endpoints'
import QueryKeys from '../../../../Shared/constants/QueryKeys'
import { removeUndefined } from '../../../../Utils/removeUndefined'

const updateTcp = async (data) => {
  const newData = removeUndefined(data)
  return await axios.patch(Endpoints.analyzerUrl(), newData)
}

const deleteTcp = async (data) => {
  return await axios.delete(Endpoints.analyzerUrl(), {data:data})
}

export const useUpdateTcp = (queryClient, id) => {
  return useMutation({
    mutationFn:updateTcp,
    onSuccess: (data) => {
      message.success(data.data)
      queryClient.invalidateQueries(QueryKeys.allTcpAnalyzers())
      queryClient.invalidateQueries(QueryKeys.tcpAnalyzer(id))
    }
  })
}

export const useDeleteTcp = (queryClient) => {
  return useMutation({
    mutationFn: deleteTcp,
    onSuccess: (data) => {
      message.success(`${data.data}`)
      queryClient.invalidateQueries(QueryKeys.allTcpAnalyzers())
    }
  })
}
