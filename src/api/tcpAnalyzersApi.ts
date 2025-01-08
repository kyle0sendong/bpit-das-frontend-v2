import axios from "axios";
import { bpitDasApiUrlV1 } from "./apiUrl";

import { TcpAnalyzerType } from "@/types/tcpAnalyzers";

const url = `${bpitDasApiUrlV1}/tcp-analyzer`;

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

export const insertTcpAnalyzer = async (data: TcpAnalyzerType) => {
  try {
    return await axios.post(url, data)
  } catch(error) {
    console.error("Error: ", error)
  }
}

export const updateTcpAnalyzer = async (data: Partial<TcpAnalyzerType[]>) => {
  try {
    return await axios.patch(url, data)
  } catch(error) {
    console.error("Error: ", error)
  }
}

export const deleteTcpAnalyzer = async (id: number) => {
  try {
    return await axios.delete(url, {
      params: {
        id
      }
    })
  } catch(error) {
    console.error("Error: ", error);
  }
}
