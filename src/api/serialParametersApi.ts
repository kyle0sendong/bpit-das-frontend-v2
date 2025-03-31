import axios from "axios";
import { bpitDasApiUrlV1 } from "./apiUrl";
import { ParameterType, InsertParameterType } from "@/types/parameters";
const url = `${bpitDasApiUrlV1}/serial-parameters`;

export const getAllSerialParameters = async () => {
  try {
    const data = await axios.get(url);
    return data.data;
  } catch(error) {
    console.error('Error: ', error);
  }
}

export const getSerialParametersByAnalyzerId = async (id: number) => {
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

export const insertSerialParameter = async (data: InsertParameterType) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(url, data, {
    headers: {
      Authorization: token
    }
  });

  return response.data;
}

export const updateSerialParameter = async (data: Partial<ParameterType>[]) => {
  const token = localStorage.getItem("token");
  const response = await axios.patch(url, data, {
    headers: {
      Authorization: token
    }
  });

  return response.data;
}

export const deleteSerialParameter = async (id: number) => {
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
