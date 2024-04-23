import { Request, Response } from "express";


const registerUser = async (req: Request, res: Response) => {
  const newUserInfo = req.body;

  res.status(200).json({message: 'sucess'});
};

export default registerUser;
