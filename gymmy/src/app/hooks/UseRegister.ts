import axiosHttp from '@/utils/axiosHttp';
import { useMutation } from '@tanstack/react-query';

export interface IUserRegister {
  name: string,
  password: string,
}

export default function useRegister() {
  const registerUser = async (userInfo:IUserRegister) => {
    const data = axiosHttp.post('/sign', userInfo);
    return data;
  }
  return(
    useMutation({ mutationKey: ['sign'], mutationFn: registerUser })
  )
};