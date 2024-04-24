import { Request, Response } from "express";
import * as crypto from 'crypto';
import registerUserService from "../../services/sign";


const registerUser = async (req: Request, res: Response) => {
  const newUserInfo = req.body;

  const newUser = {
    name: newUserInfo.name,
    password: crypto.createHash('md5').update(newUserInfo.password).digest('hex'),
  }

  const createdUser = await registerUserService(newUser);

  res.status(201).json({message: `User ${createdUser?.name} was created with id ${createdUser?.id}`});
};

export default registerUser;
