import { createTRPCRouter, protectedProcedure } from '@/lib/trpc/trpc';
import { eventSchema } from '@/types/calendar';

const scheduleRoute = createTRPCRouter({
  getEvents: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.event.findMany();
  }),
  addEvent: protectedProcedure
    .input(
      eventSchema.omit({
        id: true,
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.db.event.create({
        data: input,
      });
    }),
  updateEvent: protectedProcedure
    .input(eventSchema)
    .mutation(async ({ input, ctx }) => {
      console.log(input);
      await ctx.db.event.update({
        where: {
          id: input.id,
        },
        data: input,
      });
    }),
  deleteEvent: protectedProcedure
    .input(eventSchema.pick({ id: true }))
    .mutation(async ({ input, ctx }) => {
      await ctx.db.event.delete({
        where: {
          id: input.id,
        },
      });
    }),
});

export default scheduleRoute;
