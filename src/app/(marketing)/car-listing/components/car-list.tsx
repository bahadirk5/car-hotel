"use client";

import { useSearchParams } from "next/navigation";
import { getFilteredCars } from "../actions";
import { useQuery } from "@tanstack/react-query";
import { CarCard } from "./car-card";

export function CarList() {
  const searchParams = useSearchParams();

  const {
    data: cars,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cars", searchParams.toString()],
    queryFn: () => getFilteredCars(searchParams),
  });

  if (isLoading) return <div className="px-4">Loading...</div>;
  if (error) return <div className="px-4">Error loading cars</div>;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
      {cars?.map((car) => (
        <CarCard
          key={car.id}
          id={car.id}
          brand={car.brand}
          model={car.model}
          segment={car.segment}
          transmission={car.transmission}
          fuel_type={car.fuel_type}
          seat={car.seat_count}
        />
      ))}
    </div>
  );
}
