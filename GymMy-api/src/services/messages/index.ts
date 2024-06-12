import Messages from "../../database/models/message";

export async function getMessagesFromConversation(id: string) {
  const allMessages = await Messages.findAll({
    where: {
      conversationId: id,
    },
    raw: true,
    order: [["createdAt", "ASC"]],
  });

  return allMessages;
}

// fazer get messages from conversation
