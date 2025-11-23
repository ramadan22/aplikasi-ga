import AxiosInstance from '@/lib/axios';
import { IPostLogin } from '@/services/authentication/types/Request';
import { signIn } from 'next-auth/react';

export const handleLogin = async (params: IPostLogin) => {
  const result = await signIn('credentials', {
    email: params.email,
    password: params.password,
    redirect: false,
  });

  await AxiosInstance.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/session`, {
    withCredentials: true,
  });

  return result;
};
