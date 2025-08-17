import { signIn } from 'next-auth/react';
import { LoginParams } from '../types/UseSubmit';

export const handleLogin = async (params: LoginParams) => {
  const result = await signIn('credentials', {
    username: params.username,
    password: params.password,
    redirect: false,
  });

  return result;
};
