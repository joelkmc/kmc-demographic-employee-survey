export interface ILoginPayload {
  email: string;
  password: string;
}

export interface VerifyEmployeeResponse {
  firstName: string;
  id: string;
  lastName: string;
  personalEmail: string;
  sr: string;
  workEmail: string;
}
