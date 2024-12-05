import { Metadata } from 'next';
import * as React from 'react';
import CreateUserForm from '@/app/(auth)/_components/create-user-form';

export const metadata: Metadata = {
  title: 'Authentication | Sign In',
  description: 'Sign In page for authentication.',
};

export default function Page() {
  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Створіть акаунт
        </h1>
        <p className="text-sm text-muted-foreground">
          Введіть своє імʼя, прізвище, електронну адресу та пароль для створення
          акаунту
        </p>
      </div>
      <CreateUserForm />
    </>
  );
}
