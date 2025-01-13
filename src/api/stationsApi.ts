import axios from "axios";
import { bpitDasApiUrlV1 } from "./apiUrl";
import { StationsType } from "@/types/stations";

const url = `${bpitDasApiUrlV1}/sites`;

export const getAllStations = async () => {
  try {
    const data = await axios.get(url);
    return data.data;
  } catch(error) {
    console.error('Error: ', error);
  }
}

export const updateStations = async (data: Partial<StationsType>[]) => {
  try {
    return await axios.patch(url, data)
  } catch(error) {
    console.error("Error: ", error)
  }
}
