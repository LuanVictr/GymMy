import User from "../../database/models/user";
import * as crypto from 'crypto';
import { generateToken } from "../../utils/jwt/tokenGenerator";

export interface IUserLogin {
  name: string,
  password: string,
}

async function loginService(userInfo:IUserLogin) {
  
  const [userFound] = await User.findAll({
    where: {
      name: userInfo.name,
      password: crypto.createHash('md5').update(userInfo.password).digest('hex')
    }
  });

  if (!userFound) {
   return false;
  }

  const token = generateToken({name: userFound.name, id: userFound.id});

  return token;
}

export default loginService;