import axios from "axios";
import { bpitDasApiUrlV1 } from "./apiUrl";
import { ParametersType } from "@/types/parameters";
const url = `${bpitDasApiUrlV1}/parameters`;


export const getAllCredentials = async () => {
  try {
    const data = await axios.get(url);
    return data.data;
  } catch(error) {
    console.error('Error: ', error);
  }
}

export const insertDbCredentials = async (data: ParametersType) => {
  try {
    return await axios.post(url, data)
  } catch(error) {
    console.error("Error: ", error)
  }
}

export const updateDbCredentials = async (data: ParametersType[]) => {
  try {
    return await axios.patch(url, data)
  } catch(error) {
    console.error("Error: ", error)
  }
}

export const deleteDbCredentials = async (id: number) => {
  try {
    return await axios.delete(url, {
      data: {
        id:id
      }
    })
  } catch(error) {
    console.error("Error: ", error);
  }
}
