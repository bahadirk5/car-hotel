CREATE TABLE IF NOT EXISTS "car_hotel_car_availability" (
	"id" serial PRIMARY KEY NOT NULL,
	"car_id" integer NOT NULL,
	"available_from" timestamp with time zone NOT NULL,
	"available_to" timestamp with time zone NOT NULL,
	"price_per_day" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "car_hotel_car_reservations" (
	"id" serial PRIMARY KEY NOT NULL,
	"car_id" integer NOT NULL,
	"user_id" text NOT NULL,
	"start_date" timestamp with time zone NOT NULL,
	"end_date" timestamp with time zone NOT NULL,
	"status" varchar(20) DEFAULT 'pending' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "car_hotel_car_availability" ADD CONSTRAINT "car_hotel_car_availability_car_id_car_hotel_cars_id_fk" FOREIGN KEY ("car_id") REFERENCES "public"."car_hotel_cars"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "car_hotel_car_reservations" ADD CONSTRAINT "car_hotel_car_reservations_car_id_car_hotel_cars_id_fk" FOREIGN KEY ("car_id") REFERENCES "public"."car_hotel_cars"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "car_hotel_car_reservations" ADD CONSTRAINT "car_hotel_car_reservations_user_id_car_hotel_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."car_hotel_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
