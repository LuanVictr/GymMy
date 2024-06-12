import { Request, Response } from "express";
import { STATUS } from "../../enums/status";
import { getMessagesFromConversation } from "../../services/messages";

export const getMessagesFromConversationId = async (req: Request,
  res: Response) => {
  

    const { id } = req.params;

    try {
    const allMessages = await getMessagesFromConversation(id);

    return res.status(STATUS.OK).json(allMessages);
    } catch (error:any) {
      return res.status(error.status ? error.status : STATUS.INTERNAL_SERVER_ERROR)
    }
}