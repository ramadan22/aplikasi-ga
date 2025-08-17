'use client';

import { EyeCloseIcon, EyeIcon } from '@/assets/icons';
import Button from '@/ui/components/simple/button/Button';
import Checkbox from '@/ui/components/simple/form/input/Checkbox';
import Input from '@/ui/components/simple/form/input/InputField';
import Label from '@/ui/components/simple/form/Label';
import Link from 'next/link';
import UseForm from './hooks/UseForm';
import UseSubmit from './hooks/UseSubmit';

const FormLoginFeature = () => {
  const {
    username,
    setUsername,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    isChecked,
    setIsChecked,
  } = UseForm();

  const { handleSubmit } = UseSubmit();

  return (
    <form onSubmit={event => handleSubmit(event, { username, password })}>
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
            defaultValue={username}
            onChange={event => setUsername(event.target.value)}
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
        <div>
          <Button type="submit" className="w-full" size="sm">
            Sign in
          </Button>
        </div>
      </div>
    </form>
  );
};

export default FormLoginFeature;
