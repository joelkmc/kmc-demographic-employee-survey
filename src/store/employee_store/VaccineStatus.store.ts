import create from 'zustand';

export interface GetEmployeeVaccineStatus {
  employeeID?: string | null;
  vaccine?: string | null;
  vaccineStatus?: string | null;
  booster?: string | null;
  isActive?: boolean;
  firstDoseScheduledDate?: string | null;
  secondDoseScheduledDate?: string | null;
}

type EmployeeStoreType = GetEmployeeVaccineStatus & {
  setVaccineStatus: (payload: GetEmployeeVaccineStatus) => void;
  willEditVaccinationStatus: boolean;
  setWillEditForm: (willEdit: boolean) => void;
};

export const useVaccineStatus = create<EmployeeStoreType>((set) => ({
  setWillEditForm: (willEdit: boolean) =>
    set((state) => ({ ...state, willEditVaccinationStatus: willEdit })),
  willEditVaccinationStatus: false,
  setVaccineStatus: (payload: GetEmployeeVaccineStatus) =>
    set((state) => ({
      ...state,
      ...payload,
    })),
}));
