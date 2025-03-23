import axios from "axios";
import { bpitDasApiUrlV1 } from "./apiUrl";

const url = `${bpitDasApiUrlV1}/current-values`;

export const getAllCurrentValues = async () => {
  try {
    const data = await axios.get(url);
    return data.data;
  } catch(error) {
    console.error('Error: ', error);
  }
}

export const getCurrentValuesByAnalyzerId = async (id: number, type: string) => {
  try {
    const data = await axios.get(url, {
      params: {
        id,
        type
      }
    });
    return data.data;
  } catch(error) {
    console.error('Error: ', error);
  }
}

