import axios from "axios";
import { bpitDasApiUrlV1 } from "./apiUrl";

import { SerialAnalyzerType } from "@/types/serialAnalyzers";

const url = `${bpitDasApiUrlV1}/serial-analyzers`;

export const getAllSerialAnalyzers = async () => {
  try {
    const data = await axios.get(url);
    return data.data;
  } catch(error) {
    console.error('Error: ', error);
  }
}

export const getSerialAnalyzerById = async (id: number) => {
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

export const insertSerialAnalyzer = async (data: Partial<SerialAnalyzerType>) => {
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

export const updateSerialAnalyzer = async (data: Partial<SerialAnalyzerType>) => {
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

export const deleteSerialAnalyzer = async (id: number) => {
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
