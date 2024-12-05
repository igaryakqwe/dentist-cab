import { createTRPCRouter, publicProcedure } from '@/lib/trpc/trpc';
import { z } from 'zod';
import { hashPassword } from '@/utils/hashPassword';

const authRoute = createTRPCRouter({
  login: publicProcedure
    .input(z.object({ email: z.string(), password: z.string() }))
    .mutation(async ({ input, ctx }) => {
      // const user = await ctx.db.user.findFirst({
      //   where: {
      //     email: input.email,
      //   },
      // });
      //
      // if (!user) {
      //   throw new Error('Invalid email or password');
      // }
      //
      // ctx.session.user = user;
      //
      // return user;
    }),
  register: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const password = hashPassword(input.password);
      return await ctx.db.user.create({
        data: {
          email: input.email,
          password,
          emailVerified: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    }),
});

export default authRoute;
