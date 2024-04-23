import { celebrate, Joi } from "celebrate";

const signSchema = {
  name: Joi.string().required(),
  password: Joi.string().required(),
};

const sign = celebrate(
  {
    body: Joi.object({
      ...signSchema
    }),
  },
  {
    abortEarly: true,
  }
)

export default { sign };