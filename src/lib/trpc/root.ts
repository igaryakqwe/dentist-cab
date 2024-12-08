import { createCallerFactory, createTRPCRouter } from './trpc';
import authRoute from '@/api/routes/auth-route';
import usersRoute from '@/api/routes/users-route';
import servicesRoute from '@/api/routes/services-route';

export const appRouter = createTRPCRouter({
  auth: authRoute,
  users: usersRoute,
  services: servicesRoute,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
