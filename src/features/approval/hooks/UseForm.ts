'use client';

import { DummyEmail, SubmissionTypes } from '@/data/Approval';
import { useState } from 'react';
import { array, minLength, object, pipe, safeParse, string } from 'valibot';
import { FormParams, Option } from '../types';

const UseForm = (data: FormParams | undefined) => {
  const assetRequestSchema = object({
    sn: pipe(string(), minLength(1, 'Serial number is required')),
    name: pipe(string(), minLength(1, 'Name is required')),
    category_id: pipe(string(), minLength(1, 'Category is required')),
  });

  const schema = object({
    submissionType: pipe(string(), minLength(1, 'Submission type is required')),
    approved_by: pipe(
      array(object({ label: string(), value: string() })),
      minLength(1, 'Approved by is required'),
    ),
    note: pipe(string(), minLength(1, 'Note is required')),
    asset_request: array(assetRequestSchema),
  });

  const getRandomTwoDigit = () => {
    return Math.floor(Math.random() * 100)
      .toString()
      .padStart(2, '0');
  };

  const defaultAssetRequest = {
    idx: getRandomTwoDigit(),
    sn: '',
    name: '',
    category_id: '',
  };

  const [form, setForm] = useState<FormParams>({
    submissionType: '',
    approved_by: [],
    note: '',
    asset_request: [defaultAssetRequest],
    ...data,
  });

  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [keywordCategory, setKeywordCategory] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { id, value, type } = e.target;

    setForm(prev => ({
      ...prev,
      [id]: type === 'number' ? (value === '' ? '' : Number(value)) : value,
    }));
  };

  const handleSelect = (key: string, value: string | Option[]) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { id } = e.target;
    const result = safeParse(schema, form, { abortEarly: false });

    if (!result.success) {
      const fieldError = result.issues.find(issue => issue.path?.[0].key === id);
      setErrors(prev => ({ ...prev, [id]: fieldError?.message }));
    } else {
      setErrors(prev => ({ ...prev, [id]: undefined }));
    }
  };

  const validate = (e: React.FormEvent) => {
    e.preventDefault();
    const result = safeParse(schema, form, { abortEarly: false });

    if (!result.success) {
      // collect all error messages
      const newErrors: Record<string, string> = {};
      for (const issue of result.issues) {
        const pathKey = issue.path?.map(p => p.key).join('.') || 'form';
        newErrors[pathKey] = issue.message;
      }

      console.log('newErrors', newErrors);

      setErrors(newErrors);
      return false;
    }

    return true;
  };

  const addItemAssetRequest = () => {
    const items = [...form.asset_request];
    let idx: string;

    do {
      idx = getRandomTwoDigit();
    } while (items.some(item => item.idx === idx));

    items.push({ ...defaultAssetRequest, idx });
    setForm({ ...form, asset_request: items });
  };

  const removeItemAssetRequest = (idx: string) => {
    const items = form.asset_request.filter(item => item.idx !== idx);
    setForm({ ...form, asset_request: items });
  };

  return {
    form,
    errors,
    handleChange,
    handleSelect,
    handleBlur,
    validate,
    keywordCategory,
    setKeywordCategory,
    SubmissionTypes,
    DummyEmail,
    addItemAssetRequest,
    removeItemAssetRequest,
  };
};

export default UseForm;
