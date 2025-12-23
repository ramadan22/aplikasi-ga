import { Role } from '@/constants/Role';
import { useState } from 'react';
import { IDataDetail } from '../types';

const UseForm = () => {
  const [form, setForm] = useState<Partial<IDataDetail>>({
    firstName: '',
    lastName: '',
    phone: '',
    image: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm(prev => ({ ...prev, [id]: value }));
  };

  const handleChangeImage = (value: string) => {
    setForm(prev => ({
      ...prev,
      image: value,
    }));
  };

  const convertFormPayload = (formParams: Partial<IDataDetail>) => {
    return {
      id: formParams?.id || '',
      firstName: formParams.firstName || '',
      lastName: formParams.lastName || '',
      email: formParams.email || '',
      image: formParams.image || '',
      // phoneNumber: formParams.phone || '',
      socialMedia: formParams.socialMedia || ([] as string[]),
      role: formParams.role || Role.STAFF,
    };
  };

  return {
    form,
    setForm,
    handleChange,
    handleChangeImage,
    convertFormPayload,
  };
};

export default UseForm;
