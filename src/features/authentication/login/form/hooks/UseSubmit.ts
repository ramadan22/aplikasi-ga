'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { handleLogin } from '../services/Login';
import { LoginParams } from '../types/UseSubmit';

const UseSubmit = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>, params: LoginParams) => {
    event.preventDefault();

    const from = searchParams.get('from');
    const result = await handleLogin({
      username: params.username,
      password: params.password,
    });

    if (result?.status === 200) router.push(from ?? '/');
    // if (result?.status !== 200) messageError(`${result?.error}`);
  };

  return { handleSubmit };
};

export default UseSubmit;
