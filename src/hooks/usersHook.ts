import { loginApi } from "@/api/usersApi";
import { useMutation } from "@tanstack/react-query";

export const useUserLogin = () => {
  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      console.log("login attempt");
      console.log(data)
    },
    onError: (error) => {
      console.log(error.message);
    }
  })
}