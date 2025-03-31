import axios from "axios";
import { bpitDasApiUrlV1 } from "./apiUrl";

import { TcpAnalyzerType } from "@/types/tcpAnalyzers";

const url = `${bpitDasApiUrlV1}/tcp-analyzers`;

export const getAllTcpAnalyzers = async () => {
  try {
    const data = await axios.get(url);
    return data.data;
  } catch(error) {
    console.error('Error: ', error);
  }
}

export const getTcpAnalyzerById = async (id: number) => {
  try {
    const data = await axios.get(url, {
      params: {
        id
      }
    })
    return data.data
  } catch(error) {
    console.error('Error: ', error);
  }
}

export const insertTcpAnalyzer = async (data: Partial<TcpAnalyzerType>) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(url, data, {
    headers: {
      Authorization: token
    }
  })

  return response.data;
}

export const updateTcpAnalyzer = async (data: Partial<TcpAnalyzerType>) => {
  const token = localStorage.getItem("token");
  const response = await axios.patch(url, data, {
    headers: {
      Authorization: token
    }
  })

  return response.data;
}

export const deleteTcpAnalyzer = async (id: number) => {
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
