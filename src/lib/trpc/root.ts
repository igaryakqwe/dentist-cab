import { createCallerFactory, createTRPCRouter } from './trpc';
import authRoute from '@/api/routes/auth-route';
import usersRoute from '@/api/routes/users-route';

export const appRouter = createTRPCRouter({
  auth: authRoute,
  users: usersRoute,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
