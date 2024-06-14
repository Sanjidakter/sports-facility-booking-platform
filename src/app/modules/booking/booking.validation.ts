import { z } from 'zod';

export const bookingSchema = z.object({
  user: z.string(),
  facility: z.string(),
  date: z.string(),
  startTime: z.string(),
  endTime: z.string()
});
