import axios from "axios";
import { bpitDasApiUrlV1 } from "./apiUrl";
import { StationsType } from "@/types/stations";

const url = `${bpitDasApiUrlV1}/sites`;

export const getAllStations = async () => {
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

export const updateStations = async (data: Partial<StationsType>[]) => {
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
