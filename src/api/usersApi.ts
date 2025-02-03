import axios from "axios";
import { bpitDasApiUrlV1 } from "./apiUrl";
import { UserType } from "@/types/users";

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

export const getAllUsers = async() => {
  const apiUrl = `${bpitDasApiUrlV1}/register`;
  try {
    const data = await axios.get(apiUrl);
    return data.data;
  } catch {
    return -1;
  }
}
export const insertUser = async(data: UserType) => {
  const apiUrl = `${bpitDasApiUrlV1}/register`;

  try {
    return await axios.post(apiUrl, data)
  } catch {
    return -1;
  }
}

export const updateUser = async(data: UserType) => {
  const apiUrl = `${bpitDasApiUrlV1}/register`;

  try {
    return await axios.patch(apiUrl, data)
  } catch {
    return -1;
  }
}

export const deleteUser = async(data: UserType) => {
  const apiUrl = `${bpitDasApiUrlV1}/user`;
  try {
    return await axios.delete(apiUrl, {data})
  } catch {
    return -1;
  }
}