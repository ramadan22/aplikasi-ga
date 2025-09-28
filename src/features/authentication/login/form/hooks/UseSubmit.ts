'use client';
import { handleLogin } from '../services/Login';
import { LoginParams } from '../types/UseSubmit';

const UseSubmit = () => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>, params: LoginParams) => {
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
