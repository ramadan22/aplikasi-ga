'use client';
import { IPostLogin } from '@/services/authentication/types/Request';
import { handleLogin } from '../services/Login';

const UseSubmit = () => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>, params: IPostLogin) => {
    event.preventDefault();

    const result = await handleLogin({
      email: params.email,
      password: params.password,
    });

    return result;
  };

  return { handleSubmit };
};

export default UseSubmit;
