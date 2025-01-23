import axios from "axios";
import { bpitDasApiUrlV1 } from "./apiUrl";

const url = `${bpitDasApiUrlV1}/analyzer-data`;

export const getAnalyzerData = async () => {
  try {
    const data = await axios(url);
    return data.data;
  } catch (error) {
    console.error("Error fetching: ", error);
  }
}