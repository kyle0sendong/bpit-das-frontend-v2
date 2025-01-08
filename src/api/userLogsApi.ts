import axios from "axios";
import { bpitDasApiUrlV1 } from "./apiUrl";

const url = `${bpitDasApiUrlV1}/user-logs`;

export const getUserLogsByDate = async (from:string, to:string) => {
  try {
    const data = await axios.get(url, {
      params: {
        from,
        to
      }
    });
    return data.data;
  } catch(error) {
    console.error('Error: ', error);
  }
}

export const getLogDistinctDates = async() => {
  try {
    const data = await axios.get(`${bpitDasApiUrlV1}/log-distinct-dates`);
    return data.data;
  } catch(error) {
    console.error('Error: ', error);
  }

}

