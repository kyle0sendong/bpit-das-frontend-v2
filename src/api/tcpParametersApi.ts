import axios from "axios";
import { bpitDasApiUrlV1 } from "./apiUrl";
import { TcpParametersType, InsertTcpParameterType } from "@/types/tcpParameters";
const url = `${bpitDasApiUrlV1}/tcp-parameters`;

export const getAllTcpParameters = async () => {
  try {
    const data = await axios.get(url);
    return data.data;
  } catch(error) {
    console.error('Error: ', error);
  }
}

export const getTcpParametersByAnalyzerId = async (id: number) => {
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

export const insertTcpParameter = async (data: InsertTcpParameterType) => {
  try {
    return await axios.post(url, data)
  } catch(error) {
    console.error("Error: ", error)
  }
}

export const updateTcpParameter = async (data: Partial<TcpParametersType>[]) => {
  try {
    return await axios.patch(url, data)
  } catch(error) {
    console.error("Error: ", error)
  }
}

export const deleteTcpParameter = async (id: number) => {
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
