import { celebrate, Joi } from "celebrate";

const conversationSchema = {
  firstMessage: Joi.boolean().required(),
  message: Joi.string().required(),
  sender: Joi.string().required(),
  userId: Joi.string().required(),
  conversationId: Joi.string(),
};

const create = celebrate(
  {
    body: Joi.object({
      ...conversationSchema
    }),
  },
  {
    abortEarly: true,
  }
)

export default { create };