CREATE TABLE IF NOT EXISTS "car_hotel_account" (
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	CONSTRAINT "car_hotel_account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "car_hotel_businesses" (
	"id" serial PRIMARY KEY NOT NULL,
	"vendor_id" integer NOT NULL,
	"type" varchar(100) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "car_hotel_car_rental" (
	"id" serial PRIMARY KEY NOT NULL,
	"vendor_id" integer NOT NULL,
	"business_id" integer NOT NULL,
	"name" varchar(100) NOT NULL,
	"tax_no" varchar(50),
	"service_area" text[] DEFAULT ARRAY[]::text[] NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "car_hotel_car_rental_vendor_id_unique" UNIQUE("vendor_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "car_hotel_cars" (
	"id" serial PRIMARY KEY NOT NULL,
	"car_rental_id" integer NOT NULL,
	"segment" varchar(100) NOT NULL,
	"brand" varchar(100) NOT NULL,
	"model" varchar(100) NOT NULL,
	"year" integer NOT NULL,
	"license_plate" varchar(30) NOT NULL,
	"transmission" varchar(15) NOT NULL,
	"fuel_type" varchar(15) NOT NULL,
	"seat_count" integer NOT NULL,
	"mileage" integer NOT NULL,
	"status" varchar(15) DEFAULT 'unlisted' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "car_hotel_cars_license_plate_unique" UNIQUE("license_plate")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "car_hotel_user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"emailVerified" timestamp,
	"image" text,
	"password" text,
	"role" varchar(15) DEFAULT 'customer' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "car_hotel_vendors" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "car_hotel_account" ADD CONSTRAINT "car_hotel_account_userId_car_hotel_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."car_hotel_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "car_hotel_businesses" ADD CONSTRAINT "car_hotel_businesses_vendor_id_car_hotel_vendors_id_fk" FOREIGN KEY ("vendor_id") REFERENCES "public"."car_hotel_vendors"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "car_hotel_car_rental" ADD CONSTRAINT "car_hotel_car_rental_vendor_id_car_hotel_vendors_id_fk" FOREIGN KEY ("vendor_id") REFERENCES "public"."car_hotel_vendors"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "car_hotel_car_rental" ADD CONSTRAINT "car_hotel_car_rental_business_id_car_hotel_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."car_hotel_businesses"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "car_hotel_cars" ADD CONSTRAINT "car_hotel_cars_car_rental_id_car_hotel_car_rental_id_fk" FOREIGN KEY ("car_rental_id") REFERENCES "public"."car_hotel_car_rental"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "car_hotel_vendors" ADD CONSTRAINT "car_hotel_vendors_userId_car_hotel_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."car_hotel_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "cars_license_plate_idx" ON "car_hotel_cars" ("license_plate");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "cars_brand_idx" ON "car_hotel_cars" ("brand");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "cars_model_idx" ON "car_hotel_cars" ("model");