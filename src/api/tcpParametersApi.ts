import axios from "axios";
import { bpitDasApiUrlV1 } from "./apiUrl";
import { ParameterType, InsertParameterType } from "@/types/parameters";

const url = `${bpitDasApiUrlV1}/tcp-parameters`;

export const getAllTcpParameters = async () => {
  const response = await axios.get(url);
  return response.data;
}

export const getTcpParametersByAnalyzerId = async (id: number) => {
  const response = await axios.get(url, {
    params: {
      id
    }
  })
  
  return response.data
}

export const insertTcpParameter = async (data: InsertParameterType) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(url, data, {
    headers: {
      Authorization: token
    }
  });

  return response.data;
}

export const updateTcpParameter = async (data: Partial<ParameterType>[]) => {
  const token = localStorage.getItem("token");
  const response = await axios.patch(url, data, {
    headers: {
      Authorization: token
    }
  })

  return response.data;
};

export const deleteTcpParameter = async (id: number) => {
  const token = localStorage.getItem("token");
  const response = await axios.delete(url, {
    params: {
      id
    },
    headers: {
      Authorization: token
    }
  })

  return response.data;
}
