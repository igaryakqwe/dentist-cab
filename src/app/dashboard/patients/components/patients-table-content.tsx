'use client';

import { api } from '@/lib/trpc/client';
import { DataTable } from '@components/ui/table/data-table';
import { DataTableSearch } from '@components/ui/table/data-table-search';
import { useEffect } from 'react';
import usePatientsStore from '@/hooks/store/use-patients-store';
import { columns } from '../constants/columns';
import { usePatientFilter } from '@/hooks/filters/use-patients-filter';
import { DataTableFilterBox } from '@components/ui/table/data-table-filter-box';
import { DataTableResetFilter } from '@components/ui/table/data-table-reset-filter';
import { GENDER_OPTIONS } from '@/app/dashboard/patients/constants/gender';

const PatientsTableContent = () => {
  const { data, isLoading } = api.users.getPatients.useQuery();
  const { patients, setPatients } = usePatientsStore((state) => state);
  const {
    searchQuery,
    setSearchQuery,
    gender,
    setGender,
    setPage,
    isAnyFilterActive,
    resetFilters,
  } = usePatientFilter(data || []);

  useEffect(() => {
    if (data && !isLoading) {
      setPatients(data);
    }
  }, [isLoading]);

  const totalItems = data?.length || 0;

  return (
    <>
      <div className="flex flex-wrap items-center gap-4">
        <DataTableSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setPage={setPage}
        />
        <DataTableFilterBox
          filterKey="gender"
          title="Стать"
          options={GENDER_OPTIONS}
          setFilterValue={setGender}
          filterValue={gender}
        />
        <DataTableResetFilter
          isFilterActive={isAnyFilterActive}
          onReset={resetFilters}
        />
      </div>
      <DataTable
        columns={columns}
        data={patients}
        totalItems={totalItems}
        isLoading={isLoading}
      />
    </>
  );
};

export default PatientsTableContent;
