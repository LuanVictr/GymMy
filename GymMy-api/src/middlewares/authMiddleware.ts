import { Request, Response, NextFunction } from "express";
import { STATUS } from "../enums/status";
import { validateToken } from "../utils/jwt/tokenGenerator";

export const AuthUser = (req:Request, res:Response, next:NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(STATUS.FORBIDDEN).json({error: 'Token not found'});
  }

  const user = validateToken(token);

  next();
}