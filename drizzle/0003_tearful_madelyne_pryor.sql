CREATE UNIQUE INDEX IF NOT EXISTS "unique_car_availability" ON "car_hotel_car_availability" ("car_id","available_from","available_to");