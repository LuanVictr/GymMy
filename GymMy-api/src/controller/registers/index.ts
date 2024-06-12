import { Request, Response } from "express";
import { registerConversationService } from "../../services/registers";

export const registerConversation = async (req: Request, res: Response) => {
  try {
    const { firstMessage, message, userId, sender, conversationId } = req.body;

    const newConversation = await registerConversationService(
      firstMessage,
      message,
      userId,
      sender,
      conversationId && conversationId 
    );

    res.status(200).json(newConversation);
  } catch (error: any) {
    res
      .status(error.status ? error.status : 500)
      .json({ error: error.message });
  }
};
