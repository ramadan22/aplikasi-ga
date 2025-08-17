import { ToastOptions, toast } from 'react-toastify';

export const messageError = (message: string, options?: ToastOptions) => {
  toast.error(message, {
    position: 'top-right',
    ...options,
  });
};

export const messageSuccess = (message: string) => {
  toast.success(message, {
    position: 'top-right',
  });
};
