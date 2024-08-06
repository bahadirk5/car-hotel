import { z } from "zod";

export const availabilityFormSchema = z.object({
  id: z.number().optional(),
  car_id: z.number().nonnegative(),
  available_from: z.date(),
  available_to: z.date(),
  price_per_day: z.number().nonnegative(),
});
