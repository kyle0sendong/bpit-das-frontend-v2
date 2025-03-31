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

  const token = localStorage.getItem("token");
  const response = await axios.post(url, data, {
    headers: {
      Authorization: token
    }
  });
  return response.data

}

export const updateVirtualChannel = async (data: Partial<VirtualChannelsType>[]) => {
  const token = localStorage.getItem("token");
  const response = await axios.patch(url, data, {
    headers: {
      Authorization: token
    }
  });

  return response.data;
}

export const deleteVirtualChannel = async (id: number) => {
  const token = localStorage.getItem("token");
  const response = await axios.delete(url, {
    params: {
      id
    },
    headers: {
      Authorization: token
    }
  });

  return response.data;
}
