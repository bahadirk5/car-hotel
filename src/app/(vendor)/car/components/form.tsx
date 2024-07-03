"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ChevronLeft, Loader2Icon } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { upsertCar } from "../actions";
import { carFormSchema } from "./schema";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function CarForm({
  segments,
  data,
}: {
  segments: { id: number; name: string }[];
  data?: {
    id: number;
    segment_id: number;
    brand: string;
    model: string;
    year: number;
    license_plate: string;
    mileage: number;
    transmission: "Automatic" | "Manual";
    status: "available" | "rented" | "maintenance" | "reserved" | "unlisted";
    fuel_type: "Gasoline" | "Diesel" | "Electric";
    seat_count: number;
  };
}) {
  const form = useForm<z.infer<typeof carFormSchema>>({
    resolver: zodResolver(carFormSchema),
    defaultValues: {
      segment_id: data?.segment_id || undefined,
      brand: data?.brand || "",
      model: data?.model || "",
      year: data?.year || undefined,
      license_plate: data?.license_plate || "",
      mileage: data?.mileage || 0,
      transmission: data?.transmission || "Automatic",
      fuel_type: data?.fuel_type || "Gasoline",
      seat_count: data?.seat_count || undefined,
    },
  });

  function onSubmit(values: z.infer<typeof carFormSchema>) {
    if (data) {
      values.id = data.id;
    }
    upsert_car(values);
  }

  const { isPending, mutate: upsert_car } = useMutation({
    mutationFn: upsertCar,
    onSuccess: () => {
      toast.success("Car created successfully");
    },
    onError: (error) => {
      console.error("Error creating car:", error);
      if (error.message === "License plate already exists") {
        form.setError("license_plate", {
          type: "manual",
          message: "This license plate is already registered.",
        });
      } else {
        toast.error(error.message || "Error creating car");
      }
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
          <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
              <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
                <div className="sticky top-0 z-20 flex items-center gap-4 py-2 backdrop-blur">
                  <Link
                    href="/vendor-dashboard/car-list"
                    className={cn(
                      buttonVariants({ variant: "outline", size: "icon" }),
                      "h-7 w-7",
                    )}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Back</span>
                  </Link>

                  <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                    Car Info
                  </h1>
                  <Badge variant="outline" className="ml-auto sm:ml-0">
                    Active
                  </Badge>
                  <div className="hidden items-center gap-2 md:ml-auto md:flex">
                    <Button type="button" variant="outline" size="sm">
                      Discard
                    </Button>
                    <Button size="sm" type="submit">
                      Save Car
                    </Button>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                  <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                    {/* Car Details Card */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Car Details</CardTitle>
                        <CardDescription>
                          Basic information about the car including brand,
                          model, and year.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-6">
                          <FormField
                            control={form.control}
                            name="brand"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Brand</FormLabel>
                                <FormControl>
                                  <Input placeholder="Toyota" {...field} />
                                </FormControl>
                                <FormDescription>
                                  The brand of the car.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="model"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Model</FormLabel>
                                <FormControl>
                                  <Input placeholder="Corolla" {...field} />
                                </FormControl>
                                <FormDescription>
                                  The model of the car.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="year"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Year</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    placeholder="2020"
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription>
                                  The manufacturing year of the car.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="license_plate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>License Plate</FormLabel>
                                <FormControl>
                                  <Input placeholder="XYZ1234" {...field} />
                                </FormControl>
                                <FormDescription>
                                  The license plate of the car.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="mileage"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Mileage</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    placeholder="50000"
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription>
                                  The mileage of the car in kilometers.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </CardContent>
                    </Card>
                    {/* Car Specifications Card */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Car Specifications</CardTitle>
                        <CardDescription>
                          Details about the car's specifications such as
                          transmission, fuel type, and seat count.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-6">
                          <FormField
                            control={form.control}
                            name="transmission"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Transmission</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select transmission" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="Automatic">
                                      Automatic
                                    </SelectItem>
                                    <SelectItem value="Manual">
                                      Manual
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormDescription>
                                  The transmission type of the car.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="fuel_type"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Fuel Type</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select fuel type" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="Gasoline">
                                      Gasoline
                                    </SelectItem>
                                    <SelectItem value="Diesel">
                                      Diesel
                                    </SelectItem>
                                    <SelectItem value="Electric">
                                      Electric
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormDescription>
                                  The fuel type of the car.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="seat_count"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Seat Count</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    placeholder="5"
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription>
                                  The number of seats in the car.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                    <Card>
                      <CardHeader>
                        <CardTitle>Segment</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-6">
                          <div className="grid gap-3">
                            <FormField
                              control={form.control}
                              name="segment_id"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Segment</FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={
                                      field.value
                                        ? field.value.toString()
                                        : undefined
                                    }
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select segment" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {segments.map((segment) => (
                                        <SelectItem
                                          key={segment.id}
                                          value={segment.id.toString()}
                                        >
                                          {segment.name}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormDescription>
                                    The transmission type of the car.
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Archive Car</CardTitle>
                        <CardDescription>
                          Lipsum dolor sit amet, consectetur adipiscing elit.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div></div>
                        <Button size="sm" variant="secondary">
                          Archive Car
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 md:hidden">
                  <Button
                    variant="outline"
                    size="sm"
                    type="button"
                    onClick={() => form.reset()}
                  >
                    Discard
                  </Button>
                  <Button size="sm" type="submit" disabled={isPending}>
                    {isPending && (
                      <Loader2Icon className="ml-2 h-4 w-4 animate-spin" />
                    )}
                    Save Car
                  </Button>
                </div>
              </div>
            </main>
          </div>
        </div>
      </form>
    </Form>
  );
}
