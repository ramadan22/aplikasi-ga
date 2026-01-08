import { Role } from '@/constants/Role';
import { useState } from 'react';
import { IDataDetail, IForm, IProfileImage } from '../types';

const UseForm = () => {
  const [form, setForm] = useState<IForm>({
    firstName: '',
    lastName: '',
    phone: '',
    image: null,
  });

  const handleInitValue = (data: IDataDetail) => {
    setForm({
      firstName: data.firstName,
      lastName: data.lastName || '',
      phone: data.phone || '',
      image: data.imageId
        ? {
            id: data?.imageId || '',
            url: data.image || '',
          }
        : null,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm(prev => ({ ...prev, [id]: value }));
  };

  const handleChangeImage = (value: IProfileImage) => {
    setForm(prev => ({
      ...prev,
      image: value,
    }));
  };

  const convertFormPayload = (data: Partial<IDataDetail> | undefined) => {
    return {
      id: data?.id || '',
      firstName: form.firstName || '',
      lastName: form.lastName || '',
      email: data?.email || '',
      imageId: form.image?.id || '',
      // phoneNumber: formParams.phone || '',
      socialMedia: data?.socialMedia || ([] as string[]),
      role: data?.role || Role.STAFF,
    };
  };

  return {
    form,
    setForm,
    handleChange,
    handleChangeImage,
    convertFormPayload,
    handleInitValue,
  };
};

export default UseForm;
