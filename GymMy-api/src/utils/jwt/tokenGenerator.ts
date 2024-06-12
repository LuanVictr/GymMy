import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secret = process.env.JWT_SECRET ?? '';

export function generateToken (payload: {name: string, id: string}) {
  return jwt.sign({id: payload.id, name: payload.name}, secret , { expiresIn: '3d' });
}

export function validateToken(tokenWithBearer: string): string {
  const token = tokenWithBearer.split(" ")[1];
  try {
      const decoded: any = jwt.verify(token, secret);
      return decoded;
  } catch (error) {
      console.error(error);
      throw new Error('Invalid token');
  }
}
