// import { messageSuccess } from '@/lib/react-toastify';
import Button from '@/ui/components/simple/button/Button';
import ButtonWithSpinner from '@/ui/components/simple/button/ButtonWithSpinner';
import Input from '@/ui/components/simple/form/input/InputField';
// import { Post, Update } from './hooks/UseAssets';
// import { Get as CategoryGet } from './hooks/UseCategories';
import { PlusIcon } from '@/assets/icons';
import TextArea from '@/ui/components/simple/form/input/TextArea';
import SearchSelect from '@/ui/components/simple/form/SearchSelect';
import Select from '@/ui/components/simple/form/Select';
import { useEffect } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import UseForm from './hooks/UseForm';
import { FormProps } from './types';

// const Form = ({ id, data, handleModal, handleSuccess }: FormProps) => {
const Form = ({ id, data, handleModal }: FormProps) => {
  const {
    form,
    handleChange,
    handleSelect,
    // handleBlur,
    validate,
    // keywordCategory,
    // setKeywordCategory,
    // errors,
    // convertFormParams,
    SubmissionTypes,
    DummyEmail,
    addItemAssetRequest,
    removeItemAssetRequest,
  } = UseForm(data);

  // const { mutate: post, isPending: pendingPost } = Post({
  //   onSuccess: res => {
  //     messageSuccess(res.message);
  //     handleSuccess(res.success);
  //   },
  // });

  // const { mutate: update, isPending: pendingUpdate } = Update({
  //   onSuccess: res => {
  //     messageSuccess(res.message);
  //     handleSuccess(res.success);
  //   },
  // });

  // const { data: getCategories, isLoading: loadingGetCategories } = CategoryGet({
  //   keyword: keywordCategory,
  // });

  useEffect(() => {
    console.log('form', form);
  }, [form]);

  return (
    <form
      onSubmit={e => {
        const result = validate(e);
        console.log('result', result);
        // if (result && !id) post(convertFormParams(form));
        // if (result && id) update(form);
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
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Submission type
          </label>
          <Select
            defaultValue={form.submissionType}
            options={SubmissionTypes}
            onChange={value => handleSelect('submissionType', value)}
          />
        </div>
        <div className="mt-6">
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Approved By
          </label>
          <SearchSelect
            isMultiple
            data={DummyEmail}
            selected={form.approved_by}
            onSelect={value => handleSelect('approved_by', value)}
            // onSearchNotFound={value => setKeywordCategory(value)}
            // loading={loadingGetCategories}
          />
        </div>
        <div className="mt-6 pt-4 pb-6 border-y border-gray-200 dark:border-gray-800">
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Asset Request
          </label>
          <div className="flex flex-col gap-y-4">
            {form.asset_request.map(item => (
              <div key={item.idx} className="flex gap-x-2 items-center">
                <div className="flex-1 grid grid-cols-3 gap-x-2 justify-between">
                  <Input size="sm" placeholder="SN Number" />
                  <Input size="sm" placeholder="Name" />
                  <SearchSelect
                    size="sm"
                    data={[]}
                    selected={null}
                    onSelect={() => {}}
                    placeholder="Select Category"
                    // onSearchNotFound={value => setKeywordCategory(value)}
                    // loading={loadingGetCategories}
                  />
                </div>
                {form.asset_request.length > 1 && (
                  <Button
                    size="xs"
                    onClick={() => removeItemAssetRequest(item.idx)}
                    className="p-0 text-error-500 dark:text-error-400 hover:text-error-600 bg-transparent border-none !shadow-none hover:bg-transparent"
                  >
                    <FaRegTrashAlt size={18} />
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
        <div className="mt-6">
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Note
          </label>
          <TextArea id="note" value={form.note} onChange={handleChange} className="resize-none" />
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
        {/* <ButtonWithSpinner isLoading={pendingPost || pendingUpdate} type="submit"> */}
        <ButtonWithSpinner type="submit">
          {id ? 'Edit' : 'Add'}
          &nbsp; Approval
        </ButtonWithSpinner>
      </div>
    </form>
  );
};

export default Form;
