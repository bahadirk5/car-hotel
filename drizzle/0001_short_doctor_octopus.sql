CREATE TABLE IF NOT EXISTS "car_hotel_cars" (
	"id" serial PRIMARY KEY NOT NULL,
	"segment_id" integer NOT NULL,
	"brand" varchar(100) NOT NULL,
	"model" varchar(100) NOT NULL,
	"year" integer NOT NULL,
	"license_plate" varchar(10) NOT NULL,
	"mileage" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "car_hotel_cars_license_plate_unique" UNIQUE("license_plate")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "car_hotel_customers" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"email" varchar(100) NOT NULL,
	"phone" varchar(15) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "car_hotel_customers_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "car_hotel_prices" (
	"id" serial PRIMARY KEY NOT NULL,
	"car_id" integer NOT NULL,
	"start_date" date NOT NULL,
	"end_date" date NOT NULL,
	"price_per_day" numeric(10, 2) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "car_hotel_reservations" (
	"id" serial PRIMARY KEY NOT NULL,
	"customer_id" integer NOT NULL,
	"car_id" integer NOT NULL,
	"start_date" date NOT NULL,
	"end_date" date NOT NULL,
	"total_price" numeric(10, 2) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "car_hotel_segments" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL
);
--> statement-breakpoint
DROP TABLE "car-hotel_post";--> statement-breakpoint
DROP TABLE "car-hotel_postDeneme";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "car_hotel_cars" ADD CONSTRAINT "car_hotel_cars_segment_id_car_hotel_segments_id_fk" FOREIGN KEY ("segment_id") REFERENCES "public"."car_hotel_segments"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "car_hotel_prices" ADD CONSTRAINT "car_hotel_prices_car_id_car_hotel_cars_id_fk" FOREIGN KEY ("car_id") REFERENCES "public"."car_hotel_cars"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "car_hotel_reservations" ADD CONSTRAINT "car_hotel_reservations_customer_id_car_hotel_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."car_hotel_customers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "car_hotel_reservations" ADD CONSTRAINT "car_hotel_reservations_car_id_car_hotel_cars_id_fk" FOREIGN KEY ("car_id") REFERENCES "public"."car_hotel_cars"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "cars_license_plate_idx" ON "car_hotel_cars" ("license_plate");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "cars_brand_idx" ON "car_hotel_cars" ("brand");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "cars_model_idx" ON "car_hotel_cars" ("model");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "customers_email_idx" ON "car_hotel_customers" ("email");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "prices_car_idx" ON "car_hotel_prices" ("car_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "prices_date_idx" ON "car_hotel_prices" ("start_date","end_date");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "reservations_customer_idx" ON "car_hotel_reservations" ("customer_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "reservations_car_idx" ON "car_hotel_reservations" ("car_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "reservations_date_idx" ON "car_hotel_reservations" ("start_date","end_date");