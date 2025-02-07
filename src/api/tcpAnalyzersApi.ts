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
  try {
    return await axios.post(url, data, {
      headers: {
        Authorization: token
      }
    })
  } catch(error) {
    console.error("Error: ", error)
  }
}

export const updateTcpAnalyzer = async (data: Partial<TcpAnalyzerType>) => {
  try {
    const token = localStorage.getItem("token");
    return await axios.patch(url, data, {
      headers: {
        Authorization: token
      }
    })
  } catch(error) {
    console.error("Error: ", error)
  }
}

export const deleteTcpAnalyzer = async (id: number) => {
  try {
    const token = localStorage.getItem("token");
    return await axios.delete(url, {
      params: {
        id
      },
      headers: {
        Authorization: token
      }
    })
  } catch(error) {
    console.error("Error: ", error);
  }
}
