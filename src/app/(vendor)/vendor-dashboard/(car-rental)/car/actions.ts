"use server";

import { db } from "@/server/db";
import {
  cars,
  vendors,
  car_rental,
  car_availability,
} from "@/server/db/schema";
import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/server/auth";
import { z } from "zod";
import { carFormSchema } from "./components/schema";
import { CarStatus, carStatuses } from "./list/types";
import { availabilityFormSchema } from "./availability/components/types";

async function getVendorId() {
  const session = await auth();

  if (!session || session.user.role !== "vendor") {
    throw new Error("Not authenticated or not a vendor");
  }

  const vendor = await db.query.vendors.findFirst({
    where: eq(vendors.user_id, session.user.id ?? ""),
  });

  if (!vendor) {
    throw new Error("Vendor not found");
  }

  return vendor.id;
}

export async function getCars() {
  try {
    const vendorId = await getVendorId();

    const allCars = await db
      .select({
        id: cars.id,
        brand: cars.brand,
        model: cars.model,
        license_plate: cars.license_plate,
        segment: cars.segment,
        created_at: cars.created_at,
        updated_at: cars.updated_at,
        status: cars.status,
      })
      .from(cars)
      .where(eq(cars.car_rental_id, vendorId))
      .orderBy(desc(cars.created_at));
    return allCars;
  } catch (error) {
    console.error("Error fetching cars:", error);
    throw new Error("Could not fetch cars");
  }
}

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

export async function upsertCar(values: z.infer<typeof carFormSchema>) {
  try {
    const vendorId = await getVendorId();

    // Check if the business has a car rental
    const carRental = await db.query.car_rental.findFirst({
      where: eq(car_rental.vendor_id, vendorId),
    });

    if (!carRental) {
      throw new Error("No car rental found for this business");
    }

    // Check if the license plate already exists
    const existingCar = await db.query.cars.findFirst({
      where: eq(cars.license_plate, values.license_plate),
    });

    if (existingCar && existingCar.id !== values.id) {
      throw new Error("License plate already exists for another car");
    }

    await db
      .insert(cars)
      .values({
        car_rental_id: carRental.id,
        segment: values.segment,
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
          segment: values.segment,
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
    if (error instanceof Error) {
      console.error("Error in create car:", error.message);
    } else {
      console.error("Unknown error in create car:", error);
    }
    throw error;
  }
  revalidatePath("/vendor-dashboard/car/list");
  redirect("/vendor-dashboard/car/list");
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
    await db.delete(cars).where(eq(cars.id, carId));
  } catch (error) {
    console.error("Error deleting car:", error);
    throw new Error("Could not delete car");
  }
  revalidatePath("/vendor-dashboard/car-list");
}

export async function getCarWithAvailability(carId: number) {
  try {
    const car = await db.query.cars.findFirst({ where: eq(cars.id, carId) });

    if (!car) {
      throw new Error("Car not found");
    }

    const availability = await db.query.car_availability.findMany({
      where: eq(car_availability.car_id, carId),
    });

    return { car, availability };
  } catch (error) {
    console.error("Error fetching car with availability data:", error);
    throw new Error("Could not fetch car with availability data");
  }
}

export async function getCarsWithAvailability() {
  try {
    const vendorId = await getVendorId();

    const carsWithAvailability = await db
      .select({
        car: cars,
        availability: car_availability,
      })
      .from(cars)
      .leftJoin(car_availability, eq(cars.id, car_availability.car_id))
      .leftJoin(car_rental, eq(cars.car_rental_id, car_rental.id))
      .where(eq(car_rental.vendor_id, vendorId));

    return carsWithAvailability;
  } catch (error) {
    console.error("Error fetching car with availability data:", error);
    throw new Error("Could not fetch car with availability data");
  }
}

export async function upsertCarAvailability(
  values: z.infer<typeof availabilityFormSchema>,
) {
  try {
    console.log("buraya geldi");
    // Check if the car exists
    const car = await db.query.cars.findFirst({
      where: eq(cars.id, values.car_id),
    });

    if (!car) {
      throw new Error("No car found with the provided ID");
    }

    await db
      .insert(car_availability)
      .values({
        car_id: values.car_id,
        available_from: values.available_from,
        available_to: values.available_to,
        price_per_day: values.price_per_day,
        created_at: new Date(),
        updated_at: new Date(),
      })
      .onConflictDoUpdate({
        target: [
          car_availability.car_id,
          car_availability.available_from,
          car_availability.available_to,
        ],
        set: {
          available_from: values.available_from,
          available_to: values.available_to,
          price_per_day: values.price_per_day,
          updated_at: new Date(),
        },
      });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error in upsert car availability:", error.message);
    } else {
      console.error("Unknown error in upsert car availability:", error);
    }
    throw error;
  }
  // Revalidate or redirect if needed
  revalidatePath(`/vendor-dashboard/car/availability/${values.car_id}`);
  redirect(`/vendor-dashboard/car/availability/${values.car_id}`);
}
