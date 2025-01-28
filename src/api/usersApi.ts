import axios from "axios";
import { bpitDasApiUrlV1 } from "./apiUrl";

export const loginApi = async (data: any) => {
  const apiUrl = `${bpitDasApiUrlV1}/login`;
  try {
    const result = await axios.post(apiUrl, {username: data.username, password: data.password})
    return result
  } catch {
    return -1;
  }
}