import { ValidationForm } from '@/lib/valibot';
import { useState } from 'react';
import { minLength, object, pipe, string } from 'valibot';
import { FormParams } from '../types';

const UseForm = (data: FormParams | undefined) => {
  const categorySchema = object({
    name: pipe(string(), minLength(1, 'Name is required')),
    prefix: pipe(string(), minLength(1, 'Prefix is required')),
  });

  const { validateForm, validateField } = ValidationForm(categorySchema);

  const [form, setForm] = useState({ name: '', prefix: '', is_device: false, ...data });
  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm(prev => ({ ...prev, [id]: value }));
  };

  const handleSwitch = (value: boolean) => {
    setForm(prev => ({ ...prev, is_device: value }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { id } = e.target;
    const error = validateField(form, id as string);
    setErrors(prev => ({ ...prev, [id]: error }));
  };

  const validate = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateForm(form);

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
    handleSwitch,
    handleBlur,
    validate,
  };
};

export default UseForm;
