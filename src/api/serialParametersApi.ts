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

export const updateSerialParameter = async (data: Partial<ParameterType>[]) => {
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

export const deleteSerialParameter = async (id: number) => {
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
