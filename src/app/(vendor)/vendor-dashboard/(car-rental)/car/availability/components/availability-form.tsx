"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { number, z } from "zod";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { upsertCarAvailability } from "../../actions";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { useState } from "react";

const availabilityFormSchema = z.object({
  id: z.number().optional(),
  car_id: number().optional(),
  available_dates: z.object(
    { to: z.date(), from: z.date() },
    {
      required_error: "Dates are required.",
    },
  ),
  price_per_day: z.coerce.number({
    required_error: "Price per day is required",
  }),
});

export function AvailabilityForm({
  data,
  availability,
  carId,
}: {
  data?: {
    id: number;
    available_from: Date;
    available_to: Date;
    price_per_day: number;
  };
  availability: {
    available_from: Date;
    available_to: Date;
  }[];
  carId: number;
}) {
  const [showAvailabilityDialog, setShowAvailabilityDialog] = useState(false);

  const form = useForm<z.infer<typeof availabilityFormSchema>>({
    resolver: zodResolver(availabilityFormSchema),
    defaultValues: {
      available_dates: {
        from: data ? data.available_from : undefined,
        to: data ? data.available_to : undefined,
      },
      price_per_day: data ? data.price_per_day : 0,
    },
  });

  function onSubmit(values: z.infer<typeof availabilityFormSchema>) {
    if (!carId) {
      throw new Error("Car ID is required");
    }

    values.car_id = carId;
    if (data) {
      values.id = data.id;
    }

    const { from, to } = values.available_dates;
    const flattenedValues = {
      ...values,
      available_from: from,
      available_to: to,
      car_id: carId,
    };

    console.log("flattenedValues", flattenedValues);
    upsert_availability(flattenedValues);
  }

  const { isPending, mutate: upsert_availability } = useMutation({
    mutationFn: upsertCarAvailability,
    onSuccess: () => {
      toast.success("Car availability updated successfully");
      setShowAvailabilityDialog(false);
    },
    onError: (error) => {
      console.error("Error updating car availability:", error);
      toast.error(error.message || "Error updating car availability");
    },
  });

  const disabledDates = availability.reduce((dates, range) => {
    const from = new Date(range.available_from);
    const to = new Date(range.available_to);
    const current = new Date(from);

    while (current <= to) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return dates;
  }, [] as Date[]);

  return (
    <Dialog
      open={showAvailabilityDialog}
      onOpenChange={setShowAvailabilityDialog}
    >
      <DialogTrigger asChild>
        <Button size="sm" className="h-8 gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Add Availability
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-max">
        <DialogHeader>
          <DialogTitle>Availability</DialogTitle>
          <DialogDescription>
            Make changes to your availability here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="available_dates"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Available Days</FormLabel>
                  <Calendar
                    mode="range"
                    selected={field.value}
                    onSelect={field.onChange}
                    numberOfMonths={2}
                    disabled={disabledDates}
                    className="px-0"
                  />
                  <FormDescription>
                    Select the date when the car becomes available.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price_per_day"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price Per Day</FormLabel>
                  <FormControl>
                    <Input type="number" disabled={isPending} {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the price per day for renting the car.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
              <Button type="submit" disabled={isPending}>
                {isPending && <Loader className="ml-2 h-4 w-4 animate-spin" />}
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
