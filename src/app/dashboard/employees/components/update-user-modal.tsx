'use client';

import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ModifiedEmployee } from '@/types/employee';
import { api } from '@/lib/trpc/client';
import { Check, Loader2, X } from 'lucide-react';
import useEmployeesStore from '@/hooks/store/use-employees-store';
import { useToast } from '@/hooks/use-toast';

interface UpdateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: ModifiedEmployee;
}

type FormInputs = {
  position: string;
};

export const UpdateUserModal: React.FC<UpdateUserModalProps> = ({
  isOpen,
  onClose,
  employee,
}) => {
  const { toast } = useToast();
  const { employees, setEmployees } = useEmployeesStore((state) => state);
  const [isEditing, setIsEditing] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting },
  } = useForm<FormInputs>({
    defaultValues: {
      position: employee.position,
    },
  });

  const mutation = api.users.updateEmployeePosition.useMutation();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    mutation.mutate(
      { id: employee.id, position: data.position },
      {
        onSuccess: () => {
          const updatedEmployees = employees.map((emp) => {
            if (emp.id === employee.id) {
              return { ...emp, position: data.position };
            }

            return emp;
          });
          setEmployees(updatedEmployees);
          setIsEditing(false);
        },
        onError: (error) => {
          toast({
            title: 'Помилка при оновлені позиції',
            description: error.message,
            variant: 'destructive',
          });
        },
      }
    );
  };

  const handleCancel = () => {
    setValue('position', employee.position);
    setIsEditing(false);
  };

  return (
    <Modal
      title="Оновити позицію робітника"
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-sm"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col items-center justify-center p-4 h-32 border rounded-lg shadow-lg bg-white"
      >
        <h3 className="text-lg font-semibold">{employee.fullName}</h3>
        <p className="truncate text-zinc-700 mb-2 text-xs">{employee.email}</p>
        {!isEditing ? (
          <Badge
            className="cursor-pointer hover:bg-primary/90 px-4 py-2"
            onClick={() => setIsEditing(true)}
          >
            {watch('position')}
          </Badge>
        ) : (
          <div className="flex items-center gap-2">
            <Input
              id="position"
              {...register('position', { required: true })}
              className="w-full text-center"
            />
            <Button
              type="submit"
              size="icon"
              variant="ghost"
              className="h-8 w-8"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Check className="h-4 w-4" />
              )}
            </Button>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="h-8 w-8"
              onClick={handleCancel}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </form>
    </Modal>
  );
};
