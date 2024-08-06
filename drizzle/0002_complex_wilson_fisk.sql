ALTER TABLE "car_hotel_car_reservations" ADD COLUMN "car_rental_id" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "car_hotel_car_reservations" ADD CONSTRAINT "car_hotel_car_reservations_car_rental_id_car_hotel_car_rental_id_fk" FOREIGN KEY ("car_rental_id") REFERENCES "public"."car_hotel_car_rental"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
