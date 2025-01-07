import axios from "axios";
import { message } from "antd";
import { useMutation } from "@tanstack/react-query";
import Endpoints from "../../../../Shared/constants/Endpoints";
import QueryKeys from "../../../../Shared/constants/QueryKeys"

export const useUpdateSite = (queryClient) => {
  return useMutation({
    mutationFn: async (data) => await axios.patch(Endpoints.siteUrl(), data),
    onSuccess: (data) => {
      queryClient.invalidateQueries(QueryKeys.sites())
      message.success(`${data.data}`)
    }
  })
}
