'use client';

import { PlusIcon } from '@/assets/icons';
import { messageSuccess } from '@/lib/react-toastify';
import Button from '@/ui/components/simple/button/Button';
import ButtonWithSpinner from '@/ui/components/simple/button/ButtonWithSpinner';
import Input from '@/ui/components/simple/form/input/InputField';
import TextArea from '@/ui/components/simple/form/input/TextArea';
import SearchSelect from '@/ui/components/simple/form/SearchSelect';
import { useSession } from 'next-auth/react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { GetApprovers, GetUsers, Post, Update } from './hooks/UseApproval';
import { Get as CategoryGet } from './hooks/UseCategories';
import UseForm from './hooks/UseForm';
import { PropsForm } from './types/Form';

const Form = ({ id, process = '', data, handleModal, handleSuccess }: PropsForm) => {
  const { data: loginData } = useSession();

  const {
    form,
    handleChange,
    handleSelect,
    handleSelectCategory,
    handleChangeCategory,
    approversKey,
    setApproversKey,
    keywordCategory,
    setKeywordCategory,
    userKey,
    setUserKey,
    convertFormParams,
    SubmissionTypes,
    addItemAssetRequest,
    removeItemAssetRequest,
  } = UseForm(data);

  const { mutate: post, isPending: pendingPost } = Post({
    onSuccess: res => {
      messageSuccess(res.message);
      handleSuccess(res.success);
    },
  });

  const { mutate: update, isPending: pendingUpdate } = Update({
    onSuccess: res => {
      messageSuccess(res.message);
      handleSuccess(res.success);
    },
  });

  const { data: getApprovers, isLoading: loadingGetApprovers } = GetApprovers({
    keyword: approversKey,
  });

  const { data: getCategories, isLoading: loadingGetCategories } = CategoryGet({
    keyword: keywordCategory,
  });

  const { data: getUsers, isLoading: loadingGetUsers } = GetUsers({
    keyword: userKey,
    exceptUserId: loginData?.user.id,
  });

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        if (!id) post(convertFormParams(form));
        if (id) update(convertFormParams(form));
      }}
    >
      <div>
        <h5 className="mb-2 font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl">
          {id ? 'Edit' : 'Add'}
          &nbsp; Approval
        </h5>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          View and manage approval records to ensure transparency and control over inventory-related
          decisions.
        </p>
      </div>
      <div className="mt-8">
        {process === '' && (
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Submission type
            </label>
            {/* <Select
              defaultValue={form?.submissionType?.value}
              options={SubmissionTypes}
              onChange={value =>
                handleSelect(
                  'submissionType',
                  SubmissionTypes.find(row => row.value === value) || null,
                )
              }
            /> */}
            <SearchSelect
              data={SubmissionTypes}
              selected={form?.submissionType}
              onSelect={value => handleSelect('submissionType', value)}
              // onSearchNotFound={value => setUserKey(value)}
              loading={loadingGetUsers}
            />
          </div>
        )}
        {loginData?.user.role !== 'STAFF' && (
          <div className="mt-6">
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Request For
            </label>
            <SearchSelect
              data={getUsers}
              selected={form.requestedFor}
              onSelect={value => handleSelect('requestedFor', value)}
              onSearchNotFound={value => setUserKey(value)}
              loading={loadingGetUsers}
            />
          </div>
        )}
        {loginData?.user.role === 'GA' && (
          <div className="mt-6">
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Approved By
            </label>
            <SearchSelect
              isMultiple
              data={getApprovers?.data || []}
              selected={form.approvedBy}
              onSelect={value => handleSelect('approvedBy', value)}
              onSearchNotFound={value => setApproversKey(value)}
              loading={loadingGetApprovers}
            />
          </div>
        )}
        {process === 'DRAFT' && loginData?.user.role === 'GA' && (
          <div className="mt-6 pt-4 pb-6 border-y border-gray-200 dark:border-gray-800">
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Asset Request
            </label>
            <div className="flex flex-col gap-y-4">
              {form.assetRequest.map(item => (
                <div key={item.idx} className="flex gap-x-2 items-center">
                  <div className="flex-1 flex gap-x-2 justify-stretch">
                    <div className="w-[50%]">
                      <Input
                        size="sm"
                        placeholder="Name"
                        value={item.name}
                        onChange={e => handleChangeCategory(item.idx, 'name', e.target.value)}
                      />
                    </div>
                    <div className="flex-1">
                      <SearchSelect
                        size="sm"
                        data={getCategories}
                        selected={item?.category}
                        onSelect={value => handleSelectCategory(item.idx, value)}
                        onSearchNotFound={value => setKeywordCategory(value)}
                        loading={loadingGetCategories}
                        // error={!!errors.categoryId}
                        // hint={errors.categoryId}
                      />
                    </div>
                    <div className="w-20">
                      <Input
                        size="sm"
                        type="number"
                        placeholder="Qty"
                        value={item.quantity}
                        onChange={e => handleChangeCategory(item.idx, 'quantity', e.target.value)}
                      />
                    </div>
                  </div>
                  {form.assetRequest.length > 1 && (
                    <Button
                      size="xs"
                      onClick={() => removeItemAssetRequest(item.idx)}
                      className="p-0 text-error-500 dark:text-error-400 hover:text-error-600 bg-transparent border-none !shadow-none hover:bg-transparent"
                    >
                      <FaRegTrashAlt size={15} />
                    </Button>
                  )}
                </div>
              ))}
            </div>
            <div className="w-full text-center mt-4">
              <Button
                onClick={addItemAssetRequest}
                type="button"
                variant="outline"
                size="xs"
                className="p-2 gap-x-0.5 rounded-sm w-full"
              >
                <PlusIcon />
                item
              </Button>
            </div>
          </div>
        )}
        <div className="mt-6">
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Note
          </label>
          <TextArea id="notes" value={form.notes} onChange={handleChange} className="resize-none" />
        </div>
      </div>
      <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-end">
        <Button
          onClick={() => handleModal(false)}
          type="button"
          className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
        >
          Close
        </Button>
        <ButtonWithSpinner
          isLoading={pendingUpdate || pendingPost}
          disabled={pendingUpdate || pendingPost}
          type="submit"
        >
          {id ? (process ? 'Process' : 'Edit') : 'Add'}
          &nbsp; Approval
        </ButtonWithSpinner>
      </div>
    </form>
  );
};

export default Form;
