import axios from "axios";
import { AnalyzerQueryType } from "@/types/analyzerData";
import { bpitDasApiUrlV1 } from "./apiUrl";

const url = `${bpitDasApiUrlV1}`;

export const getAnalyzerData = async (params: AnalyzerQueryType) => {
  try {
    const data = await axios(`${url}/analyzer-data`, {
      params
    });
    return data.data;
  } catch (error) {
    console.error("Error fetching: ", error);
  }
}

export const getVirtualChannelsData = async (params: AnalyzerQueryType) => {
  try {
    const data = await axios(`${url}/virtual-channels-data`, {
      params
    });
    return data.data;
  } catch (error) {
    console.error("Error fetching: ", error);
  }
}