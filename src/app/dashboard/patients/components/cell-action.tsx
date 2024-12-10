'use client';
import { AlertModal } from '@/components/modal/alert-modal';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Edit,
  MoreHorizontal,
  NotebookPen,
  SquareArrowOutUpRight,
  Trash,
} from 'lucide-react';
import { useState } from 'react';
import { UpdateUserModal } from '@/app/dashboard/employees/components/update-user-modal';
import { ModifiedEmployee } from '@/types/employee';
import { api } from '@/lib/trpc/client';
import useEmployeesStore from '@/hooks/store/use-employees-store';
import { useToast } from '@/hooks/use-toast';
import { Service } from '@/types/service';
import ManageServiceModal from '@/app/dashboard/services/components/manage-service-modal';
import useServicesStore from '@/hooks/store/use-services-store';
import Link from 'next/link';
import { cva } from 'class-variance-authority';
import { cn } from '@/utils/cn';
import { Patient } from '@/types/patient';
import { useSession } from 'next-auth/react';

interface CellActionProps {
  patient: Patient;
}

export const CellAction = ({ patient }: CellActionProps) => {
  const { data } = useSession();
  const user = data?.user;

  const isDoctor = user?.role !== 'USER';
  const isUserRecord = patient.id === user?.id;

  return (
    <>
      {isDoctor && (
        <Link
          href="/dashboard/schedule"
          className={buttonVariants({ variant: 'secondary', size: 'icon' })}
        >
          <NotebookPen className="h-4 w-4" />
        </Link>
      )}
      {isDoctor ||
        (isUserRecord && (
          <Link
            href={`/dashboard/patients/${patient.id}`}
            className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }))}
          >
            <SquareArrowOutUpRight className="h-4 w-4" />
          </Link>
        ))}
    </>
  );
};
