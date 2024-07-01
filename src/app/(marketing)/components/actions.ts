"use server";

import { db } from "@/server/db";
import { cars } from "@/server/db/schema";
import { eq, and } from "drizzle-orm";
import { z } from "zod";

// Filter params schema
const filterParamsSchema = z.object({
  transmission: z.string().optional(),
  fuel_type: z.string().optional(),
  segment_id: z.number().optional(),
  seat_count: z.number().optional(),
});

export async function getFilteredCars(searchParams: URLSearchParams) {
  const filters = filterParamsSchema.parse(Object.fromEntries(searchParams));

  const filterConditions = [];

  if (filters.transmission) {
    filterConditions.push(eq(cars.transmission, filters.transmission));
  }
  if (filters.fuel_type) {
    filterConditions.push(eq(cars.fuel_type, filters.fuel_type));
  }
  if (filters.segment_id) {
    filterConditions.push(eq(cars.segment_id, filters.segment_id));
  }
  if (filters.seat_count) {
    filterConditions.push(eq(cars.seat_count, filters.seat_count));
  }

  try {
    const filteredCars = await db
      .select()
      .from(cars)
      .where(and(...filterConditions));

    return filteredCars;
  } catch (error) {
    console.error("Error fetching filtered cars:", error);
    throw new Error("Could not fetch filtered cars");
  }
}
