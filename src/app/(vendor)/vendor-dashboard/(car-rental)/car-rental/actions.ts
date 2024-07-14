"use server";

import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { eq } from "drizzle-orm";
import { car_rental, vendors } from "@/server/db/schema";

export async function updateCarRental(formData: any, key: string) {
  const session = await auth();

  if (session && session.user.role === "vendor") {
    try {
      const vendor = await db.query.vendors.findFirst({
        where: eq(vendors.user_id, session.user.id ?? ""),
      });

      if (!vendor) {
        throw new Error("Not a vendor");
      }

      // const carRental = await db.query.car_rental.findFirst({
      //   where: eq(car_rental.vendor_id, vendor.id),
      // });

      // if (!carRental) {
      //   throw new Error("Not authenticated");
      // }

      const value = formData[key];

      console.log(formData);
      return { success: true, message: "Message created successfully" };

      // await db
      //   .update(car_rental)
      //   .set({ [key]: value })
      //   .where(eq(car_rental.id, carRental.id));
    } catch (error) {
      console.log(error);
    }
  } else {
    throw new Error("Not authenticated");
  }
}
