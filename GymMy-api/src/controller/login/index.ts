import { Request, Response } from "express";
import loginService from "../../services/login";

const login = async (req: Request, res: Response) => {
  
  const userInfo = req.body;

  const token = await loginService(userInfo);

  if(!token) {
    return res.status(404).json({error: 'User does not exist.'})
  }

  return res.status(200).json({token: token});

}

export default login;