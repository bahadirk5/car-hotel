import { relations, sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
  integer,
  text,
  primaryKey,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";

// Create tables with dynamic naming for multi-project schemas
export const createTable = pgTableCreator((name) => `car_hotel_${name}`);

export const users = createTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  password: text("password"),
  role: varchar("role", {
    length: 15,
    enum: ["admin", "vendor", "customer"],
  })
    .default("customer")
    .notNull(),
});

export const accounts = createTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

// Vendors Table
export const vendors = createTable("vendors", {
  id: serial("id").primaryKey(),
  user_id: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export const businesses = createTable("businesses", {
  id: serial("id").primaryKey(),
  vendor_id: integer("vendor_id")
    .references(() => vendors.id, { onDelete: "cascade" })
    .notNull(),
  type: varchar("type", {
    length: 100,
    enum: ["car_rental", "hotel", "villa_apart", "transfer"],
  }).notNull(),
});

export const car_rental = createTable("car_rental", {
  id: serial("id").primaryKey(),
  vendor_id: integer("vendor_id")
    .references(() => vendors.id, { onDelete: "cascade" })
    .notNull()
    .unique(),
  business_id: integer("business_id")
    .references(() => businesses.id, { onDelete: "cascade" })
    .notNull(),
  name: varchar("name", { length: 100 }).notNull(), // Rental company name
  tax_no: varchar("tax_no", { length: 50 }), // Tax number
  service_area: text("service_area")
    .array()
    .notNull()
    .default(sql`ARRAY[]::text[]`), // Service areas as an array
  created_at: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(), // Timestamp for record creation
  updated_at: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(), // Timestamp for record update
});

// Cars Table
export const cars = createTable(
  "cars",
  {
    id: serial("id").primaryKey(),
    car_rental_id: integer("car_rental_id")
      .references(() => car_rental.id, { onDelete: "cascade" })
      .notNull(),
    segment: varchar("segment", {
      length: 100,
      enum: ["economy", "standard", "luxury", "suv"],
    }).notNull(),
    brand: varchar("brand", { length: 100 }).notNull(), // Car brand
    model: varchar("model", { length: 100 }).notNull(), // Car model
    year: integer("year").notNull(), // Car manufacturing year
    license_plate: varchar("license_plate", { length: 30 }).notNull().unique(), // Unique license plate number
    transmission: varchar("transmission", {
      length: 15,
      enum: ["automatic", "manual"],
    }).notNull(), // Transmission type
    fuel_type: varchar("fuel_type", {
      length: 15,
      enum: ["gasoline", "diesel", "electric", "hybrid"],
    }).notNull(), // Fuel type
    seat_count: integer("seat_count").notNull(), // Seat count
    mileage: integer("mileage").notNull(), // Car mileage
    status: varchar("status", {
      length: 15,
      enum: ["available", "rented", "maintenance", "reserved", "unlisted"],
    })
      .notNull()
      .default("unlisted"),
    created_at: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(), // Timestamp for record creation
    updated_at: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(), // Timestamp for record update
  },
  (table) => ({
    licensePlateIndex: index("cars_license_plate_idx").on(table.license_plate), // Unique index name
    brandIndex: index("cars_brand_idx").on(table.brand), // Unique index name
    modelIndex: index("cars_model_idx").on(table.model), // Unique index name
  }),
);

// Car Reservations Table
export const car_reservations = createTable("car_reservations", {
  id: serial("id").primaryKey(),
  car_id: integer("car_id")
    .references(() => cars.id, { onDelete: "cascade" })
    .notNull(),
  car_rental_id: integer("car_rental_id")
    .references(() => car_rental.id, { onDelete: "cascade" })
    .notNull(),
  user_id: text("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  start_date: timestamp("start_date", { withTimezone: true }).notNull(), // Reservation start date
  end_date: timestamp("end_date", { withTimezone: true }).notNull(), // Reservation end date
  status: varchar("status", {
    length: 20,
    enum: ["pending", "confirmed", "completed", "cancelled"],
  })
    .notNull()
    .default("pending"), // Reservation status
  created_at: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(), // Timestamp for record creation
  updated_at: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(), // Timestamp for record update
});

// Car Availability Table
export const car_availability = createTable(
  "car_availability",
  {
    id: serial("id").primaryKey(),
    car_id: integer("car_id")
      .references(() => cars.id, { onDelete: "cascade" })
      .notNull(),
    available_from: timestamp("available_from", {
      withTimezone: true,
    }).notNull(),
    available_to: timestamp("available_to", { withTimezone: true }).notNull(),
    price_per_day: integer("price_per_day").notNull(),
    created_at: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    uniqueCarAvailability: uniqueIndex("unique_car_availability").on(
      table.car_id,
      table.available_from,
      table.available_to,
    ),
  }),
);

// Relationships between businesses and car_rental
export const businessesRelations = relations(businesses, ({ one }) => ({
  car_rental: one(car_rental, {
    fields: [businesses.id],
    references: [car_rental.business_id],
  }),
}));

export const car_rentalRelations = relations(car_rental, ({ one }) => ({
  business: one(businesses, {
    fields: [car_rental.business_id],
    references: [businesses.id],
  }),
}));
