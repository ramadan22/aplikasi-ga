import { messageSuccess } from '@/lib/react-toastify';
import Button from '@/ui/components/simple/button/Button';
import ButtonWithSpinner from '@/ui/components/simple/button/ButtonWithSpinner';
import Input from '@/ui/components/simple/form/input/InputField';
import { Post, Update } from './hooks/UseCategories';
import UseForm from './hooks/UseForm';
import { FormProps } from './types';

const Form = ({ id, data, handleModal, handleSuccess }: FormProps) => {
  const { form, handleChange, handleBlur, validate, errors } = UseForm(data);

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

  return (
    <form
      onSubmit={e => {
        const result = validate(e);
        if (result && !id) post(form);
        if (result && id) update(form);
      }}
    >
      <div>
        <h5 className="mb-2 font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl">
          {id ? 'Edit' : 'Add'}
          &nbsp; Category
        </h5>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Manage category to keep your inventory organized and up to date.
        </p>
      </div>
      <div className="mt-8">
        <div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Name
            </label>
            <Input
              id="name"
              value={form?.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.name}
              hint={errors.name}
            />
          </div>
        </div>
        <div className="mt-6">
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Prefix
          </label>
          <div className="relative">
            <Input
              id="prefix"
              value={form.prefix}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.prefix}
              hint={errors.prefix}
            />
          </div>
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
        <ButtonWithSpinner isLoading={pendingPost || pendingUpdate} type="submit">
          {id ? 'Edit' : 'Add'}
          &nbsp; Category
        </ButtonWithSpinner>
      </div>
    </form>
  );
};

export default Form;
