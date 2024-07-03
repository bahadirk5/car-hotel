"use server";

import { db } from "@/server/db";
import { cars, segments } from "@/server/db/schema";
import { desc, eq } from "drizzle-orm";
import { CarStatus, carStatuses } from "./types";
import { revalidatePath } from "next/cache";

export async function getCars() {
  try {
    const allCars = await db
      .select({
        id: cars.id,
        brand: cars.brand,
        model: cars.model,
        license_plate: cars.license_plate,
        segment_name: segments.name,
        created_at: cars.created_at,
        updated_at: cars.updated_at,
        status: cars.status,
      })
      .from(cars)
      .leftJoin(segments, eq(segments.id, cars.segment_id))
      .orderBy(desc(cars.created_at));
    return allCars;
  } catch (error) {
    console.error("Error fetching cars:", error);
    throw new Error("Could not fetch cars");
  }
}

export async function setStatus(data: { id: number; status: CarStatus }) {
  try {
    // Validate the status
    if (!carStatuses.includes(data.status)) {
      throw new Error("Invalid status");
    }

    // Update the car status in the database
    const result = await db
      .update(cars)
      .set({ status: data.status, updated_at: new Date() })
      .where(eq(cars.id, data.id))
      .returning();

    if (result.length === 0) {
      throw new Error("Car not found or could not be updated");
    }
  } catch (error) {
    console.error("Error setting car status:", error);
    throw new Error("Could not set car status");
  }
  revalidatePath("/vendor-dashboard/car-list");
}

export async function deleteCar(carId: number) {
  try {
    console.log("car id:", carId)
    const deletedCar = await db.delete(cars).where(eq(cars.id, carId));
    console.log(deleteCar)
  } catch (error) {
    console.error("Error deleting car:", error);
    throw new Error("Could not delete car");
  }
  revalidatePath("/vendor-dashboard/car-list");
}
