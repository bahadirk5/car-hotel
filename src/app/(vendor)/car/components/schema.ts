import { z } from "zod";

export const carFormSchema = z.object({
  id: z.number().optional(),
  segment_id: z.coerce
    .number()
    .int()
    .positive({ message: "Segment ID must be a positive integer." }),
  brand: z.string().min(1, {
    message: "Brand cannot be empty.",
  }),
  model: z.string().min(1, {
    message: "Model cannot be empty.",
  }),
  year: z.coerce.number().int().min(1900).max(new Date().getFullYear(), {
    message: "Year must be a valid year.",
  }),
  license_plate: z
    .string()
    .min(1, {
      message: "License plate cannot be empty.",
    })
    .max(10, {
      message: "License plate cannot exceed 10 characters.",
    }),
  mileage: z.coerce.number().int().nonnegative({
    message: "Mileage must be a non-negative integer.",
  }),
  transmission: z.enum(["Automatic", "Manual"], {
    message: "Transmission must be either 'Automatic' or 'Manual'.",
  }),
  fuel_type: z.enum(["Gasoline", "Diesel", "Electric"], {
    message: "Fuel type must be either 'Gasoline', 'Diesel', or 'Electric'.",
  }),
  seat_count: z.coerce.number().int().positive({
    message: "Seat count must be a positive integer.",
  }),
});
