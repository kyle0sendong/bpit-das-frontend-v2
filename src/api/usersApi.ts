import axios from "axios";
import { bpitDasApiUrlV1 } from "./apiUrl";

export const loginUser = async (data: any) => {
  const apiUrl = `${bpitDasApiUrlV1}/login`;
  try {
    const result = await axios.post(apiUrl, {username: data.username, password: data.password})
    return result
  } catch {
    return -1;
  }
}

export const logoutUser = async(token: string | null) => {
  const apiUrl = `${bpitDasApiUrlV1}/logout`;
  try {
    const result = await axios.post(apiUrl, {} , {
      headers: {
        Authorization: token
      }
    })
    return result
  } catch {
    return -1;
  }
}