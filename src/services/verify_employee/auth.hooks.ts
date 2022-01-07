import {
  useQuery,
  UseQueryOptions,
  UseMutationOptions,
  useMutation,
  UseMutationResult,
} from 'react-query';
import { EmployeeAPI } from './auth.services';
import {
  IEmployeeDemographicPayload,
  VerifyEmployeeResponse,
} from './auth.types';

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

export const usePostEmployeeDemographic = (
  options?: UseMutationOptions<
    IEmployeeDemographicPayload,
    unknown,
    IEmployeeDemographicPayload,
    unknown
  >
): UseMutationResult<
  IEmployeeDemographicPayload,
  unknown,
  IEmployeeDemographicPayload,
  unknown
> => {
  return useMutation(
    ['post-demographic-survey'],
    (payload: IEmployeeDemographicPayload) =>
      EmployeeAPI.employeePostDemographic(payload?.employeeId, payload),
    {
      ...options,

      retry: 0,
    }
  );
};

export const useGetEmployeeDemographic = (
  employeeID?: string,
  options?: UseQueryOptions<IEmployeeDemographicPayload>
) => {
  return useQuery<IEmployeeDemographicPayload>(
    ['get-demographic-survey', employeeID],
    () => EmployeeAPI.employeeDemographic(employeeID),
    {
      ...options,

      retry: 0,
    }
  );
};

export const useUploadFile = (
  options?: UseMutationOptions<string, unknown, FormData, unknown>
): UseMutationResult<string, unknown, FormData, unknown> => {
  return useMutation(
    ['KYC-upload'],
    (data: FormData) => EmployeeAPI.uploadFile(data),
    options
  );
};
