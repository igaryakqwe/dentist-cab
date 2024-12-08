import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import Credentials from '@auth/core/providers/credentials';
import { hashPassword } from '@/utils/hashPassword';
import Google from '@auth/core/providers/google';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  pages: {
    error: '/error',
  },
  providers: [
    Google,
    Credentials({
      credentials: {
        email: { type: 'text' },
        password: { type: 'password' },
      },
      authorize: async (credentials) => {
        if (!credentials) {
          throw new Error('No credentials provided');
        }

        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        if (!email || !password) {
          throw new Error('Invalid credentials');
        }

        let user = null;

        user = await prisma.user.findFirst({
          where: {
            email,
          },
        });

        if (!user) {
          throw new Error('Invalid credentials.');
        }

        const hashedPassword = hashPassword(password);
        const isValidPassword = hashedPassword === user.password;

        if (!isValidPassword) {
          throw new Error('Invalid credentials.');
        }

        return user;
      },
    }),
  ],
});
