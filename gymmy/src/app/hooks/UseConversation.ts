import axiosHttp from "@/utils/axiosHttp";
import { queryOptions, useQuery } from "@tanstack/react-query";

export interface IConversation {
  id: string;
  userId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export default function useAllConversationsFromUser(id: string, token: string) {

  const requestConversations = async (id: string) => {
    const data = await axiosHttp.get(`/conversation/${id}`, {headers: {Authorization: `Bearer ${token}`}});
    return data.data;
  };

  return useQuery(
    queryOptions({
      queryKey: [`/conversation/${id}`],
      queryFn: () => requestConversations(id),
      enabled: !!id,
    })
  );
}
