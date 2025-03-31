import axios from "axios";
import { bpitDasApiUrlV1 } from "./apiUrl";
import { UserType } from "@/types/users";

export const loginUser = async (data: any) => {
  const token = localStorage.getItem("token");
  const apiUrl = `${bpitDasApiUrlV1}/login`;
  try {
    const result = await axios.post(apiUrl, {username: data.username, password: data.password}, {
      headers: {
        Authorization: token
      }
    })
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
  const apiUrl = `${bpitDasApiUrlV1}/users`;
  const token = localStorage.getItem("token");

  const response = await axios.get(apiUrl, {
    headers: {
      Authorization: token
    }
  });

  return response.data;

}

export const insertUser = async(data: Partial<UserType>) => {
  const apiUrl = `${bpitDasApiUrlV1}/register`;
  const token = localStorage.getItem("token");

  const response = await axios.post(apiUrl, data, {
    headers: {
      Authorization: token
    }
  })

  return response.data;
}

export const updateUser = async(data: Partial<UserType>) => {
  const apiUrl = `${bpitDasApiUrlV1}/user`;
  const token = localStorage.getItem("token");

  const response = await axios.patch(apiUrl, data, {
    headers: {
      Authorization: token
    }
  });

  return response.data;
}

export const updateOtherUser = async(data: Partial<UserType>) => {
  const apiUrl = `${bpitDasApiUrlV1}/users`;
  const token = localStorage.getItem("token");

  const response = await axios.patch(apiUrl, data, {
    headers: {
      Authorization: token
    }
  });

  return response.data;
}

export const deleteUser = async(data: Partial<UserType>) => {
  const apiUrl = `${bpitDasApiUrlV1}/user`;
  const token = localStorage.getItem("token");

  const response = await axios.delete(apiUrl, {
    data,
    headers: {
      Authorization: token
    }
  })

  return response.data;
}

export const getUserRoles = async() => {
  const apiUrl = `${bpitDasApiUrlV1}/user-roles`;
  const token = localStorage.getItem("token");
  try {
    const result = await axios.get(apiUrl, {
      headers: {
        Authorization: token
      }
    });
    return result.data;
  } catch {
    return -1;
  }
}