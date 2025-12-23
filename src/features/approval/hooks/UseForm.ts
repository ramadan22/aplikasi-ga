'use client';

import { RequestStatus, SubmissionType, SubmissionTypeLabel } from '@/constants/Approval';
import { SubmissionTypes } from '@/data/Approval';
import { IApproval } from '@/services/approval/types';
import { IPostParams, IPutParams } from '@/services/approval/types/Request';
import { useState } from 'react';
import { array, minLength, object, pipe, safeParse, string } from 'valibot';
import { OptionForm, ParamsForm } from '../types/Form';

const UseForm = (data: IApproval | undefined) => {
  const assetRequestSchema = object({
    sn: pipe(string(), minLength(1, 'Serial number is required')),
    name: pipe(string(), minLength(1, 'Name is required')),
    category_id: pipe(string(), minLength(1, 'Category is required')),
  });

  const schema = object({
    submissionType: pipe(string(), minLength(1, 'Submission type is required')),
    approvedBy: pipe(
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
    name: '',
    quantity: 1,
    category: null,
  };

  const [form, setForm] = useState<ParamsForm>({
    id: data?.id,
    submissionType: data?.submissionType
      ? { label: SubmissionTypeLabel[data?.submissionType], value: data?.submissionType }
      : null,
    status: data?.status || null,
    notes: data?.notes || '',
    approvedBy: [],
    requestedFor: null,
    assetRequest: [defaultAssetRequest],
  });

  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [keywordCategory, setKeywordCategory] = useState('');
  const [approversKey, setApproversKey] = useState('');
  const [userKey, setUserKey] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { id, value, type } = e.target;

    setForm(prev => ({
      ...prev,
      [id]: type === 'number' ? (value === '' ? '' : Number(value)) : value,
    }));
  };

  const handleSelect = (key: string, value: string | OptionForm[] | OptionForm | null) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleChangeCategory = (idx: string, key: 'name' | 'quantity', value: string) => {
    const assetRequest = form.assetRequest;
    const findIndex = assetRequest.findIndex(row => row.idx === idx);

    if (findIndex > -1) {
      if (key === 'name') assetRequest[findIndex].name = value;
      if (key === 'quantity') assetRequest[findIndex].quantity = Number(value);
    }

    setForm(prev => ({ ...prev, assetRequest }));
  };

  const handleSelectCategory = (idx: string, value: OptionForm) => {
    const assetRequest = form.assetRequest;
    const findIndex = assetRequest.findIndex(row => row.idx === idx);

    if (findIndex > -1) {
      assetRequest[findIndex].category = value;
    }

    setForm(prev => ({ ...prev, assetRequest }));
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

      setErrors(newErrors);
      return false;
    }

    return true;
  };

  const addItemAssetRequest = () => {
    const items = [...form.assetRequest];
    let idx: string;

    do {
      idx = getRandomTwoDigit();
    } while (items.some(item => item.idx === idx));

    items.push({ ...defaultAssetRequest, idx });
    setForm({ ...form, assetRequest: items });
  };

  const removeItemAssetRequest = (idx: string) => {
    const items = form.assetRequest.filter(item => item.idx !== idx);
    setForm({ ...form, assetRequest: items });
  };

  const convertFormParams = (approval: ParamsForm): IPostParams | IPutParams => {
    const assetsPayload = approval.assetRequest.flatMap(row => {
      const qty = Number(row.quantity) || 1;

      if (
        qty === 1 &&
        (!row.name || row.name.trim() === '') &&
        (!row.category?.value || row.category?.value.trim() === '')
      ) {
        return [];
      }

      return Array.from({ length: qty }).map(() => ({
        name: row.name,
        isMaintenance: false,
        categoryId: row.category?.value ?? '',
      }));
    });

    const signaturesPayload = approval.approvedBy.map(row => ({
      userId: row.value,
    }));

    const payload = {
      id: approval?.id || null,
      notes: approval.notes,
      submissionType: approval.submissionType?.value as SubmissionType,
      requestedForId: approval.requestedFor?.value || '',
      status: (approval.status as RequestStatus) || RequestStatus.DRAFT,
      assets: assetsPayload,
      signatures: signaturesPayload,
    };

    return payload;
  };

  return {
    form,
    errors,
    handleChange,
    handleSelect,
    handleSelectCategory,
    handleChangeCategory,
    handleBlur,
    validate,
    keywordCategory,
    setKeywordCategory,
    approversKey,
    setApproversKey,
    userKey,
    setUserKey,
    SubmissionTypes,
    convertFormParams,
    addItemAssetRequest,
    removeItemAssetRequest,
  };
};

export default UseForm;
