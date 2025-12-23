'use client';

import { messageError, messageSuccess } from '@/lib/react-toastify';
import { useUpdateProfile } from '@/lib/zustand/UpdateProfileStore';
import Button from '@/ui/components/simple/button/Button';
import ButtonWithSpinner from '@/ui/components/simple/button/ButtonWithSpinner';
import Label from '@/ui/components/simple/form/Label';
import Input from '@/ui/components/simple/form/input/InputField';
import { ErrorConvertToMessage } from '@/utils';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import UploadFileFeature from '../upload-file';
import UseForm from './hooks/UseForm';
import { Get, UpdateProfile } from './hooks/UseProfile';

const Form = () => {
  const router = useRouter();
  const isMounted = useRef(false);
  const { isFromProfilePage, clear } = useUpdateProfile();
  const { update: updateSession } = useSession();

  const { form, setForm, handleChange, handleChangeImage, convertFormPayload } = UseForm();

  const { data: profile, isLoading } = Get({});

  const { mutate: update, isPending } = UpdateProfile({
    onSuccess: res => {
      updateSession(res.data || null);
      messageSuccess(res.message);
      router.replace(!isFromProfilePage ? '/' : '/profile');
      clear();
    },
    onError: err => {
      messageError(ErrorConvertToMessage(err));
    },
  });

  useEffect(() => {
    if (!isLoading && profile?.data) setForm(profile.data);
  }, [profile, isLoading]);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    return () => {
      clear();
    };
  }, []);

  return (
    <form
      noValidate
      onSubmit={e => {
        // const result = validate(e);
        e.preventDefault();

        const payload = convertFormPayload({
          ...profile?.data,
          ...form,
        });

        update(payload);
      }}
    >
      <div>
        <h5 className="mb-2 font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl">
          Edit Profile
        </h5>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Make changes to your profile information.
        </p>
      </div>

      <div className="mt-8 space-y-6">
        <div>
          <Label>
            First Name&nbsp;
            <span className="text-error-500">*</span>
          </Label>
          <Input
            id="firstName"
            placeholder="Enter first name"
            value={form?.firstName || ''}
            onChange={handleChange}
            // onBlur={handleBlur}
            // error={!!errors.name}
            // hint={errors.name}
          />
        </div>

        <div>
          <Label>
            Last Name&nbsp;
            <span className="text-error-500">*</span>
          </Label>
          <Input
            id="lastName"
            placeholder="Enter last name"
            value={form?.lastName || ''}
            onChange={handleChange}
            // onBlur={handleBlur}
            // error={!!errors.name}
            // hint={errors.name}
          />
        </div>

        <div>
          <Label>
            Phone Number&nbsp;
            <span className="text-error-500">*</span>
          </Label>
          <Input
            id="phone"
            placeholder="Enter phone number"
            value={form?.phone || ''}
            onChange={handleChange}
            // onBlur={handleBlur}
            // error={!!errors.name}
            // hint={errors.name}
          />
        </div>

        <div>
          <Label>Image URL</Label>
          <UploadFileFeature
            id="image"
            usage="assets"
            type="image"
            value={form?.image || ''}
            handleChange={data => handleChangeImage(data?.url || '')}
            // error={!!errors.image}
            // hint={errors.image}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Facebook</Label>
            <Input
              placeholder="Facebook link / username"
              // value={form.facebook}
              // onChange={e => handleChange('facebook', e.target.value)}
            />
          </div>

          <div>
            <Label>X (Twitter)</Label>
            <Input
              placeholder="X link / username"
              // value={form.x}
              // onChange={e => handleChange('x', e.target.value)}
            />
          </div>

          <div>
            <Label>LinkedIn</Label>
            <Input
              placeholder="LinkedIn link / username"
              // value={form.linkedin}
              // onChange={e => handleChange('linkedin', e.target.value)}
            />
          </div>

          <div>
            <Label>Instagram</Label>
            <Input
              placeholder="Instagram link / username"
              // value={form.instagram}
              // onChange={e => handleChange('instagram', e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-end">
        <Button
          onClick={() => router.replace(!isFromProfilePage ? '/' : '/profile')}
          type="button"
          className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
        >
          {!isFromProfilePage ? 'Skip' : 'Cancel'}
        </Button>
        <ButtonWithSpinner disabled={isLoading || isPending} isLoading={isPending} type="submit">
          Update
        </ButtonWithSpinner>
      </div>
    </form>
  );
};

export default Form;
