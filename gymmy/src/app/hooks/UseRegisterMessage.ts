import axiosHttp from "@/utils/axiosHttp";
import { useMutation } from "@tanstack/react-query";

interface IQuestion {
  question: string;
}

export default function useRegisterMessages(token:string) {
  const registerMessage = async (messageInfo:any) => {
    const data = await axiosHttp.post("/register", messageInfo, {headers: {Authorization: `Bearer ${token}`}});
    return data.data;
  };
  return useMutation({ mutationKey: ["register"], mutationFn: registerMessage });
}
