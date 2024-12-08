'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { Patient } from '@/types/patient';
import { getDateOfBirth } from '@/utils/date-utils';
import { CellAction } from '../components/cell-action';

export const columns: ColumnDef<Patient>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        className="ml-3"
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="ml-3"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: 'Імʼя та прізвище',
    cell: ({ row: { original } }) =>
      original.name && original.surname
        ? `${original.name} ${original.surname}`
        : '—',
  },

  {
    accessorKey: 'email',
    header: 'Електронна пошта',
  },
  {
    accessorKey: 'birthDate',
    header: 'Дата народження',
    cell: ({ row }) =>
      row.original.birthDate ? getDateOfBirth(row.original.birthDate) : '—',
  },
  {
    accessorKey: 'gender',
    header: 'Стать',
    cell: ({ row }) =>
      row.original.gender
        ? row.original.gender === 'MALE'
          ? 'Чоловіча'
          : 'Жіноча'
        : '—',
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction patient={row.original} />,
  },
];
