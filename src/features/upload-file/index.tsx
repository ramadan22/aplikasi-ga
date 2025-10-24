import { messageError } from '@/lib/react-toastify';
import FileInput from '@/ui/components/simple/form/input/FileInput';
import { Post } from './hooks/UseUpload';
import { Props } from './types';

const UploadFileFeature = ({ id, value, type, usage, handleChange, error, hint }: Props) => {
  const { mutate: submitUpload, isPending: loadingSubmitUpload } = Post({
    onSuccess: res => {
      handleChange(res.data || null);
    },
    onError: err => {
      messageError(err.message);
    },
  });

  return (
    <FileInput
      id={id}
      value={value}
      onChange={event => {
        const file = event.target.files?.[0] || null;
        submitUpload({ type, usage, file });
      }}
      error={error}
      hint={hint}
      loading={loadingSubmitUpload}
    />
  );
};

export default UploadFileFeature;
