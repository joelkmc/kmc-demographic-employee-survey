import { apiClient } from '../apiClient';
import { ILoginPayload } from './auth.types';

export class AuthAPI {
  static login = async (payload: ILoginPayload) => {
    const data = await apiClient(
      'Hub/login',
      {
        method: 'POST',
        headers: {
          'x-version': '2',
        },
      },
      { ...payload }
    );
    return data;
  };
}
