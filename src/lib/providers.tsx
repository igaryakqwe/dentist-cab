import { PropsWithChildren } from 'react';
import TRPCReactProvider from '@/lib/trpc/client';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';

const Providers = async ({ children }: PropsWithChildren) => {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <TRPCReactProvider>{children}</TRPCReactProvider>
    </SessionProvider>
  );
};

export default Providers;
