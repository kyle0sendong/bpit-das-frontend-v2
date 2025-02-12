import { loginUser, logoutUser, getAllUsers, insertUser, updateUser, deleteUser, getUserRoles } from "@/api/usersApi";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import queryKeys from "./_queryKeys";
import { useUser } from "@/contexts/UserContext";

export const useUserLogin = () => {
  const { login } = useUser();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      if(data != -1) {
        console.log(data)
        login(data.data.user, data.data.token)
      }
    },
    onError: (error) => {
      console.log(error.message);
    }
  })
}

export const useUserLogout = () => {
  const { logout } = useUser();
  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      logout();
    },
    onError: (error) => {
      console.log(error.message);
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
      if(data != -1) {
        update(data.data.user)
      }
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
