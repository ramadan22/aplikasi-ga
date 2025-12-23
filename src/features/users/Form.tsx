// import UploadFileFeature from '@/features/upload-file';
import { messageSuccess } from '@/lib/react-toastify';
import Button from '@/ui/components/simple/button/Button';
import ButtonWithSpinner from '@/ui/components/simple/button/ButtonWithSpinner';
import Input from '@/ui/components/simple/form/input/InputField';
// import Radio from '@/ui/components/simple/form/input/Radio';
import Label from '@/ui/components/simple/form/Label';
import SearchSelect from '@/ui/components/simple/form/SearchSelect';
// import { Post, Update } from './hooks/UseAssets';
// import { Get as CategoryGet } from './hooks/UseCategories';
// import { update } from '@/services/approval';
// import { Post } from '../approval/hooks/UseApproval';
import UseForm from './hooks/UseForm';
import { Post } from './hooks/UseUsers';
import { FormProps } from './types/Form';

const Form = ({ id, data, handleModal, handleSuccess }: FormProps) => {
  const {
    form,
    handleChange,
    // handleChangeImage,
    // handleChangeRadio,
    handleSelect,
    handleBlur,
    validate,
    // keywordCategory,
    // setKeywordCategory,
    errors,
    convertFormParams,
    getRoleList,
  } = UseForm(data);

  const { mutate: post, isPending: pendingPost } = Post({
    onSuccess: res => {
      messageSuccess(res.message);
      handleSuccess(res.success, res.data);
    },
  });

  // const { mutate: update, isPending: pendingUpdate } = Update({
  //   onSuccess: res => {
  //     messageSuccess(res.message);
  //     handleSuccess(res.success);
  //   },
  // });

  // const { data: getCategories, isLoading: loadingGetCategories } = CategoryGet({
  //   keyword: keywordCategory,
  // });

  return (
    <form
      noValidate
      onSubmit={e => {
        const result = validate(e);
        if (result && !id) post(convertFormParams(form));
        // if (result && id) update(convertFormParams(form));
      }}
    >
      <div>
        <h5 className="mb-2 font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl">
          {id ? 'Edit' : 'Add'}
          &nbsp; User
        </h5>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Add user information to support internal General Affairs operations.
        </p>
      </div>
      <div className="mt-8">
        <div>
          <Label
            required
            className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
          >
            First Name
          </Label>
          <Input
            id="firstName"
            required
            value={form.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!errors.firstName}
            hint={errors.firstName}
            placeholder="Enter first name here"
          />
        </div>
        <div className="mt-6">
          <Label
            required
            className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
          >
            Email
          </Label>
          <Input
            type="email"
            id="email"
            required
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!errors.email}
            hint={errors.email}
            placeholder="Enter email here"
          />
        </div>
        <div className="mt-6">
          <Label
            required
            className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
          >
            Role
          </Label>
          <SearchSelect
            required
            id="role"
            data={getRoleList}
            selected={form?.role || null}
            onSelect={handleSelect}
            error={!!errors.role}
            hint={errors.role}
            onBlur={handleBlur}
          />
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
          // isLoading={pendingPost || pendingUpdate}
          isLoading={pendingPost}
          type="submit"
        >
          {id ? 'Edit' : 'Add'}
          &nbsp; User
        </ButtonWithSpinner>
      </div>
    </form>
  );
};

export default Form;
