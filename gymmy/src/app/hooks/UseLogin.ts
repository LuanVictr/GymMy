import axiosHttp from '@/utils/axiosHttp';
import { useMutation } from '@tanstack/react-query';

export interface IUserLogin {
  name: string,
  password: string,
}

export default function useLogin() {
  const loginUser = async (userInfo:IUserLogin) => {
    const data = await axiosHttp.post('/login', userInfo);
    return data.data.token;
  }
  return(
    useMutation({ mutationKey: ['login'], mutationFn: loginUser })
  )
};