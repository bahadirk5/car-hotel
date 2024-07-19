import { z } from "zod";

export const carRentalSchema = z.object({
  id: z.number().optional(),
  vendor_id: z.number(),
  name: z.string().min(1, {
    message: "Name cannot be empty.",
  }),
  tax_no: z.string().min(1, {
    message: "Tax No cannot be empty.",
  }),
  service_area: z.array(z.string()).nonempty({
    message: "Service area cannot be empty.",
  }),
});

export type CarRental = z.infer<typeof carRentalSchema>;
export type CarRentalField = keyof CarRental;
