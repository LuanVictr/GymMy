import axiosHttp from "@/utils/axiosHttp";
import { useMutation } from "@tanstack/react-query";

interface IQuestion {
  question: string;
}

export default function useQuestion() {
  const requestQuestion = async (question:IQuestion) => {
    const data = await axiosHttp.post("/question", question);
    return data.data.answer;
  };
  return useMutation({ mutationKey: ["question"], mutationFn: requestQuestion });
}
