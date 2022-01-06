import { apiClient } from '../apiClient';
import {
  IEmployeeDemographicPayload,
  VerifyEmployeeResponse,
} from './auth.types';

export class EmployeeAPI {
  static verifyEmployee = async (employeeId?: string, email?: string) => {
    const data = await apiClient<VerifyEmployeeResponse>(
      `api/employees/${employeeId}/validate?email=${email}`
    );
    return data;
  };

  static employeeDemographic = async (
    employeeId?: string,
    method?: 'POST' | 'GET'
  ) => {
    const data = await apiClient<IEmployeeDemographicPayload>(
      `api/employees/${employeeId}/demographic-study`,
      { method }
    );
    return data;
  };

  static employeePostDemographic = async (
    employeeId?: string,
    payload?: IEmployeeDemographicPayload
  ) => {
    const data = await apiClient<IEmployeeDemographicPayload>(
      `api/employees/${employeeId}/demographic-study`,
      { method: 'POST', body: JSON.stringify(payload) }
    );
    return data;
  };

  static uploadFile = async (e: FormData): Promise<string> => {
    const storage =
      process.env.NODE_ENV === 'production'
        ? 'onboarding'
        : 'erp-staging-files';

    const uploadResponse = await apiClient<string>(
      `Azure/blob/upload?folder=${storage}`,
      {
        baseUrl: '',
        method: 'POST',
        body: JSON.stringify(e),
      }
    );

    return uploadResponse;
  };
}
