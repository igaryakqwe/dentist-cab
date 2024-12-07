'use client';
import { AlertModal } from '@/components/modal/alert-modal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useState } from 'react';
import { UpdateUserModal } from '@/app/dashboard/employees/_components/update-user-modal';
import { ModifiedEmployee } from '@/types/employee';
import { api } from '@/lib/trpc/client';
import useEmployeesStore from '@/hooks/store/use-employees-store';
import { useToast } from '@/hooks/use-toast';

interface CellActionProps {
  employee: ModifiedEmployee;
}

export const CellAction = ({ employee }: CellActionProps) => {
  const { employees, setEmployees } = useEmployeesStore((state) => state);
  const { toast } = useToast();

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);

  const mutation = api.users.deleteEmployee.useMutation();

  const onConfirm = () => {
    mutation.mutate(employee.id, {
      onSuccess: () => {
        const updatedEmployees = employees.filter(
          (emp) => emp.id !== employee.id
        );
        setEmployees(updatedEmployees);
        setDeleteOpen(false);
      },
      onError: () => {
        toast({
          title: 'Помилка при видаленні працівника',
          variant: 'destructive',
        });
      },
    });
  };

  return (
    <>
      <AlertModal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={onConfirm}
        loading={mutation.isLoading}
      />
      <UpdateUserModal
        employee={employee}
        isOpen={updateOpen}
        onClose={() => setUpdateOpen(false)}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setUpdateOpen(true)}>
            <Edit className="mr-2 h-4 w-4" /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDeleteOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
