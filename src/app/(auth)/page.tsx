import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import * as React from 'react';
import UserAuthForm from '@/app/(auth)/components/user-auth-form';

const HomePage = async () => {
  const session = await auth();
  if (session?.user) {
    return redirect('/dashboard');
  }

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
};

export default HomePage;
