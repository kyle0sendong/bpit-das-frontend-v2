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
    const token = localStorage.getItem("token");
    return await axios.post(url, data, {
      headers: {
        Authorization: token
      }
    });
  } catch(error) {
    console.error("Error: ", error)
  }
}

export const updateTcpParameter = async (data: Partial<TcpParametersType>[]) => {
  try {
    const token = localStorage.getItem("token");
    return await axios.patch(url, data, {
      headers: {
        Authorization: token
      }
    }
    )
  } catch(error) {
    console.error("Error: ", error)
  }
}

export const deleteTcpParameter = async (id: number) => {
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
