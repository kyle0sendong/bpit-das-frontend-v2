import { loginApi } from "@/api/usersApi";
import { useMutation } from "@tanstack/react-query";
import { useUser } from "@/contexts/UserContext";

export const useUserLogin = () => {
  const { login } = useUser();

  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      if(data != -1) {
        login(data.data.user, data.data.token)
      }
    },
    onError: (error) => {
      console.log(error.message);
    }
  })
}