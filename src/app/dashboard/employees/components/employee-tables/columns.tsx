'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { Employee } from '@/types/employee';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';

export const columns: ColumnDef<Employee>[] = [
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
    cell: ({ row }) => (
      <div className="ml-2">
        {row.original.name} {row.original.surname}
      </div>
    ),
  },
  {
    accessorKey: 'email',
    header: 'Електронна пошта',
  },
  {
    accessorKey: 'position',
    header: 'Посада',
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction employee={row.original} />,
  },
];
