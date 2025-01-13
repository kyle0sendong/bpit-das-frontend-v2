import axios from "axios";
import { bpitDasApiUrlV1 } from "./apiUrl";

import { TimebasesType } from "@/types/timebases";

const url = `${bpitDasApiUrlV1}/timebases`;

export const getAllTimebases = async () => {
  try {
    const data = await axios.get(url);
    return data.data;
  } catch(error) {
    console.error('Error: ', error);
  }
}

export const insertTimebases = async (data: TimebasesType) => {
  try {
    return await axios.post(url, data)
  } catch(error) {
    console.error("Error: ", error)
  }
}

export const updateTimebases = async (data: Partial<TimebasesType>[]) => {
  try {
    return await axios.patch(url, data)
  } catch(error) {
    console.error("Error: ", error)
  }
}

export const deleteTimebases = async (id: number) => {
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
