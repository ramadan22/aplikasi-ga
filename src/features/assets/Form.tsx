import UploadFileFeature from '@/features/upload-file';
import { messageSuccess } from '@/lib/react-toastify';
import Button from '@/ui/components/simple/button/Button';
import ButtonWithSpinner from '@/ui/components/simple/button/ButtonWithSpinner';
import Input from '@/ui/components/simple/form/input/InputField';
import Radio from '@/ui/components/simple/form/input/Radio';
import Label from '@/ui/components/simple/form/Label';
import SearchSelect from '@/ui/components/simple/form/SearchSelect';
import { Post, Update } from './hooks/UseAssets';
import { Get as CategoryGet } from './hooks/UseCategories';
import UseForm from './hooks/UseForm';
import { FormProps } from './types';

const Form = ({ id, data, handleModal, handleSuccess }: FormProps) => {
  const {
    form,
    handleChange,
    handleChangeImage,
    handleChangeRadio,
    handleSelect,
    handleBlur,
    validate,
    keywordCategory,
    setKeywordCategory,
    errors,
    convertFormParams,
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

  const { data: getCategories, isLoading: loadingGetCategories } = CategoryGet({
    keyword: keywordCategory,
  });

  return (
    <form
      noValidate
      onSubmit={e => {
        const result = validate(e);
        if (result && !id) post(convertFormParams(form));
        if (result && id) update(convertFormParams(form));
      }}
    >
      <div>
        <h5 className="mb-2 font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl">
          {id ? 'Edit' : 'Add'}
          &nbsp; Asset
        </h5>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Manage asset to keep your inventory organized and up to date.
        </p>
      </div>
      <div className="mt-8">
        <div>
          <Label
            required
            className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
          >
            Name
          </Label>
          <Input
            id="name"
            required
            value={form.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!errors.name}
            hint={errors.name}
            placeholder="Enter asset name here"
          />
        </div>
        <div className="mt-6">
          <Label
            required
            className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
          >
            Serial Number
          </Label>
          <Input
            id="serialNumber"
            required
            value={form.serialNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!errors.serialNumber}
            hint={errors.serialNumber}
            placeholder="Enter serial number here"
          />
        </div>
        <div className="mt-6">
          <Label
            required
            className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
          >
            Maintenance
          </Label>
          <div className="flex flex-wrap items-center gap-8 mt-4">
            <Radio
              id="radio1"
              name="isMaintenance"
              value="1"
              checked={form.isMaintenance}
              onChange={value => handleChangeRadio(value)}
              label="Yes"
            />
            <Radio
              id="radio2"
              name="isMaintenance"
              value="0"
              checked={!form.isMaintenance}
              onChange={value => handleChangeRadio(value)}
              label="No"
            />
          </div>
        </div>
        <div className="mt-6">
          <Label
            required
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400"
          >
            Image
          </Label>
          <UploadFileFeature
            id="image"
            usage="assets"
            type="image"
            value={form.image}
            handleChange={data => handleChangeImage(data?.url || '')}
            error={!!errors.image}
            hint={errors.image}
          />
        </div>
        <div className="mt-6">
          <Label
            required
            className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
          >
            Category
          </Label>
          <SearchSelect
            data={getCategories}
            selected={form?.category || null}
            onSelect={handleSelect}
            onSearchNotFound={value => setKeywordCategory(value)}
            loading={loadingGetCategories}
            error={!!errors.categoryId}
            hint={errors.categoryId}
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
        <ButtonWithSpinner isLoading={pendingPost || pendingUpdate} type="submit">
          {id ? 'Edit' : 'Add'}
          &nbsp; Asset
        </ButtonWithSpinner>
      </div>
    </form>
  );
};

export default Form;
