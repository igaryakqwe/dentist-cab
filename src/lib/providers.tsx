import { PropsWithChildren } from 'react';
import TRPCReactProvider from '@/lib/trpc/client';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';
import { NuqsAdapter } from 'nuqs/adapters/react';
import { ThemeProvider } from '@/lib/theme-provider';
import AuthProvider from '@/lib/auth-provider';

const Providers = async ({ children }: PropsWithChildren) => {
  const session = await auth();
  return (
    <NuqsAdapter>
      <SessionProvider session={session}>
        <TRPCReactProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AuthProvider>{children}</AuthProvider>
          </ThemeProvider>
        </TRPCReactProvider>
      </SessionProvider>
    </NuqsAdapter>
  );
};

export default Providers;
