import create from 'zustand';

type GetEmployeeVaccineStatus = {
  client?: string | null;
  department?: string | null;
  firstName?: string | null;
  id?: string | null;
  lastName?: string | null;
  personalEmail?: string | null;
  position?: string | null;
  sr?: string | null;
  workEmail?: string | null;
  emailUsedByUser?: string | null;
};

type EmployeeStoreType = GetEmployeeVaccineStatus & {
  setEmployee: (payload: GetEmployeeVaccineStatus) => void;
};

export const useEmployeeStore = create<EmployeeStoreType>((set) => ({
  setEmployee: (payload: GetEmployeeVaccineStatus) =>
    set({
      ...payload,
    }),
}));
