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
import { Service } from '@/types/service';
import ManageServiceModal from '@/app/dashboard/services/components/manage-service-modal';
import useServicesStore from '@/hooks/store/use-services-store';

interface CellActionProps {
  service: Service;
}

export const CellAction = ({ service }: CellActionProps) => {
  const { toast } = useToast();
  const { deleteService } = useServicesStore((state) => state);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);

  const mutation = api.services.deleteService.useMutation();

  const onConfirm = () => {
    mutation.mutate(
      { id: service.id },
      {
        onSuccess: () => {
          toast({
            title: 'Послугу успішно видалено',
          });
          deleteService(service.id);
          setDeleteOpen(false);
          window.location.reload();
        },
        onError: (error) => {
          toast({
            title: 'Помилка',
            description: error.message,
            variant: 'destructive',
          });
        },
      }
    );
  };

  return (
    <>
      <AlertModal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={onConfirm}
        loading={mutation.isLoading}
      />
      <ManageServiceModal
        isOpen={updateOpen}
        setIsOpen={setUpdateOpen}
        service={service}
      />
      <Button variant="ghost" size="icon" onClick={() => setUpdateOpen(true)}>
        <Edit className="h-4 w-4" />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        onClick={() => setDeleteOpen(true)}
      >
        <Trash className="h-4 w-4" />
      </Button>
    </>
  );
};
