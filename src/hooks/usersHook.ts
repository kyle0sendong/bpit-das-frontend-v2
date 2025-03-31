import { loginUser, logoutUser, getAllUsers, insertUser, updateUser, deleteUser, getUserRoles, updateOtherUser } from "@/api/usersApi";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import queryKeys from "./_queryKeys";
import { useUser } from "@/contexts/UserContext";
import { AxiosResponse } from "axios";

import { UserType } from "@/types/users";

interface LoginResponse {
  user: UserType;  // Replace 'any' with your specific user type if available
  token: string;
}

export const useUserLogin = () => {
  const { login } = useUser();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (response: AxiosResponse<LoginResponse> | -1) => {
      // Check if the response is not -1 and has data
      if (response !== -1 && 'data' in response) {
        const userData = response.data;
        if (userData.user && userData.token) {
          login(userData.user, userData.token);
        } else {
          throw new Error("Invalid login response");
        }
      } else {
        throw new Error("Login failed");
      }
    },
    onError: () => {
      // Throw a more specific error for invalid credentials
      throw new Error("Login failed. Please check your credentials.");
    }
  });
}

export const useUserLogout = () => {
  const { logout } = useUser();
  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      logout();
    },
    onError: () => {
      logout()
    }
  }) 
}

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: [queryKeys.useGetAllUsers()],
    queryFn: getAllUsers
  })
}

export const useRegisterUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: insertUser,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [queryKeys.useGetAllUsers()]})
    }
  })
}

export const useUpdateUser = () => {
  const { update } = useUser();
  return useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      update(data.user)
    }
  })
}

export const useUpdateOtherUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateOtherUser,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [queryKeys.useGetAllUsers()]})
    }
  })
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [queryKeys.useGetAllUsers()]})
    }
  })
}

export const useGetUserRoles = () => {
  return useQuery({
    queryKey: [queryKeys.useGetUserRoles],
    queryFn: getUserRoles
  })
}
