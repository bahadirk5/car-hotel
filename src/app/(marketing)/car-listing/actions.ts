"use server";

import { db } from "@/server/db";
import { cars, car_rental } from "@/server/db/schema";
import { eq, and, inArray } from "drizzle-orm";
import { z } from "zod";

// Filter params schema
const filterParamsSchema = z.object({
  transmission: z.array(z.enum(["automatic", "manual"])).optional(),
  fuel_type: z
    .array(z.enum(["gasoline", "diesel", "electric", "hybrid"]))
    .optional(),
  segment: z.array(z.enum(["economy", "standard", "luxury", "suv"])).optional(),
  seat_count: z.array(z.coerce.number()).optional(),
});

type FiltersObject = {
  transmission?: ("automatic" | "manual")[];
  fuel_type?: ("gasoline" | "diesel" | "electric" | "hybrid")[];
  segment?: ("economy" | "standard" | "luxury" | "suv")[];
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
  if (filters.data.segment) {
    filterConditions.push(inArray(cars.segment, filters.data.segment));
  }
  if (filters.data.seat_count) {
    filterConditions.push(inArray(cars.seat_count, filters.data.seat_count));
  }

  filterConditions.push(eq(cars.status, "available"));

  try {
    const filteredCars = await db
      .select({
        id: cars.id,
        brand: cars.brand,
        model: cars.model,
        license_plate: cars.license_plate,
        segment: cars.segment,
        transmission: cars.transmission,
        fuel_type: cars.fuel_type,
        seat_count: cars.seat_count,
        car_rental_name: car_rental.name,
      })
      .from(cars)
      .leftJoin(car_rental, eq(cars.car_rental_id, car_rental.id))
      .where(and(...filterConditions));

    return filteredCars;
  } catch (error) {
    console.error("Error fetching filtered cars:", error);
    throw new Error("Could not fetch filtered cars");
  }
}
