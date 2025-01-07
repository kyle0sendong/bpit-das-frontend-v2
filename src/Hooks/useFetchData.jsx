import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Endpoints from "../Shared/constants/Endpoints";
import QueryKeys from "../Shared/constants/QueryKeys";

export const useGetParameters = (id) => {
  return useQuery({
    queryKey: [QueryKeys.parameters(id)],
    queryFn: async () => {
      const res =  await axios.get(Endpoints.parameterUrl(id))
      return res.data
    }
  })
}

export const useGetCurrentValuesTcp = (id) => {
  return useQuery({
    queryKey: [QueryKeys.currentValues(id)],
    queryFn: async () => {
      const res = await axios.get(Endpoints.currentValues(id))
      return res.data
    },
    refetchInterval: 5000
  })
}

export const useGetAllParameters = () => {
  return useQuery({
    queryKey: [QueryKeys.parameters()],
    queryFn: async () => {
      const res =  await axios.get(Endpoints.parameterUrl())
      return res.data
    }
  })
}

export const useGetAllDerivedParameters = () => {
  return useQuery({
    queryKey: [QueryKeys.derivedParameters()],
    queryFn: async () => {
      const res = await axios.get(Endpoints.derivedParameterUrl())
      return res.data
    }
  })
}

export const useGetDerivedParameters = (tcp_id) => {
  return useQuery({
    queryKey: [QueryKeys.derivedParameters(tcp_id)],
    queryFn: async () => {
      const res = await axios.get(Endpoints.derivedParameterUrl(tcp_id))
      return res.data
    }
  })
}

export const useGetAnalyzers = (id) => {
  return useQuery({
    queryKey: [QueryKeys.tcpAnalyzer(id)],
    queryFn: async () => {
      const res =  await axios.get(Endpoints.analyzerUrl(id))
      return res.data
    }
  })
}

export const useGetTcpData = (data) => {
  return useQuery({
    queryKey: [QueryKeys.tcpDataRange(data)],
    queryFn: async () => {
      const res = await axios.post(Endpoints.tcpDataRange(), data)
      return res.data
    }
  })
}

export const useGetAllAnalyzers = () => {
  return useQuery({
    queryKey: [QueryKeys.allTcpAnalyzers()],
    queryFn: async () => {
      const res =  await axios.get(Endpoints.analyzerUrl())
      return res.data
    }
  })
}

export const useGetAllTimebase = () => {
  return useQuery({
    queryKey: [QueryKeys.timebases()],
    queryFn: async () => {
      const res = await axios.get(Endpoints.timebaseUrl())
      return res.data
    }
  })
}

export const useGetSites = () => {
  return useQuery({
    queryKey: [QueryKeys.sites()],
    queryFn: async () => {
      const res = await axios.get(Endpoints.siteUrl())
      return res.data
    }
  })
}

export const useGetLogs = (date) => {
  const type = date.date ? 'date' : 'dateRange'
  const data = date.date ? {'date': date.date} : {'startDate':date.startDate, 'endDate':date.endDate}
  const key = date.date ? date.date : `${date.startDate}-${date.endDate}`

  return useQuery({
    queryKey: [QueryKeys.userLogs(key)],
    queryFn: async () => {
      const res = await axios.get(Endpoints.userLogsUrl(data, type))
      return res.data
    }
  })
}

export const useGetDistinctDateLogs = () => {
  return useQuery({
    queryKey: [QueryKeys.userLogs('distinctDates')],
    queryFn: async () => {
      const res = await axios.get(Endpoints.userLogsUrl('_', 'distinctDates'))
      return res.data
    }
  })
}
