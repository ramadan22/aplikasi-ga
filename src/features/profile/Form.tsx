'use client';

import ButtonWithSpinner from '@/ui/components/simple/button/ButtonWithSpinner';
import Input from '@/ui/components/simple/form/input/InputField';
import Label from '@/ui/components/simple/form/Label';
import Select from '@/ui/components/simple/form/Select';
import { useState } from 'react';

const roleOptions = [
  { label: 'GA', value: 'GA' },
  { label: 'STAFF', value: 'STAFF' },
];

// type UserFormProps = {
//   onSubmit: (formData: UserFormData) => void;
//   isLoading?: boolean;
// };

type UserFormData = {
  firstName: string;
  lastName: string;
  image: string;
  socialMedia: string;
  role: 'GA' | 'STAFF';
};

const Form = () => {
  const [form, setForm] = useState<UserFormData>({
    firstName: '',
    lastName: '',
    image: '',
    socialMedia: '',
    role: 'GA',
  });

  const handleChange = (key: keyof UserFormData, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h5 className="mb-2 font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl">
          Add User
        </h5>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Fill the user information form below.
        </p>
      </div>

      <div className="mt-8 space-y-6">
        <div>
          <Label>
            First Name&nbsp;
            <span className="text-error-500">*</span>
          </Label>
          <Input
            placeholder="Enter first name"
            value={form.firstName}
            onChange={e => handleChange('firstName', e.target.value)}
          />
        </div>

        <div>
          <Label>Last Name</Label>
          <Input
            placeholder="Enter last name"
            value={form.lastName}
            onChange={e => handleChange('lastName', e.target.value)}
          />
        </div>

        <div>
          <Label>Image URL</Label>
          <Input
            placeholder="Paste image URL"
            value={form.image}
            onChange={e => handleChange('image', e.target.value)}
          />
        </div>

        <div>
          <Label>Social Media</Label>
          <Input
            placeholder="Enter social media link or username"
            value={form.socialMedia}
            onChange={e => handleChange('socialMedia', e.target.value)}
          />
        </div>

        <div>
          <Label>
            Role&nbsp;
            <span className="text-error-500">*</span>
          </Label>
          <Select
            options={roleOptions}
            defaultValue={form.role}
            onChange={value => handleChange('role', value)}
          />
        </div>
      </div>

      <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-end">
        <ButtonWithSpinner type="submit">Submit</ButtonWithSpinner>
      </div>
    </form>
  );
};

export default Form;
