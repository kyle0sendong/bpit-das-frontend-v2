import axios from "axios";
import { bpitDasApiUrlV1 } from "./apiUrl";
import { ParametersType } from "@/types/parameters";
const url = `${bpitDasApiUrlV1}/parameters`;

export const getAllParameters = async () => {
  try {
    const data = await axios.get(url);
    return data.data;
  } catch(error) {
    console.error('Error: ', error);
  }
}

export const getParametersByAnalyzerId = async (id: number) => {
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

export const insertParameter = async (data: ParametersType) => {
  try {
    return await axios.post(url, data)
  } catch(error) {
    console.error("Error: ", error)
  }
}

export const updateParameter = async (data: Partial<ParametersType[]>) => {
  try {
    return await axios.patch(url, data)
  } catch(error) {
    console.error("Error: ", error)
  }
}

export const deleteParameter = async (id: number) => {
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
