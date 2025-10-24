'use client';

import { ValidationForm } from '@/lib/valibot';
import { useState } from 'react';
import { minLength, object, pipe, string } from 'valibot';
import { DataAssetsByName, FormParams, Option } from '../types';

const UseForm = (data: DataAssetsByName | undefined) => {
  const assetSchema = object({
    name: pipe(string(), minLength(1, 'Name is required')),
    serialNumber: pipe(string(), minLength(1, 'Serial Number is required')),
    categoryId: pipe(string(), minLength(1, 'Category is required')),
    image: pipe(string(), minLength(1, 'Image is required')),
  });

  const { validateForm, validateField } = ValidationForm(assetSchema);

  const [form, setForm] = useState<FormParams>({
    id: data?.id || '',
    name: data?.name || '',
    categoryId: data?.category.id || '',
    image: '',
    isMaintenance: data?.isMaintenance || false,
    serialNumber: data?.serialNumber || '',
    category: data
      ? {
          label: data?.category.name,
          value: data?.category.id,
        }
      : null,
  });

  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>({});
  const [keywordCategory, setKeywordCategory] = useState('');

  const convertFormParams = (form: FormParams) => {
    return {
      id: form?.id || '',
      name: form.name,
      categoryId: form.category?.value || '',
      image: form.image || '',
      isMaintenance: form.isMaintenance || false,
      serialNumber: form.serialNumber || '',
    };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type } = e.target;

    setForm(prev => ({
      ...prev,
      [id]: type === 'number' ? (value === '' ? '' : Number(value)) : value,
    }));
  };

  const handleChangeImage = (value: string) => {
    setForm(prev => ({
      ...prev,
      image: value,
    }));
  };

  const handleChangeRadio = (value: string) => {
    setForm(prev => ({
      ...prev,
      isMaintenance: value === '1',
    }));
  };

  const handleSelect = (item: Option) => {
    setForm(prev => ({ ...prev, category: item }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { id, required } = e.target;

    if (required) {
      const error = validateField(form, id as string);
      setErrors(prev => ({ ...prev, [id]: error }));
    }
  };

  const validate = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateForm(convertFormParams(form));

    console.log('result', result);

    if (!result.success) {
      setErrors(result.errors);
      return false;
    }

    return true;
  };

  return {
    form,
    errors,
    handleChange,
    handleChangeImage,
    handleChangeRadio,
    handleSelect,
    handleBlur,
    validate,
    keywordCategory,
    setKeywordCategory,
    convertFormParams,
  };
};

export default UseForm;
