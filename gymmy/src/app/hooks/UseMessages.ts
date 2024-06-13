import axiosHttp from "@/utils/axiosHttp";
import { queryOptions, useQuery } from "@tanstack/react-query";

export interface IMessage {
    id: string;
    conversationId: string;
    message: string;
    sender:string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  }

export default function useAllMessagesFromConversation(id: string, token: string) {

  const requestMessages = async (id: string) => {
    const data = await axiosHttp.get(`/conversation/${id}/messages`, {headers: {Authorization: `Bearer ${token}`}});
    return data.data;
  };

  return useQuery(
    queryOptions({
      queryKey: [`/conversation/${id}/messages`],
      queryFn: () => requestMessages(id),
      enabled: !!id,
    })
  );
}

// fazer o useMessages e o registerConversation