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
}
