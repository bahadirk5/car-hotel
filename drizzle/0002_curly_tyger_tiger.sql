ALTER TABLE "car_hotel_car_rental" ADD COLUMN "vendor_id" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "car_hotel_car_rental" ADD CONSTRAINT "car_hotel_car_rental_vendor_id_car_hotel_vendors_id_fk" FOREIGN KEY ("vendor_id") REFERENCES "public"."car_hotel_vendors"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "car_hotel_car_rental" ADD CONSTRAINT "car_hotel_car_rental_vendor_id_unique" UNIQUE("vendor_id");