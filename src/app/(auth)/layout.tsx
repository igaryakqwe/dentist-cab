import { FC, PropsWithChildren } from 'react';
import Link from 'next/link';
import { cn } from '@/utils/cn';
import { buttonVariants } from '@/components/ui/button';
import UserAuthForm from '@/app/(auth)/_components/user-auth-form';
import SwitchButton from '@/app/(auth)/_components/switch-button';
import { Cross } from 'lucide-react';
import * as React from 'react';

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <SwitchButton />
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Cross className="size-8 mr-2" />
          <div className="grid flex-1 text-left text-lg leading-tight">
            <span className="truncate font-semibold">DentistCab</span>
          </div>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">Сяйво вашої посмішки — наша турбота!</p>
          </blockquote>
        </div>
      </div>
      <div className="flex h-full items-center p-4 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
