import { loginUser, logoutUser } from "@/api/usersApi";
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
    onSuccess: (data) => {
      if(data != -1) {
        logout()
      }
    },
    onError: (error) => {
      console.log(error.message);
    }
  }) 
}