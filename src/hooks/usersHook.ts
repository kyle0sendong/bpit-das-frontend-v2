import { loginUser, logoutUser, insertUser, updateUser, deleteUser } from "@/api/usersApi";
import { useMutation } from "@tanstack/react-query";
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

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: insertUser
  })
}

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: updateUser
  })
}

export const useDeleteUser = () => {
  return useMutation({
    mutationFn: deleteUser
  })
}
