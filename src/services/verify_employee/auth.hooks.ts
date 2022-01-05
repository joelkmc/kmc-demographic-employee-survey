import {
  useQuery,
  UseQueryOptions,
  UseMutationOptions,
  useMutation,
  UseMutationResult,
} from 'react-query';
import { EmployeeAPI } from './auth.services';
import { VerifyEmployeeResponse } from './auth.types';

export const useVerifyEmployee = (
  employeeId?: string,
  email?: string,
  options?: UseQueryOptions<VerifyEmployeeResponse>
) => {
  return useQuery<VerifyEmployeeResponse>(
    ['validate-employee', employeeId],
    () => EmployeeAPI.verifyEmployee(employeeId, email),
    {
      ...options,

      retry: 0,
    }
  );
};

export const useEmployeeDemographic = (
  employeeID?: string,
  options?: UseMutationOptions<any, unknown, unknown, unknown>
): UseMutationResult<any, unknown, unknown, unknown> => {
  return useMutation(
    ['validate-employee', employeeID],
    () => EmployeeAPI.employeeDemographic(employeeID, 'POST'),
    {
      ...options,

      retry: 0,
    }
  );
};

export const useGetEmployeeDemographic = (
  employeeID?: string,
  options?: UseQueryOptions<any>
) => {
  return useQuery<any>(
    ['employee-information', employeeID],
    () => EmployeeAPI.employeeDemographic(employeeID, 'GET'),
    {
      ...options,

      retry: 0,
    }
  );
};
