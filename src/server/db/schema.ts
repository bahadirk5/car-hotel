import {
  index,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
  integer,
  text,
  primaryKey,
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

export const car_rental = createTable("car_rental", {
  id: serial("id").primaryKey(),
  vendor_id: integer("vendor_id")
    .references(() => vendors.id, { onDelete: "cascade" })
    .notNull(),
  name: varchar("name", { length: 100 }).notNull(), // Rental company name
  tax_no: varchar("tax_no", { length: 50 }).notNull(), // Tax number
  service_area: text("service_area[]").notNull(), // Service areas as an array
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
