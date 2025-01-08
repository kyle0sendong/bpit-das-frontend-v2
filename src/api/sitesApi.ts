import axios from "axios";
import { bpitDasApiUrlV1 } from "./apiUrl";
import { SitesType } from "@/types/sites";

const url = `${bpitDasApiUrlV1}/sites`;

export const getAllSites = async () => {
  try {
    const data = await axios.get(url);
    return data.data;
  } catch(error) {
    console.error('Error: ', error);
  }
}

export const updateSite = async (data: Partial<SitesType[]>) => {
  try {
    return await axios.patch(url, data)
  } catch(error) {
    console.error("Error: ", error)
  }
}
