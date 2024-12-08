import { ModifiedEmployee } from '@/types/employee';
import { Filter } from '@/types';
import { Service } from '@/types/service';

export const filterEmployees = (
  employees: ModifiedEmployee[],
  filters: Filter
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

export const filterServices = (
  services: Service[],
  filters: Filter
): Service[] => {
  if (services.length === 0) return [];

  const filteredServices = services.filter((service) => {
    return (
      !filters.search ||
      service.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      service.description?.toLowerCase().includes(filters.search.toLowerCase())
    );
  });

  const startIndex = (filters.page - 1) * filters.rowsPerPage;
  const endIndex = startIndex + filters.rowsPerPage;

  return filteredServices.slice(startIndex, endIndex);
};
