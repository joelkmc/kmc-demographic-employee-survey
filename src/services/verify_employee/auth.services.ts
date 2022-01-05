import { apiClient } from '../apiClient';
import { VerifyEmployeeResponse } from './auth.types';

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
    const data = await apiClient<any>(
      `api/employees/${employeeId}/demographic-study`,
      { method }
    );
    return data;
  };
}
