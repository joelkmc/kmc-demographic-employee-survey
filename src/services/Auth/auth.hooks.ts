import { useMutation, UseMutationOptions } from 'react-query';
import { AuthAPI } from './auth.services';
import { ILoginPayload } from './auth.types';

export const useLogin = (
  options?: UseMutationOptions<unknown, unknown, ILoginPayload, unknown>
) => {
  return useMutation(
    ['login'],
    (payload: ILoginPayload) => AuthAPI.login(payload),
    options
  );
};
