import { toast } from 'sonner';

import { getErrorMessage } from './getErrorMessage';

export const toastSuccess = (message: string): void => {
  toast.success(message);
};

export const toastError = (error: unknown): void => {
  toast.error(getErrorMessage(error));
};