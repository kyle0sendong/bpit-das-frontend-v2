import axios from "axios";
import { bpitDasApiUrlV1 } from "./apiUrl";
import { VirtualChannelsType, InsertVirtualChannelType } from "@/types/virtualChannels";

const url = `${bpitDasApiUrlV1}/virtual-channels`;

export const getAllVirtualChannels = async () => {
  try {
    const data = await axios.get(url);
    return data.data;
  } catch(error) {
    console.error('Error: ', error);
  }
}

export const insertVirtualChannel = async (data: InsertVirtualChannelType) => {
  try {
    const token = localStorage.getItem("token");
    return await axios.post(url, data, {
      headers: {
        Authorization: token
      }
    });
  } catch(error) {
    console.error("Error: ", error);
  }
}

export const updateVirtualChannel = async (data: Partial<VirtualChannelsType>[]) => {
  try {
    const token = localStorage.getItem("token");
    return await axios.patch(url, data, {
      headers: {
        Authorization: token
      }
    });
  } catch(error) {
    console.error("Error: ", error);
  }
}

export const deleteVirtualChannel = async (id: number) => {
  try {
    const token = localStorage.getItem("token");
    return await axios.delete(url, {
      params: {
        id
      },
      headers: {
        Authorization: token
      }
    });
  } catch(error) {
    console.error("Error: ", error);;
  }
}
