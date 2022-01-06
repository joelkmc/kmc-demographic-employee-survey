import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { IEmployeeDemographicPayload } from '../services/verify_employee/auth.types';

type DemographicStoreTypes = {
  demographicDetails: Partial<IEmployeeDemographicPayload> | null;
  setDemographicDetails: (
    payload: Partial<IEmployeeDemographicPayload>
  ) => void;
};

export const useDemographicStore = create<DemographicStoreTypes>(
  devtools((set) => ({
    demographicDetails: null,
    setDemographicDetails: (payload: Partial<IEmployeeDemographicPayload>) => {
      set({ demographicDetails: payload });
    },
  }))
);
