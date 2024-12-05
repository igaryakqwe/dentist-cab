import { Metadata } from 'next';
import UserAuthForm from '@/app/(auth)/_components/user-auth-form';
import * as React from 'react';

export const metadata: Metadata = {
  title: 'Authentication | Sign In',
  description: 'Sign In page for authentication.',
};

export default function Page() {
  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Вхід</h1>
        <p className="text-sm text-muted-foreground">
          Введіть свою електронну пошту та пароль
        </p>
      </div>
      <UserAuthForm />
    </>
  );
}
