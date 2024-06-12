import Conversation from "../../database/models/conversation";
import Messages from "../../database/models/message";

export async function registerConversationService(
  firstMessage: boolean,
  message: string,
  userId: string,
  sender: string,
  conversationId?: string
) {

  console.log(conversationId)

  if (firstMessage) {
    const newConversation = await Conversation.create({
      userId: userId,
      title: message,
    });

    console.log('aoba')

    const newMessage = await Messages.create({
      conversationId: newConversation.id,
      sender: sender,
      message: message,
    });

    console.log('aoba --> ', newMessage);

    return newMessage;
  }

  if(conversationId) {

    console.log('tem conversationId')
    const newMessage = await Messages.create({
      conversationId: conversationId,
      sender: sender,
      message: message,
    })
    return newMessage;
  }
}
