"use server";

import { db } from "@/server/db";
import { segments } from "@/server/db/schema";
import { cars } from "@/server/db/schema";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { carFormSchema } from "./schema";

// Function to get all segments
export async function getSegments() {
  try {
    // Fetch all segments from the database
    const allSegments = await db.select().from(segments);
    return allSegments;
  } catch (error) {
    console.error("Error fetching segments:", error);
    throw new Error("Could not fetch segments");
  }
}

// Function to create a new car
export async function createCar(values: z.infer<typeof carFormSchema>) {
  // Check if the license plate already exists
  console.log("values", values.license_plate);

  const existingCar = await db.query.cars.findFirst({
    where: eq(cars.license_plate, values.license_plate),
  });

  console.log("existingCar", existingCar);

  if (existingCar) {
    throw new Error("License plate already exists");
  }

  try {
    const newCar = await db
      .insert(cars)
      .values({
        segment_id: values.segment_id,
        brand: values.brand,
        model: values.model,
        year: values.year,
        license_plate: values.license_plate,
        mileage: values.mileage,
        transmission: values.transmission,
        fuel_type: values.fuel_type,
        seat_count: values.seat_count,
        created_at: new Date(),
        updated_at: new Date(),
      })
      .returning();

    return newCar;
  } catch (error) {
    console.error("Error creating car:", error);
    throw new Error("Could not create car");
  }
}
