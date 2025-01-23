import axios from "axios";
import { AnalyzerQueryType } from "@/types/analyzerData";
import { bpitDasApiUrlV1 } from "./apiUrl";

const url = `${bpitDasApiUrlV1}/analyzer-data`;

export const getAnalyzerData = async (params: AnalyzerQueryType) => {
  try {
    const data = await axios(url, {
      params
    });
    return data.data;
  } catch (error) {
    console.error("Error fetching: ", error);
  }
}