import {
  index,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
  integer,
  decimal,
  date,
} from "drizzle-orm/pg-core";

// Create tables with dynamic naming for multi-project schemas
const createTable = pgTableCreator((name) => `car_hotel_${name}`);

// Segments Table
export const segments = createTable("segments", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(), // Segment name
});

// Cars Table
export const cars = createTable(
  "cars",
  {
    id: serial("id").primaryKey(),
    segment_id: integer("segment_id")
      .references(() => segments.id)
      .notNull(), // Foreign key to segments table
    brand: varchar("brand", { length: 100 }).notNull(), // Car brand
    model: varchar("model", { length: 100 }).notNull(), // Car model
    year: integer("year").notNull(), // Car manufacturing year
    license_plate: varchar("license_plate", { length: 10 }).notNull().unique(), // Unique license plate number
    transmission: varchar("transmission", { length: 50 }).notNull(), // Transmission type
    fuel_type: varchar("fuel_type", { length: 50 }).notNull(), // Fuel type
    seat_count: integer("seat_count").notNull(), // Seat count
    mileage: integer("mileage").notNull(), // Car mileage
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

// Prices Table
export const prices = createTable(
  "prices",
  {
    id: serial("id").primaryKey(),
    car_id: integer("car_id")
      .references(() => cars.id)
      .notNull(), // Foreign key to cars table
    start_date: date("start_date").notNull(), // Price start date
    end_date: date("end_date").notNull(), // Price end date
    price_per_day: decimal("price_per_day", {
      precision: 10,
      scale: 2,
    }).notNull(), // Daily price
    created_at: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(), // Timestamp for record creation
    updated_at: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(), // Timestamp for record update
  },
  (table) => ({
    carIndex: index("prices_car_idx").on(table.car_id), // Unique index name
    dateIndex: index("prices_date_idx").on(table.start_date, table.end_date), // Unique index name
  }),
);

// Customers Table
export const customers = createTable(
  "customers",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 100 }).notNull(), // Customer name
    email: varchar("email", { length: 100 }).notNull().unique(), // Customer email
    phone: varchar("phone", { length: 15 }).notNull(), // Customer phone number
    created_at: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(), // Timestamp for record creation
    updated_at: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(), // Timestamp for record update
  },
  (table) => ({
    emailIndex: index("customers_email_idx").on(table.email), // Unique index name
  }),
);

// Reservations Table
export const reservations = createTable(
  "reservations",
  {
    id: serial("id").primaryKey(),
    customer_id: integer("customer_id")
      .references(() => customers.id)
      .notNull(), // Foreign key to customers table
    car_id: integer("car_id")
      .references(() => cars.id)
      .notNull(), // Foreign key to cars table
    start_date: date("start_date").notNull(), // Reservation start date
    end_date: date("end_date").notNull(), // Reservation end date
    total_price: decimal("total_price", { precision: 10, scale: 2 }).notNull(), // Total price for the reservation
    created_at: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(), // Timestamp for record creation
    updated_at: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(), // Timestamp for record update
  },
  (table) => ({
    customerIndex: index("reservations_customer_idx").on(table.customer_id), // Unique index name
    carIndex: index("reservations_car_idx").on(table.car_id), // Unique index name
    dateIndex: index("reservations_date_idx").on(
      table.start_date,
      table.end_date,
    ), // Unique index name
  }),
);
