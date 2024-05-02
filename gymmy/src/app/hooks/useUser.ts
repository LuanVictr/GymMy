import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

export default function useUser() {
  if (typeof window !== 'undefined') {
    dotenv.config();
    
    const secret = process.env.REACT_APP_JWT_SECRET || '3Gk7sR2P8eF';
    const token = localStorage.getItem('token') || '';

    if (token) {
      try {
        const user = jwt.verify(token, secret) as JwtPayload;
        return user.name;
      } catch (error) {
        console.error('Error verifying JWT:', error);
      }
    } else {
      console.error('Token not found in localStorage');
    }

  } else {
    console.error('Window object is not defined. This code is meant to run in a browser environment.');
  }

  return false;
}