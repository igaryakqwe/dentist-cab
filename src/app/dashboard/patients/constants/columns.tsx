'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Patient } from '@/types/patient';
import { getDateOfBirth } from '@/utils/date-utils';
import { CellAction } from '../components/cell-action';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';

export const columns: ColumnDef<Patient>[] = [
  {
    accessorKey: 'image',
    header: ' ',
    cell: ({ row }) => (
      <Avatar>
        <AvatarImage src={row.original.image as string} alt="avatar" />
        <AvatarFallback>{row.original.email[0]}</AvatarFallback>
      </Avatar>
    ),
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
