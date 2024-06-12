import axiosHttp from "@/utils/axiosHttp";
import { queryOptions, useMutation, useQuery } from "@tanstack/react-query";

export interface IConversation {
  id: string;
  userId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export default function useDeleteConversation( token: string) {
  const deleteConversation = async (id: string) => {
    const data = await axiosHttp.delete(`/conversation/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data.data;
  };

  return useMutation({
    mutationKey: ["conversation"],
    mutationFn: deleteConversation,
  });
}
