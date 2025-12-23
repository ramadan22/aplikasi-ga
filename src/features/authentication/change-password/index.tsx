'use client';

import { EyeCloseIcon, EyeIcon } from '@/assets/icons';
import { messageError } from '@/lib/react-toastify';
import { useSessionStore } from '@/lib/zustand/SessionStore';
import ButtonWithSpinner from '@/ui/components/simple/button/ButtonWithSpinner';
import Input from '@/ui/components/simple/form/input/InputField';
import Label from '@/ui/components/simple/form/Label';
import { useSearchParams } from 'next/navigation';
import { Post } from './hooks/UseChangePassword';
import UseForm from './hooks/UseForm';

const FormChangePasswordFeature = () => {
  const isFromProfilePage = useSearchParams().get('isFromProfilePage') === '1';
  const { updateValueSession } = useSessionStore();

  const { mutate: submitChangePassword, isPending } = Post({
    onSuccess: response => {
      updateValueSession(response?.data || null);
      window.location.replace(!isFromProfilePage ? '/update-profile' : '/profile');
    },
    onError: err => {
      messageError(err.message);
    },
  });

  const {
    oldPassword,
    setOldPassword,
    showOldPassword,
    setShowOldPassword,
    newPassword,
    setNewPassword,
    showNewPassword,
    setShowNewPassword,
    confirmPassword,
    setConfirmPassword,
    showConfirmPassword,
    setShowConfirmPassword,
  } = UseForm();

  return (
    <form
      onSubmit={event => {
        event.preventDefault();

        const payload: { oldPassword?: string; newPassword: string; confirmPassword: string } = {
          newPassword,
          confirmPassword,
        };

        if (oldPassword) payload.oldPassword = oldPassword;
        submitChangePassword(payload);
      }}
    >
      <div className="space-y-6">
        <div>
          <h5 className="mb-2 font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl">
            Change Password
          </h5>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Secure your account by updating your password. Make sure your new password is strong and
            not used elsewhere.
          </p>
        </div>
        {isFromProfilePage && (
          <div>
            <Label>
              Old Password&nbsp;
              <span className="text-error-500">*</span>
              &nbsp;
            </Label>
            <div className="relative">
              <Input
                placeholder="Enter your old password"
                type={showOldPassword ? 'text' : 'password'}
                defaultValue={oldPassword}
                onChange={event => setOldPassword(event.target.value)}
              />
              <span
                onClick={() => setShowOldPassword(!showOldPassword)}
                className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
              >
                {showOldPassword ? (
                  <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                ) : (
                  <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                )}
              </span>
            </div>
          </div>
        )}
        <div>
          <Label>
            New Password&nbsp;
            <span className="text-error-500">*</span>
            &nbsp;
          </Label>
          <div className="relative">
            <Input
              placeholder="Enter your new password"
              type={showNewPassword ? 'text' : 'password'}
              defaultValue={newPassword}
              onChange={event => setNewPassword(event.target.value)}
            />
            <span
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
            >
              {showNewPassword ? (
                <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
              ) : (
                <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
              )}
            </span>
          </div>
        </div>
        <div>
          <Label>
            Confirm Password&nbsp;
            <span className="text-error-500">*</span>
            &nbsp;
          </Label>
          <div className="relative">
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Enter your confirm password"
              defaultValue={confirmPassword}
              onChange={event => setConfirmPassword(event.target.value)}
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
            >
              {showConfirmPassword ? (
                <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
              ) : (
                <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
              )}
            </span>
          </div>
        </div>
        <ButtonWithSpinner type="submit" isLoading={isPending} className="sm:w-full">
          Sign in
        </ButtonWithSpinner>
      </div>
    </form>
  );
};

export default FormChangePasswordFeature;
