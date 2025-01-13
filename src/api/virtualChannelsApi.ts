import axios from "axios";
import { bpitDasApiUrlV1 } from "./apiUrl";
import { VirtualChannelsType } from "@/types/virtualChannels";

const url = `${bpitDasApiUrlV1}/virtual-channels`;

export const getAllVirtualChannels = async () => {
  try {
    const data = await axios.get(url);
    return data.data;
  } catch(error) {
    console.error('Error: ', error);
  }
}

export const insertVirtualChannel = async (data: VirtualChannelsType) => {
  try {
    return await axios.post(url, data);
  } catch(error) {
    console.error("Error: ", error);
  }
}

export const updateVirtualChannel = async (data: Partial<VirtualChannelsType>[]) => {
  try {
    return await axios.patch(url, data);
  } catch(error) {
    console.error("Error: ", error);
  }
}

export const deleteVirtualChannel = async (id: number) => {
  try {
    return await axios.delete(url, {
      params: {
        id
      }
    });
  } catch(error) {
    console.error("Error: ", error);;
  }
}
