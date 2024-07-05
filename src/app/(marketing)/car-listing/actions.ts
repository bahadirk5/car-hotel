"use server";

import { db } from "@/server/db";
import { cars } from "@/server/db/schema";
import { eq, and, inArray } from "drizzle-orm";
import { z } from "zod";

// Filter params schema
const filterParamsSchema = z.object({
  transmission: z.array(z.enum(["automatic", "manual"])).optional(),
  fuel_type: z.array(z.enum(["gasoline", "diesel", "electric"])).optional(),
  segment_id: z.array(z.coerce.number()).optional(),
  seat_count: z.array(z.coerce.number()).optional(),
});

type FiltersObject = {
  transmission?: ("automatic" | "manual")[];
  fuel_type?: ("gasoline" | "diesel" | "electric")[];
  segment_id?: number[];
  seat_count?: number[];
  [key: string]: any; // Allows for additional properties
};

export async function getFilteredCars(searchParams: URLSearchParams) {
  const filtersObject: FiltersObject = {};

  for (const [key, value] of searchParams) {
    filtersObject[key] = value.split(","); // Split values by comma to handle multiple values
  }

  const filters = filterParamsSchema.safeParse(filtersObject);

  if (!filters.success) {
    console.error("Invalid filter parameters:", filters.error);
    throw new Error("Invalid filter parameters");
  }

  const filterConditions = [];

  if (filters.data.transmission) {
    filterConditions.push(
      inArray(cars.transmission, filters.data.transmission),
    );
  }
  if (filters.data.fuel_type) {
    filterConditions.push(inArray(cars.fuel_type, filters.data.fuel_type));
  }
  if (filters.data.segment_id) {
    filterConditions.push(inArray(cars.segment_id, filters.data.segment_id));
  }
  if (filters.data.seat_count) {
    filterConditions.push(inArray(cars.seat_count, filters.data.seat_count));
  }

  filterConditions.push(eq(cars.status, "available"));

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
