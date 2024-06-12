import { Request, Response } from "express";
import { STATUS } from "../../enums/status";
import {
  deleteConversationByIdService,
  getAllConversationsByUserIdService,
} from "../../services/conversations";

export const getAllConversationsByUserId = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  try {
    const allConversations = await getAllConversationsByUserIdService(id);

    return res.status(STATUS.OK).json(allConversations);
  } catch (error: any) {
    return res.status(
      error.status ? error.status : STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

export const deleteConversationById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedConversation = await deleteConversationByIdService(id);

    return res.status(STATUS.OK).json({ deletedConversation: deletedConversation });
  } catch (error: any) {
    return res.status(
      error.status ? error.status : STATUS.INTERNAL_SERVER_ERROR
    ).json({error: error.message});
  }
};
