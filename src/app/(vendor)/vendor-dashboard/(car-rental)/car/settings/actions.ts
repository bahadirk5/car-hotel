"use server";

import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { eq } from "drizzle-orm";
import { car_rental, vendors } from "@/server/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getCarRental() {
  const session = await auth();

  if (session && session.user.role === "vendor") {
    try {
      const vendor = await db.query.vendors.findFirst({
        where: eq(vendors.user_id, session.user.id ?? ""),
      });

      if (!vendor) {
        throw new Error("Not a vendor");
      }

      const carRental = await db.query.car_rental.findFirst({
        where: eq(car_rental.vendor_id, vendor.id),
      });
      
      return carRental;
    } catch (error) {
      console.log(error);
    }
  } else {
    throw new Error("Not authenticated");
  }
}


export async function updateCarRental(formData: any, key: string) {
  const carRental = await getCarRental();

  if (!carRental) {
    throw new Error("Not authenticated");
  }

  const value = formData[key];

  try {
    await db
      .update(car_rental)
      .set({ [key]: value })
      .where(eq(car_rental.id, carRental.id));
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error in updateCarRental:", error.message);
    } else {
      console.error("Unknown error in updateCarRental:", error);
    }
    throw error;
  }
  revalidatePath("/vendor-dashboard/car/settings");
  redirect("/vendor-dashboard/car/settings");
}
