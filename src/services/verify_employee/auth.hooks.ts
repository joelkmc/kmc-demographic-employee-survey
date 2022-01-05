import { useQuery, UseQueryOptions } from 'react-query';
import { EmployeeAPI } from './auth.services';
import { VerifyEmployeeResponse } from './auth.types';

export const useVerifyEmployee = (
  employeeId?: string,
  email?: string,
  options?: UseQueryOptions<VerifyEmployeeResponse | undefined>
) => {
  return useQuery<VerifyEmployeeResponse | undefined>(
    ['validate-employee', employeeId],
    () => EmployeeAPI.verifyEmployee(employeeId, email),
    {
      ...options,

      retry: 0,
    }
  );
};
