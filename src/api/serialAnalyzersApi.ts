import axios from "axios";
import { bpitDasApiUrlV1 } from "./apiUrl";

import { SerialAnalyzerType } from "@/types/serialAnalyzers";

const url = `${bpitDasApiUrlV1}/serial-analyzers`;


export const getSerialPorts = async () => {
  try {
    const response = await axios.get(`${bpitDasApiUrlV1}/serial-ports`);
    return response.data;
  } catch(error) {
    console.error('Error: ', error);
  }
}

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
  const response = await axios.post(url, data, {
    headers: {
      Authorization: token
    }
  })

  return response.data;
}

export const updateSerialAnalyzer = async (data: Partial<SerialAnalyzerType>) => {
  const token = localStorage.getItem("token");
  const response = await axios.patch(url, data, {
    headers: {
      Authorization: token
    }
  });

  return response.data;
}

export const deleteSerialAnalyzer = async (id: number) => {
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
