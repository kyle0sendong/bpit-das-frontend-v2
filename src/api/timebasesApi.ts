import axios from "axios";
import { bpitDasApiUrlV1 } from "./apiUrl";

import { TimebasesType } from "@/types/timebases";

const url = `${bpitDasApiUrlV1}/timebases`;

export const getAllTimebases = async () => {
  try {
    const token = localStorage.getItem("token");
    const data = await axios.get(url, {
      headers: {
        Authorization: token
      }
    });
    return data.data;
  } catch(error) {
    console.error('Error: ', error);
  }
}

export const insertTimebases = async (data: TimebasesType) => {
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

export const updateTimebases = async (data: Partial<TimebasesType>[]) => {
  try {
    const token = localStorage.getItem("token");
    return await axios.patch(url, data, {
      headers: {
        Authorization: token
      }
    });
  } catch(error) {
    console.error("Error: ", error)
  }
}

export const deleteTimebases = async (id: number) => {
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
