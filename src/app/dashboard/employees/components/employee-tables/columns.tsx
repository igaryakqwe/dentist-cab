'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { ModifiedEmployee } from '@/types/employee';

export const columns: ColumnDef<ModifiedEmployee>[] = [
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
    accessorKey: 'fullName',
    header: 'Імʼя та прізвище',
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
