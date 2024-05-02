import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secret = process.env.JWT_SECRET ?? '3Gk7sR2P8eF';

export function generateToken (payload: {name: string}) {
  return jwt.sign({name: payload.name}, secret , { expiresIn: '3d' });
}

export function validateToken (token:string) {
  return jwt.verify(token, secret, (err, decoded) => {
    if(err) {
      return false;
    }
    return true;
  });
}