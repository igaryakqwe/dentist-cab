import { create } from 'zustand';
import { ModifiedEmployee } from '@/types/employee';

export interface EmployeeStore {
  employees: ModifiedEmployee[];
  setEmployees: (employees: ModifiedEmployee[]) => void;
}

const useEmployeesStore = create<EmployeeStore>((set) => ({
  employees: [],
  setEmployees: (employees: ModifiedEmployee[]) => set({ employees }),
}));

export default useEmployeesStore;
