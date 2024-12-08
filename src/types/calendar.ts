import { z } from 'zod';

export const eventSchema = z.object({
  id: z.string(),
  title: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  serviceId: z.string(),
  doctorId: z.string(),
  patientId: z.string(),
});

export type CalendarEvent = {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  serviceId: string;
  doctorId: string;
  patientId: string;
};

export type CalendarView = 'day' | 'week';
