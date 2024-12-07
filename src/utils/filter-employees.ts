import { EmployeeFilter, ModifiedEmployee } from '@/types/employee';

export const filterEmployees = (
  employees: ModifiedEmployee[],
  filters: EmployeeFilter
): ModifiedEmployee[] => {
  if (employees.length === 0) return [];

  const filteredEmployees = employees.filter((employee) => {
    return (
      !filters.search ||
      employee.fullName.toLowerCase().includes(filters.search.toLowerCase()) ||
      employee.email.toLowerCase().includes(filters.search.toLowerCase()) ||
      employee.position.toLowerCase().includes(filters.search.toLowerCase())
    );
  });

  const startIndex = (filters.page - 1) * filters.rowsPerPage;
  const endIndex = startIndex + filters.rowsPerPage;

  return filteredEmployees.slice(startIndex, endIndex);
};
