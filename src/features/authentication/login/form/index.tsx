'use client';

import { EyeCloseIcon, EyeIcon } from '@/assets/icons';
import { messageError } from '@/lib/react-toastify';
import ButtonWithSpinner from '@/ui/components/simple/button/ButtonWithSpinner';
import Checkbox from '@/ui/components/simple/form/input/Checkbox';
import Input from '@/ui/components/simple/form/input/InputField';
import Label from '@/ui/components/simple/form/Label';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import UseForm from './hooks/UseForm';
import UseSubmit from './hooks/UseSubmit';

const FormLoginFeature = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from');

  const {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    isChecked,
    setIsChecked,
    isLoading,
    setIsLoading,
  } = UseForm();

  const { handleSubmit } = UseSubmit();

  return (
    <form
      onSubmit={async event => {
        setIsLoading(true);
        const result = await handleSubmit(event, { email, password });
        if (result?.status === 200) {
          router.push(from ?? '/');
          return;
        }
        setIsLoading(prev => !prev);
        messageError('Email and password are incorrect!');
      }}
    >
      <div className="space-y-6">
        <div>
          <Label>
            Email&nbsp;
            <span className="text-error-500">*</span>
            &nbsp;
          </Label>
          <Input
            placeholder="info@gmail.com"
            type="email"
            defaultValue={email}
            onChange={event => setEmail(event.target.value)}
          />
        </div>
        <div>
          <Label>
            Password&nbsp;
            <span className="text-error-500">*</span>
            &nbsp;
          </Label>
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              defaultValue={password}
              onChange={event => setPassword(event.target.value)}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
            >
              {showPassword ? (
                <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
              ) : (
                <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
              )}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Checkbox checked={isChecked} onChange={setIsChecked} />
            <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
              Keep me logged in
            </span>
          </div>
          <Link
            href="/reset-password"
            className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
          >
            Forgot password?
          </Link>
        </div>
        <ButtonWithSpinner isLoading={isLoading} type="submit" className="sm:w-full">
          Sign in
        </ButtonWithSpinner>
      </div>
    </form>
  );
};

export default FormLoginFeature;
