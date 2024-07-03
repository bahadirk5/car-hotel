"use server";

import { db } from "@/server/db";
import { segments } from "@/server/db/schema";
import { cars } from "@/server/db/schema";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { carFormSchema } from "./components/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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

// Function to fetch car data by ID for editing
export async function getCar(carId: number) {
  try {
    const car = await db.query.cars.findFirst({ where: eq(cars.id, carId) });

    if (!car) {
      throw new Error("Car not found");
    }

    return car;
  } catch (error) {
    console.error("Error fetching car data:", error);
    throw new Error("Could not fetch car data");
  }
}

// Function to create a new car
export async function upsertCar(values: z.infer<typeof carFormSchema>) {
  // Check if the license plate already exists
  const existingCar = await db.query.cars.findFirst({
    where: eq(cars.license_plate, values.license_plate),
  });

  if (existingCar && existingCar.id !== values.id) {
    throw new Error("License plate already exists for another car");
  }

  try {
    await db
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
      .onConflictDoUpdate({
        target: cars.license_plate,
        set: {
          segment_id: values.segment_id,
          brand: values.brand,
          model: values.model,
          year: values.year,
          mileage: values.mileage,
          transmission: values.transmission,
          fuel_type: values.fuel_type,
          seat_count: values.seat_count,
          updated_at: new Date(),
        },
      });
  } catch (error) {
    console.error("Error creating car:", error);
    throw new Error("Could not create car");
  }
  revalidatePath("/vendor-dashboard/car-list");
  redirect("/vendor-dashboard/car-list");
}
