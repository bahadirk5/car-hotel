"use server";

import { db } from "@/server/db";
import { eq } from "drizzle-orm";
import { businesses, vendors, car_rental } from "@/server/db/schema";
import { businessCreateValues } from "./components/business-switcher";
import { auth } from "@/server/auth";

export async function getVendorByUserID(userID: string) {
  try {
    const vendor = await db.query.vendors.findFirst({
      where: eq(vendors.user_id, userID),
    });
    return vendor;
  } catch (error) {
    console.log(error);
  }
}

export async function getBusinessByVendorID(vendorID: number) {
  try {
    const businessesList = await db.query.businesses.findMany({
      where: eq(businesses.vendor_id, vendorID),
      with: {
        car_rental: true,
      },
    });

    return businessesList;
  } catch (error) {
    console.log(error);
  }
}

export async function getCarRentalByBusinessID(businessID: number) {
  try {
    const carRental = await db.query.car_rental.findFirst({
      where: eq(car_rental.business_id, businessID),
    });
    return carRental;
  } catch (error) {
    console.log(error);
  }
}

export async function createBusiness(data: businessCreateValues) {
  const session = await auth();

  if (session && session.user.role === "vendor") {
    try {
      const vendor = await db.query.vendors.findFirst({
        where: eq(vendors.user_id, session.user.id ?? ""),
      });

      if (!vendor) {
        throw new Error("Not a vendor");
      }

      if (data.type === "car_rental") {
        const existingCarRental = await db.query.car_rental.findFirst({
          where: eq(car_rental.vendor_id, vendor.id),
        });

        console.log("Existing Car Rental:", existingCarRental);

        if (existingCarRental) {
          console.log("Vendor already has a car rental business");
          throw new Error("Vendor already has a car rental business");
        }
      }

      const newBusiness = await db
        .insert(businesses)
        .values({
          vendor_id: vendor.id,
          type: data.type,
        })
        .returning({ id: businesses.id });

      if (!newBusiness || newBusiness.length === 0 || !newBusiness[0]?.id) {
        throw new Error("Failed to create business");
      }

      const businessID = newBusiness[0].id;

      if (data.type === "car_rental") {
        await db.insert(car_rental).values({
          business_id: businessID,
          name: data.name,
          vendor_id: vendor.id,
          created_at: new Date(),
          updated_at: new Date(),
        });
      }
      return newBusiness;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error in createBusiness:", error.message);
      } else {
        console.error("Unknown error in createBusiness:", error);
      }
      throw error;
    }
  } else {
    throw new Error("Not authenticated");
  }
}
