import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '@/lib/trpc/trpc';
import { z } from 'zod';
import { hashPassword } from '@/utils/hashPassword';

const authRoute = createTRPCRouter({
  updateProfile: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        image: z.string(),
        name: z.string(),
        surname: z.string(),
        gender: z.enum(['MALE', 'FEMALE']),
        birthDate: z.date().nullable(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.db.user.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          surname: input.surname,
          gender: input.gender,
          birthDate: input.birthDate,
          image: input.image,
        },
      });
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
