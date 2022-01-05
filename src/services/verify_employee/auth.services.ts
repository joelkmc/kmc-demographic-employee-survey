import { apiClient } from '../apiClient';
import { VerifyEmployeeResponse } from './auth.types';

export class EmployeeAPI {
  static verifyEmployee = async (employeeId?: string, email?: string) => {
    const data = await apiClient<VerifyEmployeeResponse>(
      `api/employees/${employeeId}/validate?email=${email}`,
      { method: 'GET' }
    );
    return data;
  };
}
