import axios from "axios";
import { bpitDasApiUrlV1 } from "./apiUrl";

const url = `${bpitDasApiUrlV1}/user-logs`;

export const getUserLogsByDate = async (from:string, to:string) => {
  try {
    const token = localStorage.getItem("token");
    const data = await axios.get(url, {
      params: {
        from,
        to
      },
      headers: {
        Authorization: token
      }
    });
    return data.data;
  } catch(error) {
    console.error('Error: ', error);
  }
}

export const getLogDistinctDates = async() => {
  try {
    const token = localStorage.getItem("token");
    const data = await axios.get(`${bpitDasApiUrlV1}/log-distinct-dates`, {
      headers: {
        Authorization: token
      }
    });
    return data.data;
  } catch(error) {
    console.error('Error: ', error);
  }

}

