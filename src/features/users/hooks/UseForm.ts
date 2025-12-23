'use client';

import { Role, RoleLabel } from '@/constants/Role';
import { ValidationForm } from '@/lib/valibot';
import { useState } from 'react';
import { minLength, object, pipe, string } from 'valibot';
import { DataUsers } from '../types';
import { FormOption, FormParams } from '../types/Form';

const UseForm = (data: DataUsers | undefined) => {
  const usersSchema = object({
    firstName: pipe(string(), minLength(1, 'First Name is required')),
    email: pipe(string(), minLength(1, 'Email is required')),
    role: pipe(string(), minLength(1, 'Role is required')),
  });

  const { validateForm, validateField } = ValidationForm(usersSchema);

  const [form, setForm] = useState<FormParams>({
    id: data?.id || '',
    firstName: data?.firstName || '',
    email: data?.email || '',
    role: data
      ? {
          label: data?.role,
          value: RoleLabel[data?.role],
        }
      : null,
  });

  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>({});
  // const [keywordCategory, setKeywordCategory] = useState('');

  const convertFormParams = (form: FormParams) => {
    return {
      firstName: form.firstName,
      email: form.email,
      role: form.role?.value as Role,
    };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type } = e.target;

    setForm(prev => ({
      ...prev,
      [id]: type === 'number' ? (value === '' ? '' : Number(value)) : value,
    }));
  };

  // const handleChangeImage = (value: string) => {
  //   setForm(prev => ({
  //     ...prev,
  //     image: value,
  //   }));
  // };

  // const handleChangeRadio = (value: string) => {
  //   setForm(prev => ({
  //     ...prev,
  //     isMaintenance: value === '1',
  //   }));
  // };

  const handleSelect = (item: FormOption) => {
    setForm(prev => ({ ...prev, role: item }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement> | HTMLInputElement | null) => {
    const el = e instanceof HTMLInputElement ? e : e?.target;

    if (!el) return;

    const { id, required } = el;

    if (required) {
      const error = validateField({ ...form, role: el?.value || '' }, id);
      setErrors(prev => ({ ...prev, [id]: error }));
    }
  };

  const validate = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateForm({ ...form, role: form.role?.value || '' });

    if (!result.success) {
      setErrors(result.errors);
      return false;
    }

    return true;
  };

  const getRoleList = Object.values(Role).map(value => ({
    label: RoleLabel[value],
    value,
  }));

  return {
    form,
    errors,
    handleChange,
    // handleChangeImage,
    // handleChangeRadio,
    handleSelect,
    handleBlur,
    validate,
    // keywordCategory,
    // setKeywordCategory,
    convertFormParams,
    getRoleList,
  };
};

export default UseForm;
