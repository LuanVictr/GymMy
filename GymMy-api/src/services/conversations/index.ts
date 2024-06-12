import Conversation from "../../database/models/conversation";
import { STATUS } from "../../enums/status";

export async function getAllConversationsByUserIdService(id: string) {
  const allConversations = await Conversation.findAll({
    where: { userId: id },
    raw: true,
    order: [["createdAt", "DESC"]],
  });

  return allConversations;
}

export async function deleteConversationByIdService(id: string) {
  const conversationToDelete = await Conversation.findOne({ where: { id } });

  if (!conversationToDelete) {
    throw {
      status: STATUS.NOT_FOUND,
      message: "Conversation does not exist",
    };
  }

  const deletedConversation = await Conversation.destroy({ where: { id } });

  return deletedConversation;
}
