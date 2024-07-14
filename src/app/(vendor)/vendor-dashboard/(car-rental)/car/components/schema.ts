import { z } from "zod";

export const carFormSchema = z.object({
  id: z.number().optional(),
  segment: z.enum(["economy", "standard", "luxury", "suv"], {
    message:
      "Fuel type must be either 'Gasoline', 'Diesel', Hybrid or 'Electric'.",
  }),
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
  transmission: z.enum(["automatic", "manual"], {
    message: "Transmission must be either 'Automatic' or 'Manual'.",
  }),
  fuel_type: z.enum(["gasoline", "diesel", "electric", "hybrid"], {
    message:
      "Fuel type must be either 'Gasoline', 'Diesel', Hybrid or 'Electric'.",
  }),
  seat_count: z.coerce.number().int().positive({
    message: "Seat count must be a positive integer.",
  }),
});
