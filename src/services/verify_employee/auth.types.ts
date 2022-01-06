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

export interface IEmployeeDemographicPayload {
  employeeId?: string;
  workEmail?: string;
  updatePermanentAddress?: boolean;
  updateCurrentAddress?: boolean;
  mobileNumber?: string;

  /* Required if updateCurrentAddress === true */
  cA_Line1?: string;
  cA_City?: string;
  cA_State?: string;
  cA_Country?: string;
  cA_ZipCode?: string;

  /* Required if updatePermanentAddress === true */
  permanent_Line1?: string;
  permanent_City?: string;
  permanent_State?: string;
  permanent_Country?: string;
  permanent_ZipCode?: string;

  // 2nd Part
  nbiClearanceSubmissionDate?: string; // required if nbi clearance already submitted
  nbiClearanceFilePath?: string | File; // required if nbi clearance not yet submitted

  // 3rd Part
  yearsWithKMC?: string;
  sexualOrientation?: string;
  organizationalRole?: string;
  highestDegreeEarned?: string;
  addressCategory?: string;
  salaryRange?: string;
  nationality?: string;
  ethnicity?: string;
  ethnicGroup?: string;
  partOfIndigenousTribes?: boolean;
  indigenousTribe?: string; // required if partOfIndigenousTribes === true
  pulseFor2022?: string; // concat all answers with semicolon
}
